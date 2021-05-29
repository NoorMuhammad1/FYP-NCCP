import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderRejected = (props) => {
  const { description } = props.data;
  return (
    <View>
      <Text style={{ fontSize: 18 }}>Rejection Reasons </Text>
      <Text style={{ marginVertical: 10 }}>{description}</Text>
    </View>
  );
};

export default OrderRejected;

const styles = StyleSheet.create({});
