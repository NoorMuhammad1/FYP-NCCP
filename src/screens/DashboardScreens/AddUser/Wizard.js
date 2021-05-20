import { CommonActions } from "@react-navigation/routers";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import addUserValidator from "./addUserValidator";
import useFormAddUser from "./useFormAddUser";
const Wizard = (props) => {
  const [state, setState] = useState({
    index: 0,
  });
  const _nextStep = () => {
    console.log(Object.keys(addUserValidator(addUserValue)).length);
    if (Object.keys(addUserValidator(addUserValue)).length == 0) {
      if (state.index != props.children.length - 1) {
        setState((prevState) => ({
          ...prevState,
          index: prevState.index + 1,
        }));
      }
    }
  };

  const _prevStep = () => {
    if (state.index !== 0) {
      setState((prevState) => ({
        ...prevState,
        index: prevState.index - 1,
      }));
    }
  };

  // const _onChangeValue = (name, value) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     values: {
  //       ...prevState.values,
  //       [name]: value,
  //     },
  //   }));
  // };

  const _onSubmit = () => {
    Alert.alert(JSON.stringify(state.value));
  };

  const { addUserValue, handleAddUserSubmit, updateAddUser, addUserErrors } =
    useFormAddUser(_onSubmit, addUserValidator);
  return props.children.map((child, index) => {
    if (state.index === index) {
      return React.cloneElement(child, {
        currentIndex: state.index,
        isLast: state.index === props.children.length - 1,
        nextStep: _nextStep,
        prevStep: _prevStep,
        onChange: updateAddUser,
        values: addUserValue,
        errors: addUserErrors,
        onSubmit: handleAddUserSubmit,
      });
    }
  });
};

export default Wizard;

const styles = StyleSheet.create({});
