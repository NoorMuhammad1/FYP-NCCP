import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { globalStyles } from "../../../../styles/global";

const Catalogue = (props) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Catalogue</Text>
    </View>
  );
};

export default Catalogue;
