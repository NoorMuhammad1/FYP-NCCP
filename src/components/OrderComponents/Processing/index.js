import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import globalColors from "../../../../styles/globalColors";

const OrderProcessing = (props) => {
  const [dialoge, setDialoge] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleDialogueClose = () => {
    setDialoge(false);
  };
  const handleDialogueConfirm = () => {
    setDialoge(false);
    props.onApprove(trackingNumber);
  };
  const dialogue = () => {
    return (
      <View>
        <Dialog.Container visible={dialoge}>
          <Dialog.Title>Tracking Number</Dialog.Title>
          <Dialog.Description>
            Add the tracking number of the order
          </Dialog.Description>
          <Dialog.Input
            label="Tracking Number"
            value={trackingNumber}
            onChangeText={setTrackingNumber}
          />
          <Dialog.Button label="Cancel" onPress={handleDialogueClose} />
          <Dialog.Button label="Confirm" onPress={handleDialogueConfirm} />
        </Dialog.Container>
      </View>
    );
  };
  return (
    <View>
      <Text>
        Order is in the processing phase. In order to move forward enter tehe
        tracking number
      </Text>
      {dialogue()}
      <TouchableOpacity onPress={() => setDialoge(true)}>
        <Text style={{ color: globalColors.PRIMARY_COLOR }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderProcessing;

const styles = StyleSheet.create({});
