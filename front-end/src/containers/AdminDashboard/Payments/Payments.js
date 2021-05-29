import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import DropDown from "../../../components/DropDown";
import SideBar from "../../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "components/SearchBar";
import CustomTable from "components/CustomTable";
import { useEffect } from "react";
import { deletePayment, getPayments } from "actions";
const Payments = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const payments = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  useEffect(() => {
    setData(
      payments.getPayments.payments.map((row) => {
        delete row.profilePicture;
        return row;
      })
    );
    // setData(payments.getPayments.payments || []);
  }, [payments]);

  const search = (data) => {
    return (
      data &&
      data.filter((row) => {
        const applyFilter =
          filter === "" || row.status.toLowerCase() === filter.toLowerCase();
        return (
          applyFilter &&
          (row.payment_id
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
        <h3 className="fetch__data__title">Payments being fetched</h3>
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

  if (payments.getPayments.fetching) {
    return (
      <SideBar active="Payments">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (payments.getPayments.error.found) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">
          {ErrorMessage(payments.getPayments.error.message)}
        </div>
      </SideBar>
    );
  }

  const payment_table_head = [
    {
      id: "payment_id",
      align: "left",
      disablePadding: true,
      alignData: "left",
      label: "Payment ID",
    },
    {
      id: "customer_name",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Customer",
    },
    {
      id: "payment_for",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Payment For",
    },
    {
      id: "order_deposit_id",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Order/Deposit ID",
    },
    {
      id: "amount",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Amount",
    },
    // {
    //   id: "status",
    //   align: "left",
    //   disablePadding: false,
    //   alignData: "left",
    //   label: "Status",
    // },
    {
      id: "date",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Date",
    },
  ];
  const onRowsDelete = (values) => {
    dispatch(deletePayment({ paymentsToDelete: values }));
  };

  return (
    <SideBar active="Payments">
      {console.log(data)}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <SearchBar query={query} setQuery={setQuery} />
        {/* <div>
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
        </div> */}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <CustomTable
          head={payment_table_head}
          rows={search(data)}
          type="Payments"
          onDelete={onRowsDelete}
          showDetails={"/adminDashboard/orderReport"}
        />
      </div>
    </SideBar>
  );
};

export default Payments;
