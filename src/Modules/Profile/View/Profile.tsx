import { Link } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const { user }:any = useContext(AuthContext);
  return (
    <section className="profile">
      <div className="container">
        <div className="row">
          <h2 className="profileTitle">Profile</h2>
          <div className="profileUserData">
            <div className="profileImg">
              <img src={user?.profileImage} alt={user?.name} />
            </div>
            <div className="rightSide">
              <h2 className="name">Name: {user?.fullName}</h2>
              <p className="age">Age: {user?.age}</p>
              <Link to={`mailto:${user?.email}`}>Email: {user?.email}</Link>
              <Link to={`tel:${user?.phone}`}>Phone: {user?.phone}</Link>
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
