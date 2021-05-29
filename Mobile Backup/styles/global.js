import { StyleSheet } from "react-native";
import { windowWidth } from "../src/components/Dimensions";
import globalColors from "./globalColors";
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 18,
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  inputErrorText: {
    fontSize: 12,
    alignSelf: "flex-start",
    marginTop: 0,
    color: globalColors.ERROR_COLOR,
  },
  searchAndFilterContainer: {
    width: windowWidth,
    zIndex: 1,
    flexDirection: "row",
  },
});
