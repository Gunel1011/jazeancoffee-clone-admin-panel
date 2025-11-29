import type { ReactNode } from "react";
import Home from "../Modules/Home/Home";
import AllCoffee from "../Modules/Dashboard/View/AllCoffee";
import NotFound from "../components/NotFound";
import EditCoffee from "../Modules/Dashboard/View/EditCoffee";

interface IPage {
  id: string;
  title: string;
  path: string;
  elemet: ReactNode;
  is_visible: boolean;
  for_header: boolean;
}
const pageList: IPage[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    elemet: <Home />,
    is_visible: true,
    for_header: true,
  },
  {
    id: "coffee",
    title: "coffee",
    path: "/coffee",
    elemet: <AllCoffee />,
    is_visible: true,
    for_header: true,
  },
  {
    id: "add-coffee",
    title: "Add new coffee",
    path: "/add-coffee",
    elemet: <Home />,
    is_visible: true,
    for_header: true,
  },
  {
    id: "edit-coffee",
    title: "Edit Coffee",
    path: "/edit-coffee/:id",
    elemet: <EditCoffee />,
    is_visible: true,
    for_header: false,
  },
  {
    id: "not_found",
    title: "Not Found",
    path: "*",
    elemet: <NotFound />,
    is_visible: true,
    for_header: false,
  },
];

export default pageList;
