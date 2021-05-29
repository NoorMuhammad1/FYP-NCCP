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
import { deleteOrder, getOrders } from "../../../actions";
import Loading from "../../../components/Loading";
import { orderFilters } from "../../../helpers/filters";

const Orders = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const orders = useSelector((state) => state.order.getOrders);
  const [data, setData] = useState([
    {
      order_id: 65465465465432198,
      customer: "Noor Muhammad",
      date: "19/12/2021",
      status: "Document Submission",
    },
  ]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const handleDeleteOrder = (id) => {
    Alert.alert(
      "Delete Order",
      `Do you want to delete this order record?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => dispatch(deleteOrder({ ordersToDelete: [id] })),
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
      dispatch(getOrders());
    }
  }, [props, isFocused]);

  useEffect(() => {
    setData(
      orders.orders.map((row) => {
        return {
          ...row,
        };
      })
    );
  }, [orders]);

  const search = (data) => {
    return data.filter((row) => {
      const applyFilter =
        filter === "" || row.status.toLowerCase() === filter.toLowerCase();
      return applyFilter;
    });
  };
  return orders.fetching ? (
    <Loading>Loading orders. Please wait...</Loading>
  ) : (
    <View style={styles.contianer}>
      <View style={{ flexBasis: "11%" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
        >
          {orderFilters.map((fil) => (
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
          keyExtractor={(item) => item.order_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Order Details", {
                  id: item.order_id,
                })
              }
              onLongPress={() => handleDeleteOrder(item.order_id)}
              key={item.order_id}
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
                  id: {item.order_id}
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

export default Orders;

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
