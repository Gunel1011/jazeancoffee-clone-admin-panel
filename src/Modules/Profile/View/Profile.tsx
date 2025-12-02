import { Link } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { user }: any = useContext(AuthContext);
  return (
    <section className="profile">
      <div className="container">
        <div className="row">
          <h2 className="profileTitle">{t("profile.profile")}</h2>
          <div className="profileUserData">
            <div className="profileImg">
              <img src={user?.profileImage} alt={user?.name} />
            </div>
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
                {" "}
                {t("profile.email")}: {user?.email}
              </Link>
              <Link to={`tel:${user?.phone}`}>
                {" "}
                {t("profile.phone")}: {user?.phone}
              </Link>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  user?.address || ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="address"
              >
                Address: {user?.address}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
