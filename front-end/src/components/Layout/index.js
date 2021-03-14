import React, { useEffect, useState } from "react";
import Header from "../Header/index";
import { Container, Jumbotron, Row, Col, Nav } from "react-bootstrap";
import { Link, NavLink, Redirect, useLocation } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import { SideBarData } from "./SidebarData";
const Layout = (props) => {
  const [options, setOptions] = useState([]);
  const opt = useSelector((state) => state.dashboard.options);
  const sideBarOptions = ["CATALOGUE", "USERS"];

  useEffect(() => {
    setOptions(opt);
  }, [opt]);

  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col className="sideBar" md={2}>
              <Nav>
                <ul>
                  {SideBarData.map((item, key) => {
                    return (
                      <li key={key} className="list-item">
                        <Link to={item.link} className="link">
                          <div className="icon">{item.icon}</div>
                          <div className="title">{item.title}</div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {/* <ul>
                    {options.map((option, index) => {
                      return (
                        <Nav.Item key={index}>
                          <li>
                            <Link
                              to={
                                option.toLowerCase() === "dashboard"
                                  ? `/dashboard`
                                  : `/dashboard/${option.toLowerCase()}`
                              }
                            >
                              {option.toUpperCase()}
                            </Link>
                          </li>
                        </Nav.Item>
                      );
                    })}
                  </ul> */}
              </Nav>
            </Col>
            <Col className="contentBox" md={10}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
