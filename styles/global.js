import { StyleSheet } from "react-native";
import { windowWidth } from "../src/components/Dimensions";
import globalColors from "./globalColors";
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 40,
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

  headerContianer: {
    justifyContent: "space-between",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.GRAY,
    paddingBottom: 15,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subHeaderContainer: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.GRAY,
    paddingBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  informationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  informationTitle: {
    flexBasis: "45%",
    fontWeight: "bold",
  },
});
