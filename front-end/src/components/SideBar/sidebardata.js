import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
// import { ReactComponent as Cell } from "./Icons/cell.svg";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
export const sidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/AdminDashboard",
  },
  {
    title: "Users",
    icon: <PeopleRoundedIcon />,
    link: "/adminDashboard/users",
  },
  {
    title: "Orders",
    icon: <ListAltIcon />,
    link: "/adminDashboard/orders",
  },
  {
    title: "Deposits",
    icon: <AccountBalanceIcon />,
    link: "/adminDashboard/deposits",
  },
  {
    title: "Payments",
    icon: <MonetizationOnIcon />,
    link: "/adminDashboard/payments",
  },
  // {
  //   title: "Reports",
  //   icon: <AssessmentIcon />,
  //   link: "/adminDashboard/reports",
  // },

  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/adminDashboard/settings",
  },
];
