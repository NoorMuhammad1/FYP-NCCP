import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../../../styles/global";
import StepIndicator from "react-native-step-indicator";
import globalColors from "../../../../styles/globalColors";
import Stepper from "react-native-stepper-ui";
import { windowWidth } from "../../../components/Dimensions";
import { useDispatch, useSelector } from "react-redux";
import {
  adminOrderReject,
  approveOrderDocument,
  changeAdminOrderStatus,
  getOrderDetails,
  getOrders,
  rejectOrderDocument,
  submitOrderTrackingNumber,
} from "../../../actions/order.actions";
import Loading from "../../../components/Loading";
import { customStyles, labels } from "./orderData";
import { Card } from "native-base";
import FormButton from "../../../components/UI/FormButton";
import prompt from "react-native-prompt-android";
import Dialog from "react-native-dialog";
import Toast from "../../../helpers/Toast";
import OrderRequest from "../../../components/OrderComponents/OrderRequest";
import OrderRejected from "../../../components/OrderComponents/Rejected";
import OrderDocumentSubmission from "../../../components/OrderComponents/DocumentSubmission";
import OrderPayment from "../../../components/OrderComponents/Payment";
import OrderProcessing from "../../../components/OrderComponents/Processing";
import OrderDispatched from "../../../components/OrderComponents/Dispatched";
import OrderDelivered from "../../../components/OrderComponents/Delivered";
const OrderDetails = (props) => {
  const { id } = props.route.params;
  const dispatch = useDispatch();
  const getOrders = useSelector((state) => state.order.getOrderDetails);
  const [data, setData] = useState({});
  const [step, setStep] = useState(4);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  useEffect(() => {
    if (getOrders.order) {
      setData(getOrders.order);
      setStep(checkStep(getOrders.order.status));
    }
  }, [getOrders.order]);

  const checkStep = (status) => {
    switch (status) {
      case "Order Request":
        return 0;
        break;
      case "Document Submission":
        return 1;
        break;
      case "Payment":
        return 2;
        break;
      case "Processing":
        return 3;
        break;
      case "Dispatched":
        return 4;
        break;
      case "Delivered":
        return 5;
        break;

      default:
        break;
    }
  };

  const handleOrderReject = (description) => {
    dispatch(adminOrderReject({ order_id: id, description }));
  };

  const handleOrderApprove = () => {
    dispatch(changeAdminOrderStatus({ order_id: id }));
  };

  // Document

  const handleDocumentApproval = (document_id) => {
    dispatch(approveOrderDocument({ order_id: id, document_id }));
  };

  const handleDocumentRejection = (document_id, description) => {
    // alert(`${document_id} , ${description}`);
    dispatch(rejectOrderDocument({ order_id: id, document_id, description }));
  };
  const handleSubmitTracking = (tracking_number) => {
    dispatch(submitOrderTrackingNumber({ order_id: id, tracking_number }));
  };
  const getComponent = (status, data) => {
    switch (status) {
      case "Order Request":
        return (
          <OrderRequest
            data={data}
            onReject={handleOrderReject}
            onApprove={handleOrderApprove}
          />
        );
        break;
      case "Document Submission":
        return (
          <OrderDocumentSubmission
            data={data}
            onApprove={handleDocumentApproval}
            onReject={handleDocumentRejection}
          />
        );
        break;
      case "Payment":
        return <OrderPayment />;
        break;
      case "Processing":
        return <OrderProcessing onApprove={handleSubmitTracking} />;
        break;
      case "Dispatched":
        return <OrderDispatched data={data} />;
        break;
      case "Delivered":
        return <OrderDelivered />;
        break;
      case "Rejected":
        return <OrderRejected data={data} />;
        break;

      default:
        break;
    }
  };

  return getOrders.fetching ? (
    <Loading>Loading details. Please wait...</Loading>
  ) : (
    <ScrollView style={globalStyles.scrollViewContainer}>
      <Toast />
      <View style={styles.headerContianer}>
        <Text style={styles.subHeader}>Order #{id.substr(0, 10)}...</Text>
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Username</Text>
          <Text>{data.username || ""}</Text>
        </View>
      </View>
      <View style={styles.headerContianer}>
        <Text style={styles.subHeader}>Order Status</Text>
        <View>
          <View style={{ marginHorizontal: -20, marginVertical: 10 }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={step}
              labels={labels}
              renderLabel={() => <></>}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{data.status || "Unknown"}</Text>
            <Text>{data.date || "Unknown"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.headerContianer}>
        <Text style={styles.subHeader}>Order Details</Text>
        {getComponent(data.status, data.data)}
        {/* <Text>{JSON.stringify(data.data)}</Text> */}
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  headerContianer: {
    justifyContent: "space-between",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.GRAY,
    paddingBottom: 15,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subHeaderContainer: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.GRAY,
    paddingBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  informationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  informationTitle: {
    flexBasis: "45%",
    fontWeight: "bold",
  },
});
