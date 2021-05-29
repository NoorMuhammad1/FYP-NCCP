import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../styles/global";
import globalColors from "../../../styles/globalColors";
import { UserImg, UserImgWrapper } from "../DashboardScreens/Users/UserStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
const Settings = (props) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <View style={globalStyles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: globalColors.GRAY,
          borderBottomWidth: 1,
        }}
      >
        <UserImgWrapper style={{ flexBasis: "20%" }}>
          <UserImg
            source={
              user.profilePicture != "NULL"
                ? { uri: `${user.profilePicture}` }
                : require("../../../assets/user.png")
            }
          />
        </UserImgWrapper>
        <Text
          style={globalStyles.titleText}
        >{`${user.firstname} ${user.lastname}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => props.navigation.navigate("Account")}
      >
        <MaterialCommunityIcons
          style={styles.optionIcon}
          name="account"
          size={30}
        />
        <View>
          <Text style={styles.optionText}>Account</Text>
          <Text style={styles.optionDescriptionText}>
            View and edit your account information
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => props.navigation.navigate("Share")}
      >
        <Ionicons style={styles.optionIcon} name="share-social" size={30} />
        <View>
          <Text style={styles.optionText}>Share</Text>
          <Text style={styles.optionDescriptionText}>
            Share your data with WDCM
          </Text>
        </View>
      </TouchableOpacity>
      <Text>{JSON.stringify(user.profilePicture)}</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  option: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    flexBasis: "15%",
  },
  optionText: {
    fontSize: 16,
  },
  optionDescriptionText: {
    fontSize: 12,
    color: globalColors.GRAY,
  },
});
