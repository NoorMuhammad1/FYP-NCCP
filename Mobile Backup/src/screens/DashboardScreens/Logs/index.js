import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import globalColors from "../../../../styles/globalColors";
import { getLogs, deleteLogs } from "../../../actions/log.actions";
import { getPayments } from "../../../actions/payment.actions";
import Loading from "../../../components/Loading";

const Logs = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const logs = useSelector((state) => state.log.getLogs);
  const [data, setData] = useState([]);

  const handleDeleteLog = (id) => {
    Alert.alert(
      "Delete Log",
      `Do you want to delete this log entry?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(deleteLogs({ logsToDelete: [id] })),
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
      dispatch(getLogs());
    }
  }, [props, isFocused]);

  useEffect(() => {
    setData(logs.logs);
  }, [logs]);
  return logs.fetching ? (
    <Loading>Loading logs. Please wait...</Loading>
  ) : (
    <View style={{ width: "100%", backgroundColor: globalColors.TEXT_COLOR }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            onLongPress={() => handleDeleteLog(item._id)}
            style={{
              flex: 1,
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#cccccc",
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
          >
            {/* <View style={{ justifyContent: "center", marginRight: 10 }}>
              <UserImgWrapper>
                <UserImg
                  source={
                    item.profilePicture != "NULL"
                      ? { uri: `${item.profilePicture}` }
                      : require("../../../../assets/user.png")
                  }
                />
              </UserImgWrapper>
            </View> */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
                >
                  {item.username}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 12, marginRight: 10 }}>
                    {item.date}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{item.time}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
                >
                  {item.request}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: item.output == "success" ? "green" : "red",
                  }}
                >
                  {item.output}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Logs;

const styles = StyleSheet.create({});
