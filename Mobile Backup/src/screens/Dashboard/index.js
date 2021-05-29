import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { globalStyles } from "../../../styles/global";

const Dashboard = (props) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
