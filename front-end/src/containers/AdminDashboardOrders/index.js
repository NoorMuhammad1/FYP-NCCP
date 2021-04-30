import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import { Button, CircularProgress, FormControl } from "@material-ui/core";
import OrderItemList from "../../components/OrderItemList";
import DropDown from "../../components/DropDown";
import StripeCheckout from "react-stripe-checkout";
import "./style.css";
import { useDispatch } from "react-redux";
import { confirmPayment } from "../../actions/payment.actions";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      order_id: "120191",
      created: "Aug 1,2019",
      customer: "Harriet Santigo",
      total: "$604.50",
      status: "Request",
    },
    {
      order_id: "121090",
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
        (row.order_id.toString().toLowerCase().indexOf(query.toLowerCase()) >
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
      title: "Order ID",
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

  // Payment Component

  const [paymentDetails, setPaymentDetails] = useState({
    order_id: "60643cdf5d049b0a48495594",
    items: [
      {
        _id: "60643cdf5d049b0a48495595",
        microorganism_id: "5fd2fb5b44712417441281e9",
        quantity: 3,
        sub_total: 600,
      },
    ],
    total: 600,
  });

  const payment = () => {
    return "acb";
  };

  const makePayment = (token) => {
    dispatch(
      confirmPayment({
        order_id: paymentDetails.order_id,
        token,
        products: paymentDetails.items,
      })
    );
  };

  return (
    <SideBar active="Orders">
      <div className="div__one">
        {/* <SearchBar query={query} setQuery={setQuery} /> */}
        {/* <Button variant="contained" color="primary">
          <Link
            to="/dashboard/addUser"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add User +
          </Link>
        </Button> */}
      </div>
      <div className="div__two">
        <h3>Orders</h3>
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
                title: "OrderID",
                value: "order_id",
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
        <OrderItemList columns={columns} rows={sortData(search(data))} />
      </div>
      <StripeCheckout
        stripeKey="pk_test_51IhcBtCueTz3N4RSq2lZieK9Wh8cD7XR2KlScdCDyfyuCcnjbj6RzGbaoxUtIOHxDAruTsgTTuFWKz1lcSj7YlO60066rgWObx"
        token={makePayment}
        amount={paymentDetails.total * 100}
      >
        <Button variant="contained" color="primary">
          Pay with Credit/Debit card
        </Button>
      </StripeCheckout>
    </SideBar>
  );
};

export default AdminDashboardOrders;
