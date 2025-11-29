import Footer from "./components/Footer";
import Header from "./components/Header";
import Myrouters from "./router/Myrouters";
import { Auth } from "./utils/AuthContext";

const App = () => {
  return (
    <Auth>
      <Header />
      <Myrouters />
      <Footer />
    </Auth>
  );
};

export default App;
