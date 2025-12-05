import type { ReactNode } from "react";
import Home from "../Modules/Home/Home";
import AllCoffee from "../Modules/Dashboard/View/AllCoffee";
import NotFound from "../components/NotFound";
import EditCoffee from "../Modules/Dashboard/View/EditCoffee";
import Login from "../Modules/Login/View/Login";
import AddNewProduct from "../Modules/Dashboard/View/AddNewProduct";
import Profile from "../Modules/Profile/View/Profile";
import ProfileSetting from "../Modules/Profile/View/ProfileSetting";

interface IPage {
  id: string;
  title: string;
  path: string;
  elemet: ReactNode;
  is_visible: boolean;
  for_header: boolean;
  for_token: boolean;
}
const pageList: IPage[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    elemet: <Home />,
    is_visible: true,
    for_header: true,
    for_token: false,
  },
  {
    id: "coffee",
    title: "coffee",
    path: "/coffee",
    elemet: <AllCoffee />,
    is_visible: true,
    for_header: true,
    for_token: true,
  },
  {
    id: "add-coffee",
    title: "Add new coffee",
    path: "/add-coffee",
    elemet: <AddNewProduct />,
    is_visible: true,
    for_header: true,
    for_token: true,
  },
  {
    id: "edit-coffee",
    title: "Edit Coffee",
    path: "/edit-coffee/:id",
    elemet: <EditCoffee />,
    is_visible: true,
    for_header: false,
    for_token: true,
  },
  {
    id: "profile",
    title: "Profile",
    path: "/profile",
    elemet: <Profile />,
    is_visible: true,
    for_header: false,
    for_token: true,
  },
  {
    id: "profileSetting",
    title: "ProfileSetting",
    path: "/setting",
    elemet: <ProfileSetting />,
    is_visible: true,
    for_header: false,
    for_token: true,
  },
  {
    id: "login",
    title: "Login",
    path: "/login",
    elemet: <Login />,
    is_visible: true,
    for_header: false,
    for_token: false,
  },
  {
    id: "not_found",
    title: "Not Found",
    path: "*",
    elemet: <NotFound />,
    is_visible: true,
    for_header: false,
    for_token: true,
  },
];

export default pageList;
