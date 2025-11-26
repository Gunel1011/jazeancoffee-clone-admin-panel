import { Link } from "react-router-dom";
import CoffeeNotFound from "../assets/img/gift/CuteCupAnimatedStickers-FurkanSyler-ezgif.com-gif-maker (1).gif";
const NotFound = () => {
  return (
    <section className="notFound">
      <div className="container">
        <div className="row">
          <div className="notFoundBlock">
            <h2 className="notFoundTitle">404 Not Found...</h2>
            <p className="notFoundText">
              Oops… Coffee spilled! This page doesn’t exist.
            </p>
            <div className="link">
              <Link to={"/"} className="backHome">
                Back to Home
              </Link>
            </div>
          </div>
          <div className="notFoundImg">
            <img src={CoffeeNotFound} alt="imgNotFound" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
