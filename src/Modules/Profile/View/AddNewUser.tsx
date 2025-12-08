import { useForm, type SubmitHandler } from "react-hook-form";
import { type IUserNew } from "../Models/ProfileModels";
import { object, string } from "yup";
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
  password: string().trim().required()
});
const ProfileSetting = () => {
  const { t } = useTranslation();
  const { user }: any = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
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
      console.log(data)
      const res = await ProfileService.addNewUser(data);
      console.log(res)
      showNotification("success", res?.message);
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
          <h2 className="titleEdit">{t("addNewUser.profileSetting")}</h2>
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
              {/* email  */}
              <div className="user-box">
                <input
                  className={errors.email ? "error" : ""}
                  type="text"
                  {...register("email")}
                />
                <label className={errors.email ? "error" : ""}>
                  {t("setting:email")}
                </label>
              </div>
              {errors.email && (
                <span className="error">{errors.email?.message}</span>
              )}
              {/* password */}
              <div className="user-box">
                <input
                  className={errors.password ? "error" : ""}
                  type="text"
                  {...register("password")}
                />
                <label className={errors.password ? "error" : ""}>
                  {t("setting:pas")}
                </label>
              </div>
              {errors.password && (
                <span className="error">{errors.password?.message}</span>
              )}
              <div className="btn">
                <button>
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

export default ProfileSetting;
