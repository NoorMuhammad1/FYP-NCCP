import UserSideBar from "components/UserSidebar/UserSidebar";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  getOrderDetails,
  adminOrderReject,
  changeAdminOrderStatus,
  approveOrderDocument,
  rejectOrderDocument,
  submitOrderTrackingNumber,
  submitOrderFile,
  confirmPayment,
  confirmOrderDelivery,
} from "actions";
import Delivered from "components/UserOrderDetailsComponents/Delivered";
import OrderRequest from "components/UserOrderDetailsComponents/OrderRequest";
import Payment from "components/UserOrderDetailsComponents/Payment";
import Processing from "components/UserOrderDetailsComponents/Processing";
import Rejected from "components/UserOrderDetailsComponents/Rejected";
import DocumentSubmission from "components/UserOrderDetailsComponents/Document Submission";
import OrderDelivered from "components/OrderDelivered";
import OrderDetailsInformationList from "components/OrderDetailsInformationList";
import OrderDispatched from "components/OrderDispatched";
import OrderPayment from "components/OrderPayment";
import OrderRejectDescription from "components/OrderRejectDesciption";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboardOrderDetails = (props) => {
  const { id } = props.location.state;
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order.getOrderDetails);
  const order_made = useSelector((state) => state.order.getOrderDetails);
  const [data, setData] = useState({
    order_id: "120191",
    created: "01-08-2019",
    user_id: "1234",
    status: "Reject",
  });

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  useEffect(() => {
    // console.log("change in the order data");
    setData(order);
  }, [order]);

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

  if (order_made && order_made.fetching) {
    return (
      <UserSideBar active="Orders">
        <div className="users__content__div">{requestSent()}</div>
      </UserSideBar>
    );
  }

  if (order_made && order_made.error.found) {
    return (
      <UserSideBar active="Orders">
        <div className="users__content__div">
          {ErrorMessage(order_made.error.message)}
        </div>
      </UserSideBar>
    );
  }

  const handleRequestApproval = () => {
    alert("handling order approval");
    dispatch(changeAdminOrderStatus({ order_id: id }));
  };

  const handleRequestRejection = (description) => {
    dispatch(adminOrderReject({ order_id: id, description }));
  };

  // Document

  const handleDocumentApproval = (document_id) => {
    dispatch(approveOrderDocument({ order_id: id, document_id }));
  };

  const handleDocumentRejection = (document_id, description) => {
    // alert(`${document_id} , ${description}`);
    dispatch(rejectOrderDocument({ order_id: id, document_id, description }));
  };

  // Processing to Dispatch
  const handleSubmitTracking = (tracking_number) => {
    dispatch(submitOrderTrackingNumber({ order_id: id, tracking_number }));
  };

  //   Document Submission
  const onSubmit = (files, document_ids) => {
    const data = new FormData();
    data.append("order_id", id);
    data.append("document_id", document_ids[0]);
    data.append("files", files[0]);
    dispatch(submitOrderFile(data));
  };

  const processPayment = (token, address) => {
    dispatch(
      confirmPayment({
        order_id: id,
        token,
        products: data.items,
        address,
      })
    );
  };

  const onOrderDeliveryConfirm = () => {
    dispatch(confirmOrderDelivery({ order_id: id }));
  };
  const getComponent = () => {
    switch (data.status) {
      case "Order Request":
        return <OrderRequest message={data && data.message} />;
        break;
      case "Document Submission":
        return (
          <DocumentSubmission
            sampleDocuments={data.data.sample_documents}
            submittedDocuments={data.data.submitted_documents}
            onSubmit={onSubmit}
          />
        );
      case "Payment":
        // console.log(data.data);
        return <Payment data={data.data} onPayment={processPayment} />;
        break;
      case "Processing":
        return <Processing />;
      case "Dispatched":
        return (
          <OrderDispatched
            tracking={data.data.tracking}
            onConfirm={onOrderDeliveryConfirm}
          />
        );
      case "Delivered":
        return <Delivered />;
      case "Rejected":
        // console.log(data);
        return <Rejected description={data.data && data.data.description} />;

      case "Cancelled":
        break;

      default:
        break;
    }
  };

  return (
    <UserSideBar active="Orders">
      <Grid container spacing={2} style={{ marginTop: "2rem" }}>
        <Grid
          item
          lg={10}
          md={10}
          sm={10}
          xs={12}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h5" color="primary">
            {`Order ID:\t\t${data.order_id}`}
          </Typography>
          <Typography variant="p" color="textSecondary">
            {`Date Created:\t\t${data.date}`}
          </Typography>
          <Typography variant="p" color="textSecondary">
            {`Created by:\t\t${data.username}`}
          </Typography>
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={2}
          xs={12}
          style={{
            display: "flex",
            alignItems: "flex-start",
            padding: 0,
          }}
        ></Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card>
            <CardHeader
              title={`${data.status}`}
              titleTypographyProps={{ variant: "h6", color: "primary" }}
            />
            <CardContent>{getComponent()}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </UserSideBar>
  );
};

