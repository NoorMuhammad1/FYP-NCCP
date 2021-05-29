import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import DropDown from "../../components/DropDown";
import SideBar from "../../components/SideBar";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { confirmPayment } from "actions/payment.actions";
import StripeCheckout from "react-stripe-checkout";
import { Close, FavoriteOutlined } from "@material-ui/icons";
import SearchBar from "components/SearchBar";
import CustomTable from "components/CustomTable";
import { useEffect } from "react";
import { deleteOrder, getOrders } from "actions";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("");

  const orders = useSelector((state) => state.order.getOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    setData(orders.orders || []);
  }, [orders]);

  const search = (data) => {
    return (
      data &&
      data.filter((row) => {
        const applyFilter =
          filter === "" || row.status.toLowerCase() === filter.toLowerCase();
        return (
          applyFilter &&
          (row.order_id.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1 ||
            row.customer.toString().toLowerCase().indexOf(query.toLowerCase()) >
              -1)
        );
      })
    );
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
        <h3 className="fetch__data__title">Orders is being fetched</h3>
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

  if (orders.fetching) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (orders.error.found) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">
          {ErrorMessage(orders.error.message)}
        </div>
      </SideBar>
    );
  }

  // Payment Component

  // const [paymentDetails, setPaymentDetails] = useState({
  //   order_id: "60643cdf5d049b0a48495594",
  //   items: [
  //     {
  //       _id: "60643cdf5d049b0a48495595",
  //       microorganism_id: "5fd2fb5b44712417441281e9",
  //       quantity: 3,
  //       sub_total: 600,
  //     },
  //   ],
  //   total: 600,
  // });

  // const payment = () => {
  //   return "acb";
  // };

  // const makePayment = (token) => {
  //   dispatch(
  //     confirmPayment({
  //       order_id: paymentDetails.order_id,
  //       token,
  //       products: paymentDetails.items,
  //     })
  //   );
  // };

  const order_table_head = [
    {
      id: "order_id",
      align: "left",
      disablePadding: true,
      alignData: "left",
      label: "Order ID",
    },
    {
      id: "customer_name",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Customer",
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
    dispatch(deleteOrder({ ordersToDelete: values }));
  };

  return (
    <SideBar active="Orders">
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
                title: "Order Request",
                value: "Order Request",
              },
              {
                title: "Document Processing",
                value: "Document Processing",
              },
              {
                title: "Rejected",
                value: "Rejected",
              },
              {
                title: "Payment",
                value: "Payment",
              },
              {
                title: "Processing",
                value: "Processing",
              },
              {
                title: "Dispatched",
                value: "Dispatched",
              },
              {
                title: "Delivered",
                value: "Delivered",
              },
            ]}
          />
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <CustomTable
          head={order_table_head}
          rows={sortData(search(data))}
          onDelete={onRowsDelete}
          type="Orders"
          showDetails={"/adminDashboard/userOrderDetails"}
        />
      </div>

      {/* <div className="div__two">
        <h3>Orders</h3>
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
      </StripeCheckout> */}
    </SideBar>
  );
};

export default AdminDashboardOrders;
