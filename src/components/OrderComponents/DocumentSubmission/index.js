import React, { useState } from "react";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import globalColors from "../../../../styles/globalColors";
import FormButton from "../../UI/FormButton";
import Dialog from "react-native-dialog";

const DocumentTab = ({ doc, onApprove, onReject }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [showDialogue, setShowDiaglogue] = useState(false);
  const [showDescriptionDialogue, setDescriptionDialogue] = useState(false);
  const cancelDialogue = () => {
    setShowDiaglogue(false);
    setDescriptionDialogue(false);
  };
  const confirmDissapprove = () => {
    setShowDiaglogue(false);
    onReject(doc._id, description);
  };
  const disapprove = () => {
    setShowDiaglogue(false);
    setDescriptionDialogue(true);
  };
  const confirmApprove = () => {
    setShowDiaglogue(false);
    onApprove(doc._id);
  };

  const descriptionDialoge = () => {
    return (
      <View>
        <Dialog.Container visible={showDescriptionDialogue}>
          <Dialog.Title>Reject Description</Dialog.Title>
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

  const dialogue = () => {
    return (
      <View>
        <Dialog.Container visible={showDialogue}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            What do you want to do with this document
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={cancelDialogue} />
          <Dialog.Button label="Reject" onPress={disapprove} />
          <Dialog.Button label="Approve" onPress={confirmApprove} />
        </Dialog.Container>
      </View>
    );
  };
  return (
    <View
      style={{
        flexBasis: "45%",
        backgroundColor: "#F5F7FA",
        elevation: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: 160,
        borderRadius: 10,
      }}
    >
      {doc.approved.toLowerCase() == "awaiting submission" && (
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            right: 5,
            top: 10,
          }}
          onPress={() => setShowDiaglogue(true)}
        >
          {dialogue()}
          {descriptionDialoge()}
          <SimpleLineIcons name="options-vertical" size={15} />
        </TouchableOpacity>
      )}
      <MaterialCommunityIcons name="file-document-outline" size={35} />
      <Text
        style={{
          fontWeight: "bold",
          textAlign: "center",
        }}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {doc.title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color:
            doc.approved.toLowerCase() == "rejected"
              ? "red"
              : doc.approved.toLowerCase() == "approved"
              ? "green"
              : globalColors.GRAY,
          marginTop: -15,
        }}
      >
        {doc.approved}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: globalColors.PRIMARY_COLOR,
          opacity: 1,
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 100,
        }}
        onPress={() => Linking.openURL(doc.document)}
      >
        <Text style={{ color: "white" }}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const OrderDocumentSubmission = (props) => {
  const { submitted_documents } = props.data;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {submitted_documents.map((doc, index) => (
          <DocumentTab
            doc={doc}
            key={index}
            onApprove={props.onApprove}
            onReject={props.onReject}
          />
        ))}
      </View>
    </View>
  );
};

export default OrderDocumentSubmission;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "flex-end",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    minWidth: 150,
    elevation: 2,
  },
  modalOption: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  modalOptionText: {
    fontSize: 16,
  },
});
