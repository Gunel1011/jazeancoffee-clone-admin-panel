import { useEffect, useState } from "react";
import { UserService } from "../Services/UserService";
import { ProfileService } from "../../Profile/Service/ProfileService";
import Loading from "../../../components/Loading";
import { useTranslation } from "react-i18next";
import { FaUserCog, FaBan, FaCheckCircle, FaTrash } from "react-icons/fa";
import showNotification from "../../../utils/showNotification";
import Swal from "sweetalert2";

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await UserService.getAllUsers();
      setUsers(res);
    } catch (error) {
      // Failed to load users
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = async (email: string, isActive: boolean) => {
    const newStatus = !isActive;

    Swal.fire({
      title: "Are you sure you want to change status?",
      text: `User will be ${newStatus ? 'activated' : 'deactivated'}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus ? "#4caf50" : "#f44336",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Okay",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await ProfileService.adminChangeStatus(email, newStatus);
          showNotification("success", `User ${newStatus ? 'activated' : 'deactivated'} successfully`);
          getData();
        } catch (error: any) {
          showNotification("error", error.response?.data || "Operation failed");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleChangeRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';

    Swal.fire({
      title: "Are you sure you want to change role?",
      text: `Role will be changed to ${newRole}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ff9800",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Okay",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await ProfileService.changeUserRole(id, newRole);
          showNotification("success", "Role changed successfully");
          getData();
        } catch (error: any) {
          showNotification("error", error.response?.data || "Role change failed");
        } finally {
          setLoading(false);
        }
      }
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="users">
      <div className="container">
        <div className="row">
          <h2 className="usersTitle">{t("header.all-user")}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Age</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td className="carImg">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt={user.name} />
                    ) : (
                      <div className="no-img">No Img</div>
                    )}
                  </td>
                  <td>{user.name} {user.surname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.age}</td>
                  <td>
                    <span className={user.isActive ? "status active" : "status inactive"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="action-btn role"
                      title="Change Role"
                      onClick={() => handleChangeRole(user._id, user.role)}
                    >
                      <FaUserCog />
                    </button>
                    <button
                      className={`action-btn ${user.isActive ? 'deactivate' : 'activate'}`}
                      title={user.isActive ? "Deactivate" : "Activate"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleStatusChange(user.email, user.isActive);
                      }}
                    >
                      {user.isActive ? <FaBan /> : <FaCheckCircle />}
                    </button>
                    <button
                      className="action-btn delete"
                      title="Delete User"
                      style={{ color: "#f44336" }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        Swal.fire({
                          title: "Are you sure you want to delete?",
                          text: "This action requires OTP verification sent to your email.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#f44336",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Send OTP",
                          cancelButtonText: "Cancel"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            setLoading(true);
                            // 1. Send OTP
                            ProfileService.sendAdminDeleteOTP()
                              .then(() => {
                                setLoading(false);
                                // 2. Prompt for OTP
                                Swal.fire({
                                  title: "Enter OTP",
                                  input: "text",
                                  inputLabel: "OTP sent to your email",
                                  inputPlaceholder: "Enter OTP code",
                                  showCancelButton: true,
                                  confirmButtonText: "Confirm Delete",
                                  showLoaderOnConfirm: true,
                                  preConfirm: async (otp) => {
                                    if (!otp) {
                                      Swal.showValidationMessage('Please enter OTP');
                                      return false;
                                    }
                                    try {
                                      // 3. Delete with OTP
                                      await ProfileService.adminDeleteUser(user._id, otp);
                                      return true;
                                    } catch (error: any) {
                                      Swal.showValidationMessage(
                                        error.response?.data || "Request failed"
                                      );
                                      return false;
                                    }
                                  },
                                  allowOutsideClick: () => !Swal.isLoading()
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "Deleted!",
                                      text: "User has been deleted.",
                                      icon: "success",
                                      confirmButtonText: "Okay"
                                    });
                                    getData();
                                  }
                                });
                              })
                              .catch((err: any) => {
                                setLoading(false);
                                showNotification("error", err.response?.data || "Failed to send OTP");
                              });
                          }
                        });
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Users;
