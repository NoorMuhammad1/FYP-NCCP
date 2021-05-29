import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import DropDown from "../../../components/DropDown";
import SideBar from "../../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "components/SearchBar";
import CustomTable from "components/CustomTable";
import { useEffect } from "react";
import { getDeposits } from "actions";
import UserSideBar from "components/UserSidebar/UserSidebar";

const UserDeposits = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const deposits = useSelector((state) => state.deposit);

  useEffect(() => {
    dispatch(getDeposits());
  }, []);

  useEffect(() => {
    setData(deposits.getDeposits.deposits || []);
  }, [deposits]);

  const search = (data) => {
    return (
      data &&
      data.filter((row) => {
        const applyFilter =
          filter === "" || row.status.toLowerCase() === filter.toLowerCase();
        return (
          applyFilter &&
          (row.deposit_id
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1 ||
            row.customer.toString().toLowerCase().indexOf(query.toLowerCase()) >
              -1)
        );
      })
    );
  };

  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">Deposits are being fetched</h3>
        <CircularProgress className="fetch__data__spinner" />
      </div>
    );
  };

  const ErrorMessage = (message) => {
    return (
      <div className="error__div">
        <h3 className="error__title">{message}</h3>
      </div>
    );
  };

  if (deposits && deposits.getDeposits.fetching) {
    return (
      <UserSideBar active="Deposits">
        <div className="users__content__div">{requestSent()}</div>
      </UserSideBar>
    );
  }

  if (deposits && deposits.getDeposits.error.found) {
    return (
      <UserSideBar active="Deposits">
        <div className="users__content__div">
          {ErrorMessage(deposits.getDeposits.error.message)}
        </div>
      </UserSideBar>
    );
  }

  const deposit_table_head = [
    {
      id: "deposit_id",
      align: "left",
      disablePadding: true,
      alignData: "left",
      label: "Deposit ID",
    },
    {
      id: "customer_name",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Customer",
    },
    {
      id: "type",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Deposit Type",
    },
    {
      id: "date",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Date",
    },
    {
      id: "status",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Status",
    },
  ];
  const onRowsDelete = (values) => {
    alert(`These values were requested to be deleted ${values}`);
  };

  return (
    <UserSideBar active="Deposits">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <SearchBar query={query} setQuery={setQuery} />
        <div>
          <DropDown
            title="Status"
            value={filter}
            setValue={setFilter}
            variant="outlined"
            labelWidth={60}
            width="150px"
            data={[
              {
                title: "Deposit Request",
                value: "Deposit Request",
              },
              {
                title: "Document Submission",
                value: "Document Submission",
              },
              {
                title: "Rejected",
                value: "Rejected",
              },
              {
                title: "Payment Submission",
                value: "Payment Submission",
              },
              {
                title: "Processing",
                value: "Processing",
              },
              {
                title: "Deposited",
                value: "Deposited",
              },
              {
                title: "Cancelled",
                value: "Cancelled",
              },
            ]}
          />
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <CustomTable
          head={deposit_table_head}
          rows={search(data)}
          onDelete={onRowsDelete}
          showDetails={"/userDashboard/userDepositDetails"}
        />
      </div>
    </UserSideBar>
  );
};

export default UserDeposits;
