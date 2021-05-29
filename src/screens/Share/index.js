import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../../styles/global";
import globalColors from "../../../styles/globalColors";
import FormButton from "../../components/UI/FormButton";
import Dialog from "react-native-dialog";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { share } from "../../actions/other.actions";
import Toast from "../../helpers/Toast";
import Loading from "../../components/Loading";

const Share = (props) => {
  const [showDialogue, setShowDiaglogue] = useState(false);
  const dispatch = useDispatch();
  const shareData = useSelector((state) => state.other.shareData);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const cancelDialogue = () => {
    setShowDiaglogue(false);
  };

  const confirmShare = (values) => {
    setShowDiaglogue(false);
    dispatch(share(values));
  };
  const dialogue = () => {
    return (
      <View>
        <Dialog.Container visible={showDialogue}>
          <Dialog.Title>Share</Dialog.Title>
          <Dialog.Description>
            Enter your username and password below
          </Dialog.Description>
          <Formik initialValues={data} onSubmit={confirmShare}>
            {(formikProps) => (
              <>
                <Dialog.Input
                  label="Username"
                  value={formikProps.username}
                  onChangeText={formikProps.handleChange("username")}
                />
                <Dialog.Input
                  label="Password"
                  value={formikProps.password}
                  onChangeText={formikProps.handleChange("password")}
                />
                <Dialog.Button label="Cancel" onPress={cancelDialogue} />
                <Dialog.Button
                  label="Share"
                  onPress={formikProps.handleSubmit}
                />
              </>
            )}
          </Formik>
        </Dialog.Container>
      </View>
    );
  };
  return shareData.fetching ? (
    <Loading>Uploading document plz wait</Loading>
  ) : (
    <View style={globalStyles.scrollViewContainer}>
      {dialogue()}
      <Toast />
      <Text style={globalStyles.headerTitle}>Share</Text>
      <Text>
        You can share your current microorganism catalogue with WDCM (World Data
        Center for Microorganism) here.
      </Text>
      <Text>
        To proceed further press the following button and provide your username
        and password. The data will be shared and you will be notified on its
        success.
      </Text>
      <FormButton buttonTitle="Share" onPress={() => setShowDiaglogue(true)} />
    </View>
  );
};

export default Share;

const styles = StyleSheet.create({});
