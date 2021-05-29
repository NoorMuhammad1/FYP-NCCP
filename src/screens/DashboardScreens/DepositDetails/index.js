import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DepositRequest from "../../../components/DepositComponents/DepositRequest";
import DepositDocumentSubmission from "../../../components/DepositComponents/DocumentSubmission";
import DepositDispatched from "../../../components/DepositComponents/Dispatched";
import DepositProcessing from "../../../components/DepositComponents/Processing";
import DepositPayment from "../../../components/DepositComponents/Payment";
import Deposited from "../../../components/DepositComponents/Deposited";
import Loading from "../../../components/Loading";
import Toast from "../../../helpers/Toast";
import { globalStyles } from "../../../../styles/global";
import {
  adminDepositReject,
  approveDepositDocument,
  changeAdminDepositStatus,
  confirmDepositDelivery,
  getDepositDetails,
  rejectDepositItems,
  rejectDepositDocument,
} from "../../../actions/deposits.actions";
import StepIndicator from "react-native-step-indicator";
import { depositLabels, customStyles } from "./depositData";
import AwaitingDispatch from "../../../components/DepositComponents/Awaiting Dispatch";
const DepositDetails = (props) => {
  const { id } = props.route.params;
  const dispatch = useDispatch();
  const getDeposit = useSelector((state) => state.deposit.depositDetails);
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    dispatch(getDepositDetails(id));
  }, []);
  useEffect(() => {
    setData(getDeposit.data);
    setStep(checkStep(getDeposit.data.status));
  }, [getDeposit.data]);

  const checkStep = (status) => {
    switch (status) {
      case "Deposit Request":
        return 0;
      case "Document Submission":
        return 1;
      case "Payment":
        return 2;
      case "Dispatched":
        return 3;
      case "Awaiting Dispatch":
        return 3;
      case "Processing":
        return 4;
      case "Deposited":
        return 5;
      default:
        return 0;
    }
  };

  const handleDepositReject = (description) => {
    dispatch(adminDepositReject({ deposit_id: id, description }));
  };
  const handleDepositApprove = () => {
    dispatch(changeAdminDepositStatus({ deposit_id: id }));
  };
  const handleDocumentApproval = (document_id) => {
    dispatch(approveDepositDocument({ deposit_id: id, document_id }));
  };

  const handleDocumentRejection = (document_id, description) => {
    dispatch(
      rejectDepositDocument({ deposit_id: id, document_id, description })
    );
  };

  const handleDeposittRecieved = () => {
    dispatch(confirmDepositDelivery({ deposit_id: id }));
  };
  const handleDepositApproved = () => {
    dispatch(changeAdminDepositStatus({ deposit_id: id }));
  };
  const handleDepositRejected = (description) => {
    dispatch(rejectDepositItems({ deposit_id: id, description }));
  };

  const getComponent = (status, data) => {
    switch (status) {
      case "Deposit Request":
        return (
          <DepositRequest
            data={data}
            onReject={handleDepositReject}
            onApprove={handleDepositApprove}
          />
        );
      case "Document Submission":
        return (
          <DepositDocumentSubmission
            data={data}
            onApprove={handleDocumentApproval}
            onReject={handleDocumentRejection}
          />
        );
      case "Payment":
        return <DepositPayment />;
      case "Dispatched":
        return (
          <DepositDispatched data={data} onRecieve={handleDeposittRecieved} />
        );
      case "Processing":
        return (
          <DepositProcessing
            onApprove={handleDepositApproved}
            onReject={handleDepositRejected}
          />
        );
      case "Deposited":
        return <Deposited />;
      case "Awaiting Dispatch":
        return <AwaitingDispatch />;
      default:
        console.log("returning null");
        return null;
    }
  };
  return getDeposit.fetching ? (
    <Loading>Loading details. Please wait...</Loading>
  ) : (
    <ScrollView style={globalStyles.scrollViewContainer}>
      <Toast />
      <View style={styles.headerContianer}>
        <Text style={styles.subHeader}>Deposit #{id.substr(0, 10)}...</Text>
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Username</Text>
          <Text>{data.username || ""}</Text>
        </View>
      </View>
      <View style={styles.headerContianer}>
        <Text style={styles.subHeader}>Deposit Status</Text>
        <View>
          <View style={{ marginHorizontal: -20, marginVertical: 10 }}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={step}
              labels={depositLabels}
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
        <Text style={styles.subHeader}>Deposit Details</Text>
        {getComponent(data.status, data.data)}
      </View>
      {/* <Text>{JSON.stringify(data.username)}</Text> */}
    </ScrollView>
  );
};

export default DepositDetails;

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
