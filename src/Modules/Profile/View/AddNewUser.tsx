import { useForm, type SubmitHandler } from "react-hook-form";
import { type IUserNew } from "../Models/ProfileModels";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ProfileService } from "../Service/ProfileService";
import showNotification from "../../../utils/showNotification";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";

const userShema = object({
  name: string().trim().required(),
  surname: string().trim().required(),
  email: string().trim().required(),
  password: string().trim().required()
});
const AddNewUser = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserNew>({
    resolver: yupResolver(userShema) as any,
    values: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IUserNew> = async (data) => {
    setLoading(true);
    try {
      const res = await ProfileService.addNewUser(data);
      showNotification("success", res?.message || "User added successfully");
      window.location.reload();
    } catch (error: any) {
      showNotification("error", error.response?.data || "Failed to add user");
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
          <h2 className="titleEdit">{t("addNewUser.profileSetting")}</h2>
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
              {errors.name && (
                <span className="error">{errors.name?.message}</span>
              )}
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
              {errors.surname && (
                <span className="error">{errors.surname?.message}</span>
              )}
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
              {errors.email && (
                <span className="error">{errors.email?.message}</span>
              )}
              <div className="user-box">
                <input
                  className={errors.password ? "error" : ""}
                  type="password"
                  {...register("password")}
                />
                <label className={errors.password ? "error" : ""}>
                  {t("addNewUser.newPassword")}
                </label>
              </div>
              {errors.password && (
                <span className="error">{errors.password?.message}</span>
              )}
              <div className="btn">
                <button type="submit">
                  {t("addNewUser.updateProfile")}
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

export default AddNewUser;
