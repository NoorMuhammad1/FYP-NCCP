import { Avatar } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LayersIcon from "@material-ui/icons/Layers";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authConstants } from "../../actions/constants";
import { sidebarData } from "./sidebardata";
// import Image from "./image.jpg";
import "./style.css";

const SideBar = (props) => {
  const sidebarCollapse = useSelector((state) => state.sidebar.collapsed);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(sidebarCollapse);

  const dispatch = useDispatch();

  // const showNavbar = (toggleId, navId, bodyId, headerId, dashboardId) => {
  //   dispatch({ type: authConstants.COLLAPSE_SIDEBAR });
  //   // console.log("showing sidebar");

  //   const toggle = document.getElementById(toggleId),
  //     nav = document.getElementById(navId),
  //     bodypd = document.getElementById(bodyId),
  //     headerpd = document.getElementById(headerId),
  //     dashboardpd = document.getElementById(dashboardId);
  //   if (toggle && nav && bodypd && headerpd) {
  //     // nav.classList.toggle("show");
  //     // bodypd.classList.toggle("body-pd");
  //     headerpd.classList.toggle("body-pd");
  //     dashboardpd.classList.toggle("body-pd");
  //   }
  // };

  // if (sidebarCollapse === false) {
  //   console.log(sidebarCollapse);
  //   showNavbar(
  //     "header__toggle",
  //     "nav-bar",
  //     "body-pd",
  //     "header",
  //     "dashboard__content"
  //   );
  // }

  const changeActive = (e) => {
    const link_color = document.querySelectorAll(".nav__link");
    if (link_color) {
      link_color.forEach((l) => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
    }
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={sidebarCollapsed ? null : "body-pd"} id="body-pd">
      <header
        className={`header ${sidebarCollapsed ? null : "body-pd"}`}
        id="header"
      >
        <div
          className="header__toggle"
          id="header__toggle"
          onClick={(e) => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <MenuRoundedIcon /> : <CloseRoundedIcon />}
        </div>

        <div className="header__img">
          <Avatar src={user.profilePicture} />
          {/* <img src={user.profilePicture} /> */}
        </div>
      </header>
      <div
        className={`l-navbar ${sidebarCollapsed ? null : "show"}`}
        id="nav-bar"
      >
        <nav className="nav">
          <div>
            <div id="brand">
              <div className="brand_logo">
                <LayersIcon />
              </div>
              <div className="brand_name">NCCP</div>
            </div>
            <div>
              {sidebarData.map((link, key) => {
                return (
                  <Link
                    to={link.link}
                    className={`nav__link ${
                      props.active.toLowerCase() === link.title.toLowerCase()
                        ? "active"
                        : null
                    }`}
                    key={key}
                  >
                    {link.icon}
                    <div className="nav_link_title">{link.title}</div>
                  </Link>
                );
              })}
              <Link
                onClick={(e) => dispatch({ type: authConstants.LOGOUT })}
                className="nav__link"
                to=""
              >
                <ExitToAppIcon className="nav_link_logo" />
                <div className="nav_link_title">Logout</div>
              </Link>
              {/* <Link
                to="/AdminDashboard"
                className="nav__link active"
                onClick={(e) => changeActive(e)}
              >
                <DashboardIcon className="nav_link_logo" />
                <div className="nav_link_title">Dashboard</div>
              </Link>

              <Link
                to="/dashboard/users"
                className="nav__link"
                onClick={(e) => changeActive(e)}
              >
                <PeopleRoundedIcon className="nav_link_logo" />
                <div className="nav_link_title">Users</div>
              </Link>
              <Link
                to="/dashboard/orders"
                className="nav__link"
                onClick={(e) => changeActive(e)}
              >
                <ListAltIcon className="nav_link_logo" />
                <div className="nav_link_title">Orders</div>
              </Link>
              <Link
                to="/dashboard/deposits"
                className="nav__link"
                onClick={(e) => changeActive(e)}
              >
                <AccountBalanceIcon className="nav_link_logo" />
                <div className="nav_link_title">Deposits</div>
              </Link>
              <Link
                to="/dashboard/reports"
                className="nav__link"
                onClick={(e) => changeActive(e)}
              >
                <AssessmentIcon className="nav_link_logo" />
                <div className="nav_link_title">Reports</div>
              </Link> */}
            </div>
          </div>
        </nav>
      </div>
      <div
        className={`dashboard__content ${sidebarCollapsed ? null : "body-pd"}`}
        id="dashboard__content"
        style={{ backgroundColor: "#eeeeee", minHeight: "90vh" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default SideBar;
