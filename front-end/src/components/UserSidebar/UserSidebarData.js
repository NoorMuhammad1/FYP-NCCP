import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DashboardIcon      from '@material-ui/icons/Dashboard';
import ListAltIcon        from '@material-ui/icons/ListAlt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import { ReactComponent as Cell } from "./Icons/cell.svg";
import SettingsIcon       from '@material-ui/icons/Settings';

export const UserSidebarData = [

  {
    title: 'User Dashboard',
    icon : <DashboardIcon />,
    link : '/userDashboard',
  },

  //   {
  //     title: "Users",
  //     icon: <PeopleRoundedIcon />,
  //     link: "/adminDashboard/users",
  //   },

  {
    title: ' User Orders',
    icon : <ListAltIcon />,
    link : '/userDashboard/userOrdersDashboard',
  },

  {
    title: 'User Deposits',
    icon : <AccountBalanceIcon />,
    link : '/userDashboard/userDepositDashboard',
  },

  {
    title: 'User Payments',
    icon : <MonetizationOnIcon />,
    link : '/userDashboard/userPaymentDashboard',
  },

  //   // {
  //   //   title: "Reports",
  //   //   icon: <AssessmentIcon />,
  //   //   link: "/adminDashboard/reports",
  //   // },

  {
    title: 'User Settings',
    icon : <SettingsIcon />,
    link : '/userDashboard/userSettings',
  },

];
