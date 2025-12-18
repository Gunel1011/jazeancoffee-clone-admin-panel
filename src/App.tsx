import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Myrouters from "./router/Myrouters";
import { Auth } from "./utils/AuthContext";

const App = () => {
  return (
    <Auth>
      <Layout>
        <Myrouters />
      </Layout>
      <ToastContainer />
    </Auth>
  );
};

export default App;
