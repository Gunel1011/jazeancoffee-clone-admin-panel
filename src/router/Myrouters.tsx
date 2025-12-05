import { Route, Routes } from "react-router-dom";
import pageList from "../constant/pageList";
import ProtectedRouter from "./ProtectedRouter";
import Login from "../Modules/Login/View/Login";
import Home from "../Modules/Home/Home";
const Myrouters = () => {
  return (
    <Routes>
      <Route element={<ProtectedRouter />}>
        {pageList
          .filter((item) => item.is_visible)
          .filter((page) => page.for_token)
          .map((page) => (
            <Route path={page.path} element={page.elemet} />
          ))}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Myrouters;
