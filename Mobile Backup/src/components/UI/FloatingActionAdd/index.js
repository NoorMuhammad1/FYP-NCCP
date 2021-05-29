import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { globalStyles } from "../../../../styles/global";
import globalColors from "../../../../styles/globalColors";

const FloatingActionAdd = ({ ...rest }) => {
  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        backgroundColor: globalColors.PRIMARY_COLOR,
        position: "absolute",
        bottom: 20,
        right: 20,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...rest}
    >
      <AntDesign name={"plus"} size={25} color={globalColors.TEXT_COLOR} />
    </TouchableOpacity>
  );
};

export default FloatingActionAdd;

const styles = StyleSheet.create({});
