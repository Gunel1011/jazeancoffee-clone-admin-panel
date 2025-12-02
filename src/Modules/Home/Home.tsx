import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <section className="home">
      <div className="container">
        <div className="row">
          <h1 className="homeTitle">{t("home.welcomeJazeanDashboard")}</h1>
        </div>
      </div>
    </section>
  );
};

export default Home;
