import { useForm, type SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ILoginRequest } from "../Models/LoginModels";
import showNotification from "../../../utils/showNotification";
import { LoginService } from "../Service/LoginService";
import { useContext, useState } from "react";
import { AuthContext } from "../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProfileService } from "../../Profile/Service/ProfileService";
import Loading from "../../../components/Loading";

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
  const [view, setView] = useState<"login" | "forgot" | "reset">("login");
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: yupResolver(loginChema),
  });

  const onLoginSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    setLoading(true);
    try {
      await LoginService.login(data);
      setIsUserIn(true);
      navigation("/");
    } catch (error: any) {
      showNotification("error", error.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) return showNotification("error", "Email daxil edin");

    localStorage.removeItem("token");
    setLoading(true);
    try {
      await ProfileService.sendResetPasswordOTP(email);
      setResetEmail(email);
      showNotification("success", "OTP kod email-inizə göndərildi");
      setView("reset");
    } catch (error: any) {
      showNotification("error", error.response?.data || "OTP göndərilmədi");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: any) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    const newPassword = e.target.newPassword.value;

    if (!otp || !newPassword) return showNotification("error", "Bütün sahələri doldurun");

    setLoading(true);
    try {
      await ProfileService.resetPasswordWithOTP(resetEmail, otp, newPassword);
      showNotification("success", "Şifrə uğurla yeniləndi");
      setView("login");
    } catch (error: any) {
      showNotification("error", error.response?.data || "Şifrə yenilənmədi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="loginSection">
      <div className="container">
        <div className="row">
          {view === "login" && (
            <>
              <h2 className="loginSectionTitle">Login</h2>
              <div className="loginBox">
                <form onSubmit={handleSubmit(onLoginSubmit)}>
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
                  <div style={{ textAlign: "right", marginBottom: "15px" }}>
                    <span
                      onClick={() => setView("forgot")}
                      style={{ cursor: "pointer", color: "#b25d27", fontSize: "14px" }}
                    >
                      Şifrəni unutmusunuz?
                    </span>
                  </div>
                  <button className="loginBtn">Login</button>
                </form>
              </div>
            </>
          )}

          {view === "forgot" && (
            <>
              <h2 className="loginSectionTitle">Şifrəni bərpa et</h2>
              <div className="loginBox">
                <form onSubmit={handleForgotSubmit}>
                  <div className="userBox">
                    <label>Email daxil edin</label>
                    <input type="email" name="email" required />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <button type="button" onClick={() => setView("login")} className="loginBtn" style={{ background: "#666", width: "45%" }}>Geri</button>
                    <button type="submit" className="loginBtn" style={{ width: "45%" }}>OTP Göndər</button>
                  </div>
                </form>
              </div>
            </>
          )}

          {view === "reset" && (
            <>
              <h2 className="loginSectionTitle">Yeni şifrə tənzimlə</h2>
              <div className="loginBox">
                <form onSubmit={handleResetSubmit}>
                  <div className="userBox">
                    <label>OTP Kod</label>
                    <input type="text" name="otp" required />
                  </div>
                  <div className="userBox">
                    <label>Yeni Şifrə</label>
                    <input type="password" name="newPassword" required />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <button type="button" onClick={() => setView("forgot")} className="loginBtn" style={{ background: "#666", width: "45%" }}>Geri</button>
                    <button type="submit" className="loginBtn" style={{ width: "45%" }}>Təsdiqlə</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
