import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import { getUserData } from "../../../actions";
import Loading from "../../../components/Loading";
import { PermissionData } from "../../../helpers/permissions";
import { UserImg } from "../Users/UserStyles";

const UserDetails = (props) => {
  const id = props.route.params.id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user_data);
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(getUserData(id));
  }, []);

  useEffect(() => {
    if (user.fetched) {
      setData(user.data);
    }
  }, [user]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "User Details",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("EditUser", { id, data })}
          style={{ marginRight: 20 }}
        >
          <FontAwesome5 name="edit" size={20} />
        </TouchableOpacity>
      ),
    });
  }, [data, props.navigation]);
  return user.fetching ? (
    <Loading>Loading User Information. Please wait...</Loading>
  ) : (
    <ScrollView style={globalStyles.scrollViewContainer}>
      <View style={{ alignItems: "center", marginBottom: 25 }}>
        <Image
          source={
            data.profilePicture != "NULL"
              ? { uri: `${data.profilePicture}` }
              : require("../../../../assets/user.png")
          }
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>Personal Information</Text>
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Firstname</Text>
          <Text>{data.firstname}</Text>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Lastname</Text>
          <Text>{data.lastname}</Text>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Email</Text>
          <Text>{data.email}</Text>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.informationTitle}>Role</Text>
          <Text>{data.role}</Text>
        </View>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>Permissions</Text>
        {PermissionData.map((perm, index) => (
          <View style={styles.informationContainer} key={index}>
            <Text style={styles.informationTitle}>{perm.title}</Text>
            {data.permissions && (
              <Text>{data.permissions[perm.name] ? "True" : "False"}</Text>
            )}
          </View>
        ))}
      </View>
      {/* <Text>{JSON.stringify(data)}</Text> */}
    </ScrollView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
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
