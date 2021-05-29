import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FormButton from "../../UI/FormButton";
import Dialog from "react-native-dialog";

const DepositProcessing = (props) => {
  const [showDialogue, setShowDiaglogue] = useState(false);
  const [description, setDescription] = useState("");
  const dialogue = () => {
    const cancelDialogue = () => {
      setShowDiaglogue(false);
    };
    const confirmDissapprove = () => {
      setShowDiaglogue(false);
      props.onReject(description);
    };

    return (
      <View>
        <Dialog.Container visible={showDialogue}>
          <Dialog.Title>Deposit Reject</Dialog.Title>
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
      <Text>
        The deposit is in the processing stage. You are required to complete all
        your tests and requirements and confirm/reject the deposit items below.
      </Text>
      <Text>
        In case of reject, a description has to be provided for this rejection.
        Upon this rejection the user will be notified and will be asked to
        submit the samples again
      </Text>
      <FormButton buttonTitle="Approve" onPress={props.onApprove} />
      <FormButton buttonTitle="Reject" onPress={() => setShowDiaglogue(true)} />
    </View>
  );
};

export default DepositProcessing;

const styles = StyleSheet.create({});
