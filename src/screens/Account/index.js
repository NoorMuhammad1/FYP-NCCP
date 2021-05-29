import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import mime from "mime";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../styles/global";
import Toast from "../../helpers/Toast";
import { Formik } from "formik";
import { getCameraPermission } from "../../helpers/userPermission";
import globalColors from "../../../styles/globalColors";
import * as ImagePicker from "expo-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import FormInput from "../../components/UI/FormInput";
import FormButton from "../../components/UI/FormButton";
import { CheckBox } from "native-base";
import { PermissionData } from "../../helpers/permissions";
import { updateUserInfo, updateUserProfilePicture } from "../../actions";

const Account = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState({});
  const updateUser = (values) => {
    const form = new FormData();
    if (values.profilePicture.search("cloudinary") === -1) {
      const splitted_uri = values.profilePicture.split("/");
      form.append("user_id", user._id);
      form.append("profilePicture", {
        uri:
          Platform.OS === "android"
            ? values.profilePicture
            : values.profilePicture.replace("file://", ""),
        name: splitted_uri[splitted_uri.length - 1],
        type: mime.getType(values.profilePicture),
      });
      dispatch(updateUserProfilePicture(form, user._id));
    }
    const data = { ...values };
    delete data.profilePicture;
    console.log(data);
    dispatch(updateUserInfo({ ...data, _id: user._id }, user._id));
  };
  useEffect(() => setData(user), [user]);
  return (
    <ScrollView style={globalStyles.scrollViewContainer}>
      <Toast />
      <Formik initialValues={user} onSubmit={updateUser}>
        {(formikProps) => (
          <>
            <View style={styles.profilePictureContainer}>
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
                    if (!data.cancelled) {
                      formikProps.setFieldValue("profilePicture", data.uri);
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
                  source={{ uri: formikProps.values.profilePicture }}
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
            </View>
            <View>
              <Text style={styles.subHeader}>Personal Informaiton</Text>
              <FormInput
                labelValue={formikProps.values.firstname}
                name="firstname"
                onChangeText={formikProps.handleChange("firstname")}
                placeholderText="Firstname"
                errorMessage={
                  formikProps.touched.firstname && formikProps.errors.firstname
                }
              />
              <FormInput
                labelValue={formikProps.values.lastname}
                onChangeText={formikProps.handleChange("lastname")}
                placeholderText="Lastname"
                errorMessage={
                  formikProps.touched.lastname && formikProps.errors.lastname
                }
              />
              <FormInput
                labelValue={formikProps.values.email}
                onChangeText={formikProps.handleChange("email")}
                placeholderText="Email"
                errorMessage={
                  formikProps.touched.email && formikProps.errors.email
                }
              />
              <FormInput
                labelValue={formikProps.values.role}
                onChangeText={formikProps.handleChange("role")}
                placeholderText="Role"
                errorMessage={
                  formikProps.touched.role && formikProps.errors.role
                }
              />
            </View>
            {/* <View style={{ marginTop: 10 }}>
              <Text style={styles.subHeader}>Permissions</Text>

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
                    checked={formikProps.values.permissions[perm.name]}
                    onPress={(e) =>
                      formikProps.setFieldValue(
                        `permissions.${perm.name}`,
                        !formikProps.values.permissions[perm.name]
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
            </View> */}
            <View style={{ marginBottom: 10 }}>
              <FormButton
                buttonTitle="Update"
                onPress={formikProps.handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
      <View>
        <Text style={{ color: globalColors.GRAY }}>
          The reset password option is only availalbe in the web version of NCCP
          Information System
        </Text>

        <Text style={{ color: globalColors.GRAY }}>{JSON.stringify(user)}</Text>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  profilePictureContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});
