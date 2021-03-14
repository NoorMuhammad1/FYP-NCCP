import React from "react";
import { Container } from "react-bootstrap";
import DashboardHeader from "../DashboardHeader/index";
const DashboardLayout = (props) => {
  return (
    <>
      <DashboardHeader />
      <Container>{props.children}</Container>
    </>
  );
};

export default DashboardLayout;
