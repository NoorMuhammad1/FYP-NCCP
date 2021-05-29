import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { globalStyles } from "../../../../styles/global";
import { windowHeight, windowWidth } from "../../Dimensions";

const SearchBar = ({ query, setQuery, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <EvilIcons name={"search"} size={25} color="#666" />
      </View>
      <TextInput
        value={query}
        onChangeText={(value) => setQuery(value)}
        style={styles.input}
        numberOfLines={1}
        placeholder={"Search Users"}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: "85%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    height: 100,
    // width: "100%",
    fontSize: 16,
    // fontFamily: "Lato-Regular",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
