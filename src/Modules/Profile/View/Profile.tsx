import { Link } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdEmail } from "react-icons/md";
import { MdOutlineSmartphone } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";


const Profile = () => {
  const { t } = useTranslation();
  const { user }: any = useContext(AuthContext);
  const [openImage, setOpenImage] = useState(false)

  return (
    <section className="profile">
      <div className="container">
        <div className="row">
          <h2 className="profileTitle">{t("profile.profile")}</h2>
          <div className="profileUserData">
            <div className={`profileImg ${openImage ? "zoomed" : ""}`}>
              <img onClick={() => setOpenImage(!openImage)} src={user?.profileImage} alt={user?.name} />
            </div>
            <Link className="btnSettingTo" to={"/setting"}>Düzəliş et</Link>
            <div className="rightSide">
              <h2 className="name">
                {t("profile.name")}: {user?.name}
              </h2>
              <h2 className="surname">
                {t("profile.surname")}: {user?.surname}
              </h2>
              <p className="age">
                {" "}
                {t("profile.age")}: {user?.age}
              </p>
              <Link to={`mailto:${user?.email}`}>
                <MdEmail className="icon" /> :
                {" "}
                {user?.email}
              </Link>
              <Link to={`tel:${user?.phone}`}>
                {" "}
                <MdOutlineSmartphone className="icon" />
                : {user?.phone}
              </Link>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  user?.address || ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="address"
              >
                <FaMapLocationDot className="icon" />
                : {user?.address}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
