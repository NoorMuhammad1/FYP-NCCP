import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import globalColors from "../../../../styles/globalColors";
import { getPayments, deletePayment } from "../../../actions/payment.actions";
import Loading from "../../../components/Loading";
import { UserImg, UserImgWrapper } from "../Users/UserStyles";

const Payments = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const payments = useSelector((state) => state.payment.getPayments);
  const [data, setData] = useState([
    {
      payment_id: "lkdfgjdfklgjdklfgjdfklgjdfklgjdfl",
      customer: `Noor Muhammad`,
      payment_for: "Order",
      order_deposit_id: "dgdfg",
      profilePicture: "NULL",
      amount: 200,
      date: "19/12/21",
    },
  ]);

  const handleDeletePayment = (id) => {
    Alert.alert(
      "Delete Log",
      `Do you want to delete this payment record?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(deletePayment({ paymentsToDelete: [id] })),
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getPayments());
    }
  }, [props, isFocused]);

  useEffect(() => {
    setData(payments.payments);
  }, [payments]);
  return payments.fetching ? (
    <Loading>Loading payments. Please wait...</Loading>
  ) : (
    <View style={{ width: "100%", backgroundColor: globalColors.TEXT_COLOR }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.payment_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.payment_id}
            onPress={() =>
              props.navigation.navigate("Payment Details", {
                id: item.payment_id,
              })
            }
            onLongPress={() => handleDeletePayment(item.payment_id)}
            style={{
              flex: 1,
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#cccccc",
              paddingHorizontal: 20,
            }}
          >
            <View style={{ justifyContent: "center", marginRight: 10 }}>
              <UserImgWrapper>
                <UserImg
                  source={
                    item.profilePicture != "NULL"
                      ? { uri: `${item.profilePicture}` }
                      : require("../../../../assets/user.png")
                  }
                />
              </UserImgWrapper>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
                >
                  {item.customer}
                </Text>
                <Text style={{ fontSize: 12, color: globalColors.GRAY }}>
                  {item.date}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
                >
                  ${item.amount}
                </Text>
                <Text style={{ fontSize: 12, color: globalColors.GRAY }}>
                  {item.payment_for}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Payments;
