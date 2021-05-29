import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderDispatched = (props) => {
  return (
    <View>
      <Text>
        This order has been dispatched with the tracking number of{" "}
        {props.data.tracking}. Awaiting its arrival to the customer
      </Text>
    </View>
  );
};

export default OrderDispatched;

const styles = StyleSheet.create({});
