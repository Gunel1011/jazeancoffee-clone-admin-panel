import { useForm, type SubmitHandler } from "react-hook-form";
import { userRoleEnum, type IUserRequest } from "../Models/ProfileModels";
import { boolean, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../../utils/AuthContext";
import { useContext, useState } from "react";
import { ProfileService } from "../Service/ProfileService";
import showNotification from "../../../utils/showNotification";
import { useNavigate } from "react-router-dom";

const userShema = object({
  name: string().trim().required(),
  surname: string().trim().required(),
  email: string().trim().required(),
  phone: string().trim().required(),
  address: string().trim().required(),
  age: number().required(),
  isActive: boolean().required(),
});
const ProfileSetting = () => {
  const { user }: any = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [userRole, setUserRole] = useState(user?.role || userRoleEnum.USER);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({
    resolver: yupResolver(userShema),
    values: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      age: user?.age || 0,
      isActive: user?.isActive || false,
    },
  });

  const handleSeletctImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const onSubmit: SubmitHandler<IUserRequest> = async (data) => {
    try {
      const res = await ProfileService.editUserData(data);
      showNotification("success", res?.message);
      navigation("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="editCoffee">
      <div className="container">
        <div className="row">
          <h2 className="titleEdit">Profile Setting</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* name  */}
              <div className="user-box">
                <input
                  className={errors.name ? "error" : ""}
                  type="text"
                  {...register("name")}
                />
                <label className={errors.name ? "error" : ""}>Name</label>
              </div>
              {errors.name && (
                <span className="error">{errors.name?.message}</span>
              )}
              {/* surname */}
              <div className="user-box">
                <input
                  className={errors.surname ? "error" : ""}
                  type="text"
                  {...register("surname")}
                />
                <label className={errors.surname ? "error" : ""}>Surnem</label>
              </div>
              {errors.surname && (
                <span className="error">{errors.surname?.message}</span>
              )}
              {/* age */}
              <div className="user-box">
                <input
                  className={errors.age ? "error" : ""}
                  type="number"
                  {...register("age")}
                />
                <label className={errors.age ? "error" : ""}>Age</label>
              </div>
              {errors.age && (
                <span className="error">{errors.age?.message}</span>
              )}
              {/* Phone  */}
              <div className="user-box">
                <input
                  className={errors.phone ? "error" : ""}
                  type="text"
                  {...register("phone")}
                />
                <label className={errors.age ? "error" : ""}>
                  Phone Number
                </label>
              </div>
              {errors.phone && (
                <span className="error">{errors.phone?.message}</span>
              )}
              {/* email  */}
              <div className="user-box">
                <input
                  className={errors.email ? "error" : ""}
                  type="text"
                  {...register("email")}
                />
                <label className={errors.age ? "error" : ""}>Email</label>
              </div>
              {errors.email && (
                <span className="error">{errors.email?.message}</span>
              )}
              {/* address  */}
              <div className="user-box">
                <input
                  className={errors.address ? "error" : ""}
                  type="text"
                  {...register("address")}
                />
                <label className={errors.address ? "error" : ""}>Address</label>
              </div>
              {errors.address && (
                <span className="error">{errors.address?.message}</span>
              )}
              {/* radio  */}
              <div className="userBox">
                <div className="roleBox">
                  <label htmlFor="roleAdmin" style={{ color: "#fff" }}>
                    Admin
                  </label>
                  <input
                    type="radio"
                    name="role"
                    id="roleAdmin"
                    value={userRole}
                    onChange={() => setUserRole(userRoleEnum.ADMIN)}
                  />
                </div>
                <div className="roleBox">
                  <label htmlFor="role" style={{ color: "#fff" }}>
                    User
                  </label>
                  <input
                    type="radio"
                    name="role"
                    id="role"
                    value={userRole}
                    onChange={() => setUserRole(userRoleEnum.USER)}
                  />
                </div>
              </div>
              <div className="user-box">
                <input type="checkbox" {...register("isActive")} />
                <label>Is Active ?</label>
              </div>
              <div className="user-box">
                <input
                  type="file"
                  name="productImage"
                  id="cImg"
                  onChange={handleSeletctImage}
                />
                {preview && (
                  <div className="previewImage">
                    <img src={preview} alt="old-img" />
                  </div>
                )}
              </div>

              <div className="btn">
                <button>
                  Update profile
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSetting;
