// Icons
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import i18n, { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [selectedLng, setSletectedLng] = useState(i18n.language || "");
  const { t } = useTranslation();

  const handleChangeLng = (lng: string) => {
    changeLanguage(lng);
    setSletectedLng(lng);
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <p className="copyright">Jazean Coffee</p>
          <ul className="socialList">
            <li className="socialItem"> {t("footer.follow")}</li>
            <li className="socialItem">
              <Link target="_blank" to={"https://x.com/Jazeancoffee"}>
                <FaTwitter />
              </Link>
            </li>
            <li className="socialItem">
              <Link
                target="_blank"
                to={
                  "https://www.facebook.com/Saudidq/posts/%D9%82%D9%87%D9%88%D8%A9-%D8%A7%D9%84%D9%8A%D9%88%D9%85-%D9%85%D9%86-jazeancoffee-%D8%A3%D9%88-urthcaffesaudi-%D8%A3%D9%88-wacafecoffee%D8%AD%D9%8A_%D8%A7%D9%84%D8%B3%D9%81%D8%A7%D8%B1%D8%A7%D8%AA-%D9%8A%D9%82%D8%AF%D9%85-%D9%84%D9%83-/478244824815060/"
                }
              >
                <FaFacebookF />
              </Link>
            </li>
            <li className="socialItem">
              <Link
                target="_blank"
                to={"https://www.instagram.com/jazeancoffee"}
              >
                <FaInstagram />
              </Link>
            </li>
            <li className="socialItem">
              <Link
                target="_blank"
                to={"https://www.youtube.com/channel/UCaabhhkqzM8dP7u4DgPMMRg"}
              >
                <FaYoutube />
              </Link>
            </li>
          </ul>
          <div className="inps">
            <select
              name="language"
              className="language"
              value={selectedLng}
              onChange={(e) => handleChangeLng(e.target.value)}
            >
              <option value="en">English</option>
              <option value="az">Azərbaycanca</option>
              <option value="tr">Türkçe</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
