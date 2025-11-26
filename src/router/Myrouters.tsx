import { Route, Routes } from "react-router-dom";
import pageList from "../constant/pageList";
const Myrouters = () => {
  return (
    <Routes>
      {pageList
        .filter((item) => item.is_visible)
        .map((page) => (
          <Route path={page.path} element={page.elemet} />
        ))}
    </Routes>
  );
};

export default Myrouters;