export default UserDashboardOrderDetails;

//   const UserOrderDetails = (props) => {
//     const { id } = props.location.state;
//     const dispatch = useDispatch();
//     const { order } = useSelector((state) => state.order.getOrderDetails);
//     const [data, setData] = useState({
//       order_id: "120191",
//       created: "01-08-2019",
//       user_id: "1234",
//       status: "Reject",
//     });

//     const [datastatus, setDatastatus] = useState({
//       status: "Your order is Rejected",
//       description: "The form is incomplete, some information is missing",
//     });

//     useEffect(() => {
//       dispatch(getOrderDetails(id));
//     }, []);

//     useEffect(() => {
//       setData(order);
//     }, [order]);

//     const styles = {};
//     // Order Request
//     const handleRequestApproval = () => {
//       alert("handling order approval");
//       dispatch(changeAdminOrderStatus({ order_id: id }));
//     };

//     const handleRequestRejection = (description) => {
//       dispatch(adminOrderReject({ order_id: id, description }));
//     };

//     // Document

//     const handleDocumentApproval = (document_id) => {
//       dispatch(approveOrderDocument({ order_id: id, document_id }));
//     };

//     const handleDocumentRejection = (document_id, description) => {
//       // alert(`${document_id} , ${description}`);
//       dispatch(rejectOrderDocument({ order_id: id, document_id, description }));
//     };

//     // Processing to Dispatch
//     const handleSubmitTracking = (tracking_number) => {
//       dispatch(submitOrderTrackingNumber({ order_id: id, tracking_number }));
//     };
//     const getComponent = () => {
//       switch (data.status) {
//         case "Order Request":
//           return (
//             <OrderRequest
//               description={data.data && data.description}
//               data={data.data && data.data.items}
//               id={id}
//               onApprove={handleRequestApproval}
//               onReject={handleRequestRejection}
//             />
//           );
//           break;
//         case "Document Submission":
//           return (
//             <DocumentSubmission
//               documents={data.data.submitted_documents}
//               onApprove={handleDocumentApproval}
//               onReject={handleDocumentRejection}
//             />
//           );
//         case "Payment":
//           return <Payment />;
//           break;
//         case "Processing":
//           return <Processing onSubmitTracking={handleSubmitTracking} />;
//         case "Dispatched":
//           return (
//             <OrderDispatched
//               tracking={data.data.tracking}
//               datastatus={datastatus}
//             />
//           );
//         case "Delivered":
//           return <Delivered />;
//         case "Rejected":
//           console.log(data);
//           return <Rejected description={data.data && data.data.description} />;

//         case "Cancelled":
//           break;

//         default:
//           break;
//       }
//     };

//     return (
//       <SideBar active="Orders">
//         <Grid container spacing={2} style={{ marginTop: "2rem" }}>
//           <Grid
//             item
//             lg={10}
//             md={10}
//             sm={10}
//             xs={12}
//             style={{ display: "flex", flexDirection: "column" }}
//           >
//             <Typography variant="h5" color="primary">
//               {`Order ID:\t\t${data.order_id}`}
//             </Typography>
//             <Typography variant="p" color="textSecondary">
//               {`Date Created:\t\t${data.date}`}
//             </Typography>
//             <Typography variant="p" color="textSecondary">
//               {`Created by:\t\t${data.username}`}
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             lg={2}
//             md={2}
//             sm={2}
//             xs={12}
//             style={{
//               display: "flex",
//               alignItems: "flex-start",
//               padding: 0,
//             }}
//           >
//             <Button color="primary">Remove</Button>
//           </Grid>
//           <Grid item lg={12} md={12} sm={12} xs={12}>
//             <Card>
//               <CardHeader
//                 title={`${data.status}`}
//                 titleTypographyProps={{ variant: "h6", color: "primary" }}
//               />
//               <CardContent>{getComponent()}</CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </SideBar>
//     );
//   };

//   export default UserOrderDetails;
