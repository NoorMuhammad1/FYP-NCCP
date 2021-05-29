import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import globalColors from "../../../../styles/globalColors";
import FormButton from "../../../components/UI/FormButton";
import FormInput from "../../../components/UI/FormInput";
import AddUserValidator from "./addUserValidator";
import Step from "./Step";
import useFormAddUser from "./useFormAddUser";
import Wizard from "./Wizard";
import { CheckBox, ListItem, Body } from "native-base";
import { PermissionData } from "../../../helpers/permissions";
// import ImagePicker from "react-native-image-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { getCameraPermission } from "../../../helpers/userPermission";
// import * as ImagePicker from "expo-image-picker";
import { addUser } from "../../../actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { authConstants } from "../../../actions/constants";
// import { launchImageLibraryAsync } from "expo-image-picker";
// import RNFetchBlob from "rn-fetch-blob";
const AddUser = (props) => {
  const add_user = useSelector((state) => state.user.add_user);
  const dispatch = useDispatch();
  const _onSubmit = () => {
    var form = new FormData();
    Object.keys(addUserValue).map((item) => {
      if (item !== "preview_Image") {
        if (item == "profile_picture") {
          const uri =
            Platform.OS === "android"
              ? addUserValue[item].uri
              : addUserValue[item].uri.replace("file://", "");
          const splitted_uri = uri.split("/");
          const name = splitted_uri[splitted_uri.length - 1];
          const type = mime.getType(addUserValue[item].uri);
          form.append("profile_picture", {
            name,
            type,
            uri,
          });
        } else if (item == "permissions") {
          form.append(item, JSON.stringify(addUserValue[item]));
        } else {
          form.append(item, addUserValue[item]);
        }
      }
    });
    dispatch(addUser(form));
  };

  const { addUserValue, handleAddUserSubmit, updateAddUser, addUserErrors } =
    useFormAddUser(_onSubmit, AddUserValidator);
  const _nextStep = () => {};
  const forms = [
    {
      placeholder: "Username here...",
      name: "username",
    },
    {
      placeholder: "Email here...",
      name: "email",
    },
    {
      placeholder: "Avatar here...",
      name: "avatar",
    },
  ];

  useEffect(() => {
    if (add_user.added) {
      dispatch({
        type: authConstants.USER_ADD_REQUEST,
        payload: { data: {} },
      });
      props.navigation.navigate("Users");
    }
  }, [add_user]);
  return (
    <ScrollView style={styles.root}>
      <View
        style={{
          flex: 1,
          backgroundColor: globalColors.TEXT_COLOR,
          alignItems: "center",
          padding: 20,
          paddingTop: 50,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: globalColors.GRAY,
            width: 90,
            height: 90,
            borderRadius: 100,
            marginBottom: 30,
          }}
          onPress={async () => {
            try {
              getCameraPermission();
              const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
              });
              console.log(data);
              if (!data.cancelled) {
                updateAddUser("profilePicture", data, "file");
              }
            } catch (error) {
              console.log("error in the onPress event: ", error);
            }
          }}
        >
          <Image
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: 100,
            }}
            source={{ uri: addUserValue.preview_Image }}
          />
          <Entypo
            name="camera"
            style={{
              position: "absolute",
              top: 30,
              left: 30,
            }}
            size={30}
            color={globalColors.TEXT_COLOR}
          />
        </TouchableOpacity>
        <FormInput
          labelValue={addUserValue.firstname}
          onChangeText={(value) => updateAddUser("firstname", value, "text")}
          placeholderText="Firstname"
          errorMessage={addUserErrors.firstname}
        />
        <FormInput
          labelValue={addUserValue.lastname}
          onChangeText={(value) => updateAddUser("lastname", value, "text")}
          placeholderText="Lastname"
          errorMessage={addUserErrors.lastname}
        />

        <FormInput
          labelValue={addUserValue.email}
          onChangeText={(value) => updateAddUser("email", value, "text")}
          placeholderText="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={addUserErrors.email}
        />
        <FormInput
          labelValue={addUserValue.password}
          onChangeText={(value) => updateAddUser("password", value, "text")}
          placeholderText="Password"
          secureTextEntry={true}
          errorMessage={addUserErrors.password}
        />
        <FormInput
          labelValue={addUserValue.confirm_password}
          onChangeText={(value) =>
            updateAddUser("confirm_password", value, "text")
          }
          placeholderText="Confirm Password"
          secureTextEntry={true}
          errorMessage={addUserErrors.confirm_password}
        />
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 18 }}>Permissions</Text>
          <View style={{ marginTop: 10 }}>
            {PermissionData.map((perm, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginVertical: 5,
                }}
                key={index}
              >
                <CheckBox
                  checked={addUserValue.permissions[perm.name]}
                  onPress={(e) =>
                    updateAddUser(
                      perm.name,
                      !addUserValue.permissions[perm.name],
                      "checkbox"
                    )
                  }
                  style={{
                    marginLeft: -10,
                    marginRight: 20,
                    borderRadius: 5,
                  }}
                />
                <Text>{perm.title}</Text>
              </View>
            ))}
          </View>
        </View>
        <FormButton
          buttonTitle="Add User"
          // onPress={() => navigation.navigate("Dashboard")}
          onPress={handleAddUserSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  root: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
