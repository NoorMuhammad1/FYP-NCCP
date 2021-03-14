import React, { useState } from "react";
import DepositItemList from "../../components/DepositItemList";
import { Button, CircularProgress, FormControl } from "@material-ui/core";
import SideBar from "../../components/SideBar";
import DropDown from "../../components/DropDown";
// import "./style.css";
const AdminDashboardDeposits = () => {
  const [data, setData] = useState([
    {
      deposit_id: "120191",
      created: "Aug 1,2019",
      customer: "Harriet Santigo",
      total: "$604.50",
      status: "Request",
    },
    {
      deposit_id: "121090",
      created: "Jul 21,2019",
      customer: "Sara Graham",
      total: "$524.25",
      status: "Processing",
    },
  ]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("");

  const search = (data) => {
    return data.filter((row) => {
      const applyFilter =
        filter === "" || row.status.toLowerCase() === filter.toLowerCase();
      return (
        applyFilter &&
        (row.deposit_id.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
          row.customer.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1)
      );
    });
  };

  const sortData = (data) => {
    data[0] &&
      data.sort((a, b) => b[sortBy.toLowerCase()] - a[sortBy.toLowerCase()]);
    return data.sort(
      (a, b) => b[sortBy.toLowerCase() - a[sortBy.toLowerCase()]]
    );
  };

  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">Users info is being fetched</h3>
        <CircularProgress className="fetch__data__spinner" />
      </div>
    );
  };

  const ErrorMessage = () => {
    return (
      <div className="error__div">
        <h3 className="error__title">{"abc"}</h3>
      </div>
    );
  };

  const columns = [
    {
      title: "Deposit ID",
      width: "10%",
    },
    {
      title: "Created",
      width: "20%",
    },
    {
      title: "Customer",
      width: "30%",
    },
    {
      title: "Total",
      width: "10%",
    },
    {
      title: "Status",
      width: "10%",
    },
    {
      title: "",
      width: "10%",
    },
  ];

  return (
    <SideBar active="Orders">
      <div className="div__one"></div>
      <div className="div__two">
        <h3>Deposits</h3>
        <div>
          <DropDown
            title="Sort By"
            value={sortBy}
            setValue={setSortBy}
            variant="outlined"
            labelWidth={60}
            width="150px"
            data={[
              {
                title: "Deposit ID",
                value: "deposit_id",
              },
              {
                title: "Customer Name",
                value: "customer_name",
              },
              {
                title: "Total",
                value: "total",
              },
            ]}
          />
          <DropDown
            title="Status"
            value={filter}
            setValue={setFilter}
            variant="outlined"
            labelWidth={60}
            width="150px"
            data={[
              {
                title: "Request",
                value: "request",
              },
              {
                title: "Processing",
                value: "processing",
              },
              {
                title: "Sent",
                value: "sent",
              },
              {
                title: "Approved",
                value: "approved",
              },
            ]}
          />
        </div>
      </div>
      <div className="div__three">
        <DepositItemList columns={columns} rows={sortData(search(data))} />
      </div>
    </SideBar>
  );
};

export default AdminDashboardDeposits;
