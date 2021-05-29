import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// import { ReactComponent as Cell } from "./Icons/cell.svg";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import SettingsIcon from "@material-ui/icons/Settings";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/AdminDashboard",
  },
  {
    title: "Catalogue",
    icon: <DashboardIcon />,
    link: "/adminDashboard/Microorganisms",
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
  {
    title: "ReportsAndLogs",
    icon: <MonetizationOnIcon />,
    link: "/adminDashboard/ReportsAndLogs",
  },
  {
    title: "Others",
    icon: <MonetizationOnIcon />,
    link: "/adminDashboard/others",
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
