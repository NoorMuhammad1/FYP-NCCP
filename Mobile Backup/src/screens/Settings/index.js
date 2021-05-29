import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { globalStyles } from "../../../styles/global";

const Settings = (props) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Settings</Text>
    </View>
  );
};

export default Settings;
