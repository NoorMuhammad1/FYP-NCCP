import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import DropDown from "../../components/DropDown";
import SideBar from "../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "components/SearchBar";
import CustomTable from "components/CustomTable";
import { useEffect } from "react";
import { getDeposits } from "actions";

const UserDepositsDashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  // const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("");

  const deposits = useSelector((state) => state.deposit);

  useEffect(() => {
    alert("calling for the data");
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

  // const sortData = (data) => {
  //   data[0] &&
  //     data.sort((a, b) => b[sortBy.toLowerCase()] - a[sortBy.toLowerCase()]);
  //   return data.sort(
  //     (a, b) => b[sortBy.toLowerCase() - a[sortBy.toLowerCase()]]
  //   );
  // };

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

  if (deposits.getDeposits.fetching) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (deposits.getDeposits.error.found) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">
          {ErrorMessage(deposits.getDeposits.error.message)}
        </div>
      </SideBar>
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
    <SideBar active="Deposits">
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

export default UserDepositsDashboard;

// import { CircularProgress } from "@material-ui/core";
// import DepositItemList from "components/DepositItemList";
// import DropDown from "components/DropDown";
// import SideBar from "components/SideBar";
// import React, { useState } from "react";

// const Deposits = () => {
//   const [data, setData] = useState([
//     {
//       deposit_id: "120191",
//       created: "Aug 1,2019",
//       customer: "Harriet Santigo",
//       total: "$604.50",
//       status: "Request",
//     },
//     {
//       deposit_id: "121090",
//       created: "Jul 21,2019",
//       customer: "Sara Graham",
//       total: "$524.25",
//       status: "Processing",
//     },
//   ]);
//   const [query, setQuery] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [filter, setFilter] = useState("");

//   const search = (data) => {
//     return data.filter((row) => {
//       const applyFilter =
//         filter === "" || row.status.toLowerCase() === filter.toLowerCase();
//       return (
//         applyFilter &&
//         (row.deposit_id.toString().toLowerCase().indexOf(query.toLowerCase()) >
//           -1 ||
//           row.customer.toString().toLowerCase().indexOf(query.toLowerCase()) >
//             -1)
//       );
//     });
//   };

//   const sortData = (data) => {
//     data[0] &&
//       data.sort((a, b) => b[sortBy.toLowerCase()] - a[sortBy.toLowerCase()]);
//     return data.sort(
//       (a, b) => b[sortBy.toLowerCase() - a[sortBy.toLowerCase()]]
//     );
//   };

//   const requestSent = () => {
//     return (
//       <div className="fetch__data__div">
//         <h3 className="fetch__data__title">Users info is being fetched</h3>
//         <CircularProgress className="fetch__data__spinner" />
//       </div>
//     );
//   };

//   const ErrorMessage = () => {
//     return (
//       <div className="error__div">
//         <h3 className="error__title">{"abc"}</h3>
//       </div>
//     );
//   };

//   const columns = [
//     {
//       title: "Deposit ID",
//       width: "10%",
//     },
//     {
//       title: "Created",
//       width: "20%",
//     },
//     {
//       title: "Customer",
//       width: "30%",
//     },
//     {
//       title: "Total",
//       width: "10%",
//     },
//     {
//       title: "Status",
//       width: "10%",
//     },
//     {
//       title: "",
//       width: "10%",
//     },
//   ];

//   return (
//     <SideBar active="Deposits">
//       <div className="div__one"></div>
//       <div className="div__two">
//         <h3>Deposits</h3>
//         <div>
//           <DropDown
//             title="Sort By"
//             value={sortBy}
//             setValue={setSortBy}
//             variant="outlined"
//             labelWidth={60}
//             width="150px"
//             data={[
//               {
//                 title: "Deposit ID",
//                 value: "deposit_id",
//               },
//               {
//                 title: "Customer Name",
//                 value: "customer_name",
//               },
//               {
//                 title: "Total",
//                 value: "total",
//               },
//             ]}
//           />
//           <DropDown
//             title="Status"
//             value={filter}
//             setValue={setFilter}
//             variant="outlined"
//             labelWidth={60}
//             width="150px"
//             data={[
//               {
//                 title: "Request",
//                 value: "request",
//               },
//               {
//                 title: "Processing",
//                 value: "processing",
//               },
//               {
//                 title: "Sent",
//                 value: "sent",
//               },
//               {
//                 title: "Approved",
//                 value: "approved",
//               },
//             ]}
//           />
//         </div>
//       </div>
//       <div className="div__three">
//         <DepositItemList columns={columns} rows={sortData(search(data))} />
//       </div>
//     </SideBar>
//   );
// };

// export default Deposits;
