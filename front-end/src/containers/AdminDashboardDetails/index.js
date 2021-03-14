import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import "./style.css";
const AdminDashboardDetails = () => {
  const [rangeDates, setRangeDates] = useState({
    start: new Date().toISOString().substr(0, 10),
    end: new Date().toISOString().substr(0, 10),
  });
  return (
    <SideBar active="Dashboard">
      <div className="admin-dashboard">
        <h3 className="component-heading">Main Dashboard</h3>
        <div className="dashboard-dates">
          <TextField
            id="start-date"
            className="starting-date"
            type="date"
            variant="outlined"
            label="From"
            value={rangeDates.start}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="end-date"
            className="ending-date"
            type="date"
            variant="outlined"
            label="To"
            value={rangeDates.start}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="total-orders-card card" id="total-orders-card">
          <h5>Total Orders</h5>
          <h4>344</h4>
        </div>
        <div className="total-orders-card card" id="total-orders-card">
          <h5>Total Orders</h5>
          <h4>344</h4>
        </div>
        <div className="total-orders-card card" id="total-orders-card">
          <h5>Total Orders</h5>
          <h4>344</h4>
        </div>
        {/* <div className="total-count-cards">
         
        </div> */}
        <div className="top-selling-div">Top Selling</div>
      </div>
    </SideBar>
  );
};

export default AdminDashboardDetails;
