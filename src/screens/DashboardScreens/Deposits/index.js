import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import globalColors from "../../../../styles/globalColors";
import { deleteDeposit, getDeposits } from "../../../actions";
import Loading from "../../../components/Loading";
import { depositFilters } from "../../../helpers/filters";

const Deposits = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const deposits = useSelector((state) => state.deposit.getDeposits);
  const [data, setData] = useState([
    {
      deposit_id: 65465465465432198,
      customer: "Noor Muhammad",
      date: "19/12/2021",
      status: "Document Submission",
    },
  ]);
  const [filter, setFilter] = useState("");

  const handleDeleteDeposit = (id) => {
    Alert.alert(
      "Delete Deposit",
      `Do you want to delete this deposit record?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(deleteDeposit({ depositsToDelete: [id] })),
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
      dispatch(getDeposits());
    }
  }, [props, isFocused]);

  useEffect(() => {
    setData(
      deposits.deposits.map((row) => {
        return {
          ...row,
        };
      })
    );
  }, [deposits]);

  const search = (data) => {
    return data.filter((row) => {
      const applyFilter =
        filter === "" || row.status.toLowerCase() === filter.toLowerCase();
      return applyFilter;
    });
  };
  return deposits.fetching ? (
    <Loading>Loading deposits. Please wait...</Loading>
  ) : (
    <View style={styles.contianer}>
      <View style={{ flexBasis: "11%" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
        >
          {depositFilters.map((fil) => (
            <TouchableOpacity
              onPress={() => setFilter(fil.value)}
              style={
                filter === fil.value ? styles.activeFilterTag : styles.filterTag
              }
              key={fil.value}
            >
              <Text
                style={
                  filter === fil.value
                    ? styles.activeFilterTagText
                    : styles.filterTagText
                }
              >
                {fil.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ flexBasis: "89%" }}>
        <FlatList
          data={search(data)}
          keyExtractor={(item) => item.deposit_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Deposit Details", {
                  id: item.deposit_id,
                })
              }
              onLongPress={() => handleDeleteDeposit(item.deposit_id)}
              key={item.deposit_id}
              style={styles.Card}
            >
              <View style={styles.CardRow1}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.OrderStatus}
                >
                  {item.status}
                </Text>
                <Text
                  ellipsizeMode={"tail"}
                  numberOfLines={1}
                  style={styles.OrderId}
                >
                  id: {item.deposit_id}
                </Text>
              </View>
              <View style={styles.CardRow2}>
                <View style={styles.OrderCustomerContainer}>
                  <Text style={styles.OrderCustomerTitle}>Customer</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.OrderCustomerValue}
                  >
                    {item.customer}
                  </Text>
                </View>
                <View style={styles.OrderDateContainer}>
                  <Text style={styles.OrderDateTitle}>Dated</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.OrderDateValue}
                  >
                    {item.date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Deposits;
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: "white",
  },
  filterScrollView: {
    flex: 1,
  },
  filterTag: {
    backgroundColor: globalColors.TEXT_COLOR,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 13,
  },
  filterTagText: {
    color: globalColors.GRAY,
    fontSize: 18,
  },
  activeFilterTag: {
    backgroundColor: globalColors.PRIMARY_COLOR,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 13,
  },
  activeFilterTagText: {
    color: globalColors.TEXT_COLOR,
    fontSize: 18,
  },
  Card: {
    borderWidth: 1,
    borderColor: globalColors.GRAY,
    borderRadius: 12,
    height: 120,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  CardRow1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "25%",
  },
  OrderStatus: {
    fontSize: 20,
    flex: 3,
    maxWidth: 200,
  },
  OrderId: {
    maxWidth: 85,
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    fontSize: 12,
    color: globalColors.GRAY,
    paddingTop: 5,
  },
  CardRow2: { flexDirection: "row", paddingBottom: 6 },
  OrderCustomerContainer: {
    flex: 1,
    height: 50,
    borderRightWidth: 1,
    borderRightColor: globalColors.GRAY,
  },
  OrderCustomerTitle: { color: globalColors.GRAY },
  OrderCustomerValue: { fontSize: 16 },
  OrderDateContainer: {
    flex: 1,
    marginLeft: 15,
    height: 50,
  },
  OrderDateTitle: { color: globalColors.GRAY },
  OrderDateValue: { fontSize: 16 },
});
