import { useForm, type SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ILoginRequest } from "../Models/LoginModels";
import showNotification from "../../../utils/showNotification";
import { LoginService } from "../Service/LoginService";
import { useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const loginChema = object({
  email: string()
    .trim()
    .required()
    .matches(EMAIL_REGEX, "Zəhmət olmasa düzgün mail daxil edin..."),
  password: string()
    .trim()
    .required()
    .matches(PASSWORD_REGEX, "Zəhmət olmasa düzgün şifrə daxil edin..."),
});
const Login = () => {
  const { setIsUserIn } = useContext(AuthContext);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: yupResolver(loginChema),
  });
  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    try {
      await LoginService.login(data);
      setIsUserIn(true);
      navigation("/");
    } catch (error: any) {
      console.log(error);
      showNotification("error", error.response?.data);
    }
  };
  return (
    <section className="loginSection">
      <div className="container">
        <div className="row">
          <h2 className="loginSectionTitle">Login</h2>
          <div className="loginBox">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="userBox">
                <label>Email</label>
                <input type="email" {...register("email")} />
                {errors.email && (
                  <span className="errorMsg">{errors.email?.message}</span>
                )}
              </div>
              <div className="userBox">
                <label>Password</label>
                <input type="password" {...register("password")} />
                {errors.password && (
                  <span className="errorMsg">{errors.password?.message}</span>
                )}
              </div>
              <button className="loginBtn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
