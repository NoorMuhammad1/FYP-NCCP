import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import { getPaymentDetails } from "../../../actions/payment.actions";
const PaymentDetails = (props) => {
  const { id } = props.route.params;
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const getPayment = useSelector((state) => state.payment.getPaymentDetails);

  useEffect(() => {
    dispatch(getPaymentDetails({ payment_id: id }));
  }, []);
  useEffect(() => setData(getPayment.payment), [getPayment.payment]);
  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.headerContianer}>
        <Text style={globalStyles.headerTitle}>Payment Details</Text>
        <View style={globalStyles.informationContainer}>
          <Text style={globalStyles.informationTitle}>User</Text>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {data.username}
          </Text>
        </View>
        {/* <View style={globalStyles.informationContainer}>
          <Text style={globalStyles.informationTitle}>Address</Text>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {data.address}
          </Text>
        </View> */}
        <View style={globalStyles.informationContainer}>
          <Text style={globalStyles.informationTitle}>Email</Text>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {data.email}
          </Text>
        </View>
        <View
          style={[
            globalStyles.informationContainer,
            styles.dateAndTypeContainer,
          ]}
        >
          <View style={styles.dateOrTypeBox}>
            <Text style={globalStyles.informationTitle}>Date</Text>
            <Text>{data.date}</Text>
          </View>
          <View style={styles.dateOrTypeBox}>
            <Text style={globalStyles.informationTitle}>Amount</Text>
            <Text>{data.amount}</Text>
          </View>
          <View style={styles.dateOrTypeBox}>
            <Text style={globalStyles.informationTitle}>Payment for</Text>
            <Text>{data.payment_for}</Text>
          </View>
        </View>
        <View>
          <Text style={globalStyles.informationTitle}>Description</Text>
          <Text>{data.description}</Text>
        </View>
      </View>
      {data.card && (
        <View style={globalStyles.headerContianer}>
          <Text style={globalStyles.headerTitle}>Card Details</Text>
          <View style={globalStyles.informationContainer}>
            <Text style={globalStyles.informationTitle}>Brand</Text>
            <Text>{data.card.brand}</Text>
          </View>
          <View style={globalStyles.informationContainer}>
            <Text style={globalStyles.informationTitle}>Country</Text>
            <Text>{data.card.country}</Text>
          </View>
          <View style={globalStyles.informationContainer}>
            <Text style={globalStyles.informationTitle}>Expiry Month</Text>
            <Text>{data.card.exp_month}</Text>
          </View>
          <View style={globalStyles.informationContainer}>
            <Text style={globalStyles.informationTitle}>Expiry Year</Text>
            <Text>{data.card.exp_year}</Text>
          </View>
          <View style={globalStyles.informationContainer}>
            <Text style={globalStyles.informationTitle}>Funding</Text>
            <Text>{data.card.funding}</Text>
          </View>
        </View>
      )}
      {data.items && (
        <View style={globalStyles.headerContianer}>
          <Text style={globalStyles.headerTitle}>Items</Text>
          {data.items.map((item, index) => (
            <View style={{ marginVertical: 10 }} key={index}>
              <Text style={globalStyles.informationTitle}>
                {item.quantity} {item.microorganism_name}
              </Text>
              <Text>${item.sub_total}</Text>
            </View>
          ))}
          <View style={globalStyles.informationContainer}>
            <Text style={globalStyles.informationTitle}>Total</Text>
            <Text>{data.amount}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  dateAndTypeContainer: {
    flexDirection: "row",
  },
  dateOrTypeBox: {
    flexBasis: "30%",
  },
});
