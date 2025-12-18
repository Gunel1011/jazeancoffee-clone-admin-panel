import { useForm, type SubmitHandler } from "react-hook-form";
import { userRoleEnum, type IUserRequest } from "../Models/ProfileModels";
import { boolean, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../../utils/AuthContext";
import { useContext, useState } from "react";
import { ProfileService } from "../Service/ProfileService";
import showNotification from "../../../utils/showNotification";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";

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
  const { t } = useTranslation();
  const { user, refreshProfile }: any = useContext(AuthContext);
  const [image, setImage] = useState<any>("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({
    resolver: yupResolver(userShema) as any,
    values: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      age: user?.age || 0,
      isActive: user?.isActive || false,
      role: user?.role || userRoleEnum.USER,
    },
  });

  const handleSeletctImage = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL?.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<IUserRequest> = async (data) => {
    setLoading(true);
    try {
      const res = await ProfileService.editUserData(data);
      if (image) {
        const formData = new FormData();
        formData.append("profileImage", image);
        await ProfileService.changeProfileImage(formData);
      }
      await refreshProfile();
      showNotification("success", res?.message || "Profile updated");
      navigation("/profile");
    } catch (error: any) {
      showNotification("error", error.response?.data || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="editCoffee">
      <div className="container">
        <div className="row">
          <h2 className="titleEdit">{t("setting.profileSetting")}</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input
                  className={errors.name ? "error" : ""}
                  type="text"
                  {...register("name")}
                />
                <label className={errors.name ? "error" : ""}>
                  {t("profile.name")}
                </label>
              </div>
              {errors.name && <span className="error">{errors.name?.message}</span>}

              <div className="user-box">
                <input
                  className={errors.surname ? "error" : ""}
                  type="text"
                  {...register("surname")}
                />
                <label className={errors.surname ? "error" : ""}>
                  {t("profile.surname")}
                </label>
              </div>
              {errors.surname && <span className="error">{errors.surname?.message}</span>}

              <div className="user-box">
                <input
                  className={errors.age ? "error" : ""}
                  type="number"
                  {...register("age")}
                />
                <label className={errors.age ? "error" : ""}>
                  {t("profile.age")}
                </label>
              </div>
              {errors.age && <span className="error">{errors.age?.message}</span>}

              <div className="user-box">
                <input
                  className={errors.phone ? "error" : ""}
                  type="text"
                  {...register("phone")}
                />
                <label className={errors.phone ? "error" : ""}>
                  {t("profile.phone")}
                </label>
              </div>
              {errors.phone && <span className="error">{errors.phone?.message}</span>}

              <div className="user-box">
                <input
                  className={errors.email ? "error" : ""}
                  type="text"
                  {...register("email")}
                />
                <label className={errors.email ? "error" : ""}>
                  {t("profile.email")}
                </label>
              </div>
              {errors.email && <span className="error">{errors.email?.message}</span>}

              <div className="user-box">
                <input
                  className={errors.address ? "error" : ""}
                  type="text"
                  {...register("address")}
                />
                <label className={errors.address ? "error" : ""}>
                  {t("profile.address")}
                </label>
              </div>
              {errors.address && <span className="error">{errors.address?.message}</span>}

              <div className="user-box">
                <input
                  type="file"
                  name="profileImage"
                  id="cImg"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleSeletctImage}
                />
                {preview && (
                  <div className="previewImage">
                    <img src={preview} alt="old-img" />
                  </div>
                )}
              </div>
              <div className="btn">
                <button type="submit">
                  {t("setting.updateProfile")}
                  <span></span>
                </button>
              </div>
            </form>
          </div>

          <div className="login-box" style={{ marginTop: "30px" }}>
            <h2 className="titleEdit" style={{ fontSize: "20px", marginBottom: "20px" }}>{t("addNewUser.changePassword")}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as any;
              const oldPass = form.oldPassword.value;
              const newPass = form.newPassword.value;
              if (!oldPass || !newPass) return showNotification("error", "Please fill all fields");
              setLoading(true);
              ProfileService.changePassword(oldPass, newPass)
                .then(() => {
                  showNotification("success", "Password changed successfully");
                  form.reset();
                })
                .catch((err: any) => {
                  showNotification("error", err.response?.data || "Failed to change password");
                })
                .finally(() => setLoading(false));
            }}>
              <div className="user-box">
                <input type="password" name="oldPassword" required />
                <label>{t("addNewUser.oldPassword")}</label>
              </div>
              <div className="user-box">
                <input type="password" name="newPassword" required />
                <label>{t("addNewUser.newPassword")}</label>
              </div>
              <div className="btn">
                <button type="submit">
                  {t("addNewUser.changePassword")}
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
