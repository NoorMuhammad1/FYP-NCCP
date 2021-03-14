import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import { ReactComponent as Cell } from "./Icons/cell.svg";
export const SideBarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    title: "Catalogue",
    icon: (
      <Cell style={{ fill: "white", width: "1.25rem", height: "1.063rem" }} />
    ),
    link: "/dashboard/catalogue",
  },
  {
    title: "Users",
    icon: <PeopleIcon />,
    link: "/dashboard/users",
  },
];
