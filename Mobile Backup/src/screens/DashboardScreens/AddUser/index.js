import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import globalColors from "../../../../styles/globalColors";
import FormButton from "../../../components/UI/FormButton";
import FormInput from "../../../components/UI/FormInput";
import AddUserValidator from "./addUserValidator";
import Step from "./Step";
import useFormAddUser from "./useFormAddUser";
import Wizard from "./Wizard";

const AddUser = (props) => {
  const _onSubmit = () => {
    Alert.alert("form submitted");
  };

  const { addUserValue, handleAddUserSubmit, updateAddUser, addUserErrors } =
    useFormAddUser(_onSubmit, AddUserValidator);
  const _nextStep = () => {};
  const forms = [
    {
      placeholder: "Username here...",
      name: "username",
    },
    {
      placeholder: "Email here...",
      name: "email",
    },
    {
      placeholder: "Avatar here...",
      name: "avatar",
    },
  ];
  return (
    <View style={styles.root}>
      <View
        style={{
          flex: 1,
          backgroundColor: globalColors.TEXT_COLOR,
          alignItems: "center",
          padding: 20,
          paddingTop: 50,
        }}
      >
        <FormInput
          labelValue={addUserValue.firstname}
          onChangeText={(value) => updateAddUser("firstname", value, "text")}
          placeholderText="Firstname"
          errorMessage={addUserErrors.firstname}
        />
        <FormInput
          labelValue={addUserValue.lastname}
          onChangeText={(value) => updateAddUser("lastname", value, "text")}
          placeholderText="Lastname"
          errorMessage={addUserErrors.lastname}
        />

        <FormInput
          labelValue={addUserValue.email}
          onChangeText={(value) => updateAddUser("email", value, "text")}
          placeholderText="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={addUserErrors.email}
        />
        <FormInput
          labelValue={addUserValue.password}
          onChangeText={(value) => updateAddUser("password", value, "text")}
          placeholderText="Password"
          secureTextEntry={true}
          errorMessage={addUserErrors.password}
        />
        <FormInput
          labelValue={addUserValue.confirm_password}
          onChangeText={(value) =>
            updateAddUser("confirm_password", value, "text")
          }
          placeholderText="Confirm Password"
          secureTextEntry={true}
          errorMessage={addUserErrors.confirm_password}
        />
        <View
          style={{
            flex: 1,
            width: "100%",
            borderColor: "#ccc",
            borderRadius: 3,
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Permissions</Text>
        </View>
        <FormButton
          buttonTitle="Add User"
          // onPress={() => navigation.navigate("Dashboard")}
          onPress={handleAddUserSubmit}
        />
      </View>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  root: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
