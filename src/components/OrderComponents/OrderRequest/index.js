import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import FormButton from "../../UI/FormButton";

const OrderRequest = (props) => {
  const { data, onApprove, onReject } = props;
  const [showDialogue, setShowDiaglogue] = useState(false);
  const [description, setDescription] = useState("");

  const dialogue = () => {
    const cancelDialogue = () => {
      setShowDiaglogue(false);
    };
    const confirmDissapprove = () => {
      setShowDiaglogue(false);
      onReject(description);
    };
    return (
      <View>
        <Dialog.Container visible={showDialogue}>
          <Dialog.Title>Order Reject</Dialog.Title>
          <Dialog.Description>
            Enter the description for this rejection
          </Dialog.Description>
          <Dialog.Input
            label="Reason"
            value={description}
            onChangeText={setDescription}
          />
          <Dialog.Button label="Cancel" onPress={cancelDialogue} />
          <Dialog.Button label="Confirm" onPress={confirmDissapprove} />
        </Dialog.Container>
      </View>
    );
  };
  return (
    <View>
      {dialogue()}
      {data &&
        data.items.map((ele, index) => (
          <View style={{ marginVertical: 10 }} key={index}>
            <Text
              style={{ fontSize: 18 }}
            >{`${ele.genus} ${ele.speciesEpithet}`}</Text>
            <Text>Quantity {ele.quantity}</Text>
          </View>
        ))}
      <FormButton buttonTitle="Approve" onPress={onApprove} />
      <FormButton buttonTitle="Reject" onPress={() => setShowDiaglogue(true)} />
    </View>
  );
};

export default OrderRequest;

const styles = StyleSheet.create({});
