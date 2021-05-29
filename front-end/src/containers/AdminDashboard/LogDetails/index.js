import SideBar from "components/SideBar";
import React from "react";

const LogDetails = (props) => {
  const { id } = props.location.state;
  return <SideBar active="Logs">{id}</SideBar>;
};

export default LogDetails;
