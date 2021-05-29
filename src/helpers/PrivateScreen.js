import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const PrivateScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Screen
      {...rest}
      component={(props) => {
        console.log(props);
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateScreen;

const styles = StyleSheet.create({});
