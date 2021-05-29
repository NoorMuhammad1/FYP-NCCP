import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Logs from "components/Logs";
import DepositReport from "components/Reports/Deposit Report";
import MicroorganismReport from "components/Reports/Microorganism Report";
import OrderReport from "components/Reports/Order Report";
import PaymentReport from "components/Reports/Payment Report";
import UserReport from "components/Reports/User Report";
import SideBar from "components/SideBar";
import React, { useState } from "react";

const ReportsAndLogs = () => {
  const [option, setOption] = useState("");

  const getContent = () => {
    switch (option) {
      case "" || "Payment Report":
        return <PaymentReport />;
      case "Order Report":
        return <OrderReport />;
      case "Deposit Report":
        return <DepositReport />;
      case "User Report":
        return <UserReport />;
      case "Microorganism Report":
        return <MicroorganismReport />;
      case "Deposit Report":
        return <DepositReport />;
      case "Logs":
        return <Logs />;
      default:
        return <PaymentReport />;
    }
  };
  return (
    <SideBar active="ReportsAndLogs">
      <Grid container style={{ minHeight: "90vh" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          lg={2}
          style={{ position: "relative" }}
        >
          <Drawer
            variant="permanent"
            PaperProps={{
              style: {
                position: "absolute",
                width: "130%",
                marginLeft: "-30px",
              },
            }}
          >
            <div style={{ margin: "1rem 1rem" }}>
              <h4>Reports</h4>
            </div>
            <List>
              {[
                "Payment Report",
                "Order Report",
                "Deposit Report",
                "Microorganism Report",
                "User Report",
              ].map((text, index) => (
                <ListItem button key={text} onClick={(e) => setOption(text)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <div style={{ margin: "1rem 1rem" }}>
              <h4>Logs</h4>
            </div>
            <List>
              {["Logs"].map((text, index) => (
                <ListItem button key={text} onClick={(e) => setOption(text)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Grid>
        <Grid item xs md lg sm style={{ marginLeft: "1.5rem" }}>
          {getContent()}
        </Grid>
        {/* <Grid
          item
          xs={12}
          sm={12}
          // lg={1}
          // md={1}
          style={{ backgroundColor: "red" }}
        >
          SideBar
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          // lg={5}
          // md={5}
          style={{ backgroundColor: "yellow" }}
        >
          Content
        </Grid> */}
      </Grid>
    </SideBar>
  );
};

export default ReportsAndLogs;
