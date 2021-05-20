import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { globalStyles } from "../../../../styles/global";

const Main = (props) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Main</Text>
    </View>
  );
};

export default Main;
