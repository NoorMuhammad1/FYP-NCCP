import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Button,
} from "@material-ui/core";
import { esES } from "@material-ui/data-grid";
import { EmailOutlined } from "@material-ui/icons";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import HomeIcon from "@material-ui/icons/Home";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import PhoneIcon from "@material-ui/icons/Phone";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions";
import "./style.css";

const PageHeader = (props) => {
  const dispatch = useDispatch();
  const [sideBarshow, setSideBarShow] = useState(false);
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const authenticate = useSelector((state) => state.auth.authenticate);
  const error = useSelector((state) => state.auth.error);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const anchorRef = React.useRef(null);
  const handleLogout = () => {
    setUserSignedIn(false);
    dispatch(logout());
  };

  const handleAccountToggle = () => {
    setOpenAccountMenu((prevOpen) => !prevOpen);
  };

  const handleAccountMenuClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      console.log("hi");
      return;
    }
    setOpenAccountMenu(false);
  };

  const prevOpen = React.useRef(openAccountMenu);
  useEffect(() => {
    if (prevOpen.current === true && openAccountMenu === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openAccountMenu;
  }, [openAccountMenu]);

  const handleListKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setOpenAccountMenu(false);
    }
  };

  useEffect(() => {
    console.log(authenticate);
    if (authenticate) {
      setUserSignedIn(true);
    }
  }, [authenticate]);
  return (
    <>
      {sideBarshow ? (
        <div className={sideBarshow ? "sidebar-active" : "sidebar"}>
          <div className="sidebar-upper-div">
            <div className="sidebar-upper-div-options">
              <HomeIcon fontSize="large" />
              {userSignedIn ? (
                <Link onClick={(e) => handleLogout()}>Sign Out</Link>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </div>
            {/* <CloseIcon onClick={(e) => setSideBarShow(false)} /> */}
          </div>
          <div className="sidebar-links">
            <ul className="sidebar-links-list">
              <li className="sidebar-links-list-item">
                <a className="sidebar-links-list-item-link">About NCCP</a>
              </li>
              <li className="sidebar-links-list-item">
                <a className="sidebar-links-list-item-link">Deposit</a>
              </li>
              <li className="sidebar-links-list-item">
                <a className="sidebar-links-list-item-link">Order</a>
              </li>
              <li className="sidebar-links-list-item">
                <a className="sidebar-links-list-item-link">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="sidebar-footer">
            <ul className="sidebar-footer-list">
              <li className="sidebar-footer-list-items">
                <ShoppingCartIcon className="sidebar-footer-list-item" />
              </li>
              <li className="sidebar-footer-list-items">
                <ShoppingCartIcon className="sidebar-footer-list-item" />
              </li>
              <li className="sidebar-footer-list-items">
                <ShoppingCartIcon className="sidebar-footer-list-item" />
              </li>
            </ul>
          </div>
        </div>
      ) : null}
      <div className="upper-ticker">
        <Container className="upper-ticker-content">
          <div className="upper-ticker-contacts">
            <div className="upper-ticker-contact-number">
              <PhoneIcon fontSize="small" />
              <span> +923356291805</span>
            </div>
            <div className="upper-ticker-contact-email">
              <EmailOutlined />
              <span> zainnoor6035020@gmail.com</span>
            </div>
          </div>
          <div className="upper-ticker-timings">
            <QueryBuilderIcon />
            <span> Working Hours - Mon - Fri: 9:30 - 18:30</span>
          </div>
        </Container>
      </div>
      <div className="stickable-navbar" style={{ backgroundColor: "white" }}>
        <Container className="stickable-navbar-content">
          <div className="stickable-navbar-logo">NCCP</div>
          <div className="stickable-navbar-links">
            <Link to={"/"} className="stickable-navbar-link">
              Home
            </Link>
            <Link to={"/catalogue"} className="stickable-navbar-link">
              Resources
            </Link>
            <Link to={"/deposits"} className="stickable-navbar-link">
              Services
            </Link>
            <Link to={"#"} className="stickable-navbar-link">
              Contact
            </Link>
            <div className="stickable-navbar-operations">
              <div className="stickable-navbar-operation-sign-in">
                {userSignedIn ? (
                  <>
                    <Link ref={anchorRef} onClick={handleAccountToggle}>
                      Account
                    </Link>
                    <Popper
                      open={openAccountMenu}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                      style={{ marginTop: "1rem" }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom"
                                ? "center top"
                                : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener
                              onClickAway={handleAccountMenuClose}
                            >
                              <MenuList
                                autoFocus={openAccountMenu}
                                id="menu"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem>
                                  <Link
                                    style={{ color: "royalblue" }}
                                    to={"/userDashboard"}
                                  >
                                    Dashboard
                                  </Link>
                                </MenuItem>
                                <MenuItem
                                  style={{ color: "royalblue" }}
                                  onClick={handleLogout}
                                >
                                  Logout
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </>
                ) : (
                  // <Link onClick={(e) => handleLogout()}>Sign Out</Link>
                  <Link to="/signin">Sign In</Link>
                )}
              </div>
              <div className="stickable-navbar-operation-cart">
                <Link to="/cart">
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </Link>
              </div>
              {/* <div
                className="stickable-navbar-operation-search"
                onClick={(e) => setSearchBarShow(!searchBarShow)}
              >
                {searchBarShow ? <CloseOutlinedIcon /> : <SearchOutlinedIcon />}
              </div> */}
            </div>
          </div>
          <div
            className="stickable-navbar-hamburger-menu"
            onClick={(e) => setSideBarShow(!sideBarshow)}
          >
            {sideBarshow ? (
              <CloseOutlinedIcon fontSize="large" />
            ) : (
              <MenuRoundedIcon fontSize="large" />
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default PageHeader;
