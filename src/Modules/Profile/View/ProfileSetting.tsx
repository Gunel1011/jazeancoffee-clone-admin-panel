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
  const { user }: any = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
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
    setPreview(URL?.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<IUserRequest> = async (data) => {
    setLoading(true);
    try {
      const res = await ProfileService.editUserData(data);
      setPreview(res.productImage);
      showNotification("success", res?.message);
      const formData = new FormData();
      if (image) {
        formData.append("profileImage", image);
        const resImage = await ProfileService.changeProfileImage(formData);
        console.log(resImage);
      }
      navigation("/profile");
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.log(error);
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
              {/* name  */}
              <div className="user-box">
                <input
                  className={errors.name ? "error" : ""}
                  type="text"
                  {...register("name")}
                />
                <label className={errors.name ? "error" : ""}>
                  {t("setting:name")}
                </label>
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
                <label className={errors.surname ? "error" : ""}>
                  {t("setting:surname")}
                </label>
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
                <label className={errors.age ? "error" : ""}>
                  {t("setting:age")}
                </label>
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
                  {t("setting:phone")}
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
                <label className={errors.age ? "error" : ""}>
                  {t("setting:email")}
                </label>
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
                <label className={errors.address ? "error" : ""}>
                  {t("setting.address")}
                </label>
              </div>
              {errors.address && (
                <span className="error">{errors.address?.message}</span>
              )}
              {/* radio  */}
              <div className="userBox">
                <div className="roleBox">
                  <label htmlFor="roleAdmin" style={{ color: "#fff" }}>
                    {t("setting.admin")}
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
                    {t("setting.user")}
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
                <label>{t("setting.isActive")}</label>
              </div>
              <div className="user-box">
                <input
                  type="file"
                  name="prfileImage"
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
                  {t("setting.updateProfile")}
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
