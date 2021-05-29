import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FormButton from "../../UI/FormButton";

const DepositDispatched = (props) => {
  return (
    <View>
      <Text>
        This deposit has been dispatched with the tracking number of{" "}
        {props.data.tracking}. Awaiting its arrival to the customer
      </Text>
      <FormButton buttonTitle="Received" onPress={props.onRecieve} />
    </View>
  );
};

export default DepositDispatched;

const styles = StyleSheet.create({});
