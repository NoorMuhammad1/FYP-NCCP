import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import Loading from "../../../components/Loading";
import { useIsFocused } from "@react-navigation/native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  Card,
  Container,
  MessageText,
  PostTime,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from "./UserStyles";
import { getUsers, deleteUser } from "../../../actions/user.actions";
import SearchBar from "../../../components/UI/SearchBar";
import Filters from "../../../components/UI/Filters";
import { windowWidth } from "../../../components/Dimensions";
import { userFilter } from "../../../helpers/filters";
import FloatingActionAdd from "../../../components/UI/FloatingActionAdd";
// import AnimatedEllipsis from "react-native-animated-ellipsis";

const Users = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const users = useSelector((state) => state.user.users);
  const [data, setData] = useState([
    {
      user_id: 3,
      firstname: "Noor",
      lastname: "Muhammad",
      role: "External",
      email: "zainnoor6035020@gmail.com",
    },
  ]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const handleDeleteUser = (id) => {
    Alert.alert(
      "Delete User",
      `Do you want to delete this user record?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(deleteUser({ usersToDelete: [id] })),
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getUsers());
    }
  }, [props, isFocused]);

  useEffect(() => {
    setData(
      users.userList.map((row) => {
        return {
          ...row,
        };
      })
    );
  }, [users]);

  const search = (data) => {
    return data.filter((row) => {
      const applyFilter =
        filter === "" || row.role.toLowerCase() === filter.toLowerCase();
      return (
        applyFilter &&
        (row.firstname.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1 ||
          row.lastname.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1)
      );
    });
  };

  return users.fetching ? (
    <Loading>Loading users. Please wait...</Loading>
  ) : (
    <Container>
      <View style={globalStyles.searchAndFilterContainer}>
        <SearchBar query={query} setQuery={setQuery} />
        <Filters items={userFilter} setFilter={setFilter} />
      </View>
      <FlatList
        data={search(data)}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <Card
            key={item.user_id}
            onPress={() => {}}
            onLongPress={() => handleDeleteUser(item.user_id)}
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg
                  source={
                    item.profilePicture != "NULL"
                      ? { uri: `${item.profilePicture}` }
                      : require("../../../../assets/user.png")
                  }
                />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{`${item.firstname} ${item.lastname}`}</UserName>
                  <PostTime>{item.role}</PostTime>
                </UserInfoText>
                <MessageText>{item.email}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
      <FloatingActionAdd onPress={() => props.navigation.navigate("AddUser")} />
    </Container>
  );
};
export default Users;
