import {
  Button,
  Card,
  CardContent,
  CardHeader,
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
  getDepositDetails,
  changeAdminDepositStatus,
  adminDepositReject,
  approveDepositDocument,
  rejectDepositDocument,
  confirmDepositDelivery,
  rejectDepositItems,
} from "actions";
import Delivered from "components/AdminDepositDetailsScreens/Deposited";
import DepositRequest from "components/AdminDepositDetailsScreens/DepositRequest";
import Payment from "components/AdminDepositDetailsScreens/Payment";
import Processing from "components/AdminDepositDetailsScreens/Processing";
import Rejected from "components/AdminDepositDetailsScreens/Rejected";
import DepositPayment from "components/DepositPayment";
import DocumentSubmission from "components/DocumentSubmission";
import OrderDelivered from "components/OrderDelivered";
import OrderDetailsInformationList from "components/OrderDetailsInformationList";
import OrderDispatched from "components/OrderDispatched";
import OrderPayment from "components/OrderPayment";
import OrderRejectDescription from "components/OrderRejectDesciption";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../../components/SideBar";
import AwaitingDispatch from "components/AdminDepositDetailsScreens/AwaitingDispatch";
import DepositDispatched from "components/AdminDepositDetailsScreens/Dispatched";
import Deposited from "components/AdminDepositDetailsScreens/Deposited";

const AdminDashboardUserDepositDetails = (props) => {
  const { id } = props.location.state;
  const dispatch = useDispatch();
  const deposit = useSelector((state) => state.deposit.depositDetails);
  const [data, setData] = useState({
    order_id: "120191",
    created: "01-08-2019",
    user_id: "1234",
    status: "Reject",
  });

  const [datastatus, setDatastatus] = useState({
    status: "Your order is Rejected",
    description: "The form is incomplete, some information is missing",
  });

  useEffect(() => {
    dispatch(getDepositDetails(id));
  }, []);

  useEffect(() => {
    setData(deposit.data);
  }, [deposit]);

  const styles = {};
  // Order Request
  const handleRequestApproval = () => {
    dispatch(changeAdminDepositStatus({ deposit_id: id }));
  };

  const handleRequestRejection = (description) => {
    dispatch(adminDepositReject({ deposit_id: id, description }));
  };

  // Document

  const handleDocumentApproval = (document_id) => {
    dispatch(approveDepositDocument({ deposit_id: id, document_id }));
  };

  const handleDocumentRejection = (document_id, description) => {
    // alert(`${document_id} , ${description}`);
    dispatch(
      rejectDepositDocument({ deposit_id: id, document_id, description })
    );
  };

  // Processing to Dispatch
  const handleSubmitTracking = (tracking_number) => {
    dispatch(submitOrderTrackingNumber({ order_id: id, tracking_number }));
  };

  const onDepositDeliveryConfirm = () => {
    dispatch(confirmDepositDelivery({ deposit_id: id }));
  };

  const handleDepositApprove = () => {
    dispatch(changeAdminDepositStatus({ deposit_id: id }));
  };
  const handleDepositReject = (description) => {
    dispatch(rejectDepositItems({ deposit_id: id, description }));
  };
  const getComponent = () => {
    switch (data.status) {
      case "Deposit Request":
        return (
          <DepositRequest
            data={data.data && data.data.items}
            onApprove={handleRequestApproval}
            onReject={handleRequestRejection}
          />
        );
        break;
      case "Document Submission":
        return (
          <DocumentSubmission
            documents={data.data.submitted_documents}
            onApprove={handleDocumentApproval}
            onReject={handleDocumentRejection}
          />
        );
      case "Payment":
        return <Payment />;
        break;
      case "Awaiting Dispatch":
        return <AwaitingDispatch />;
      case "Dispatched":
        return (
          <DepositDispatched
            tracking={data.data.tracking}
            onConfirm={onDepositDeliveryConfirm}
          />
        );
      case "Deposited":
        return <Deposited />;
      case "Rejected":
        console.log(data);
        return <Rejected description={data.data && data.data.description} />;
      case "Processing":
        return (
          <Processing
            onApprove={handleDepositApprove}
            onReject={handleDepositReject}
          />
        );
      case "Cancelled":
        break;

      default:
        break;
    }
  };

  return (
    <SideBar active="Orders">
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
            {`Order ID:\t\t${data.deposit_id}`}
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
        >
          <Button color="primary">Remove</Button>
        </Grid>
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
    </SideBar>
  );
};

export default AdminDashboardUserDepositDetails;
