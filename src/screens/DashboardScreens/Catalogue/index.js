import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import globalColors from "../../../../styles/globalColors";
import { windowWidth } from "../../../components/Dimensions";

import {
  deleteMicroorganism,
  getMicroorganisms,
} from "../../../actions/catalogue.actions";
// import { windowWidth } from "../../../components/Dimensions";
import Loading from "../../../components/Loading";
import Filters from "../../../components/UI/Filters";
import SearchBar from "../../../components/UI/SearchBar";
import { catalogueFilter } from "../../../helpers/filters";
import { useIsFocused } from "@react-navigation/core";
import FloatingActionAdd from "../../../components/UI/FloatingActionAdd";

const Catalogue = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [query, setQuery] = useState("");
  const catalogue = useSelector((state) => state.catalogue);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([
    {
      genus: "Bacillus",
      species_epithet: "Pakistanensis",
      organismType: "Bacteria",
      microorganism_id: "dmfdgklfjgdkljgkldf",
      status: "type",
      bio_hazard_level: 3,
    },
  ]);
  const search = (data) => {
    return data.filter((row) => {
      const applyFilter =
        filter === "" ||
        row.organism_type.toLowerCase() === filter.toLowerCase();
      return (
        applyFilter &&
        (row.genus.toString().toLowerCase().indexOf(query.toLowerCase()) > -1 ||
          row.species_epithet
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1)
      );
    });
  };

  const handleDeleteMicroorganism = (id) => {
    Alert.alert(
      "Delete Microorganism",
      `Do you want to delete this microorganism record?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            dispatch(deleteMicroorganism({ microorganismsToDelete: [id] })),
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
      dispatch(getMicroorganisms());
    }
  }, [props, isFocused]);

  useEffect(() => {
    setData(catalogue.getMicroorganisms.microorganisms);
  }, [catalogue]);

  const [date, setDate] = useState(new Date());
  return catalogue.getMicroorganisms.fetching ? (
    <Loading>Loading catalogue. Please wait...</Loading>
  ) : (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginHorizontal: 12,
          width: windowWidth,
          zIndex: 1,
          flexDirection: "row",
        }}
      >
        <SearchBar query={query} setQuery={setQuery} />
        <Filters items={catalogueFilter} setFilter={setFilter} />
      </View>
      <View style={{ flexBasis: "89%" }}>
        <FlatList
          data={search(data)}
          keyExtractor={(item) => item.microorganism_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("MicroorganismDetails", {
                  microorganism_id: item.microorganism_id,
                })
              }
              onLongPress={() =>
                handleDeleteMicroorganism(item.microorganism_id)
              }
              key={item.microorganism_id}
              style={styles.Card}
            >
              <View style={styles.CardRow1}>
                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.OrderStatus}
                  >
                    {`${item.genus} ${item.species_epithet}`}
                  </Text>
                  <Text>{item.organism_type}</Text>
                </View>
                <Text
                  ellipsizeMode={"tail"}
                  numberOfLines={1}
                  style={styles.OrderId}
                >
                  id: {item.microorganism_id}
                </Text>
              </View>
              <View style={styles.CardRow2}>
                <View style={styles.OrderCustomerContainer}>
                  <Text style={styles.OrderCustomerTitle}>
                    Bio Hazard Level
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.OrderCustomerValue}
                  >
                    {item.bio_hazard_level}
                  </Text>
                </View>
                <View style={styles.OrderDateContainer}>
                  <Text style={styles.OrderDateTitle}>
                    Status(Type/No-Type)
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.OrderDateValue}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <FloatingActionAdd
          onPress={() => props.navigation.navigate("AddMicroorganism")}
        />
      </View>
    </View>
  );
};

export default Catalogue;
const styles = StyleSheet.create({
  Card: {
    // borderWidth: 1,
    // borderColor: globalColors.GRAY,
    borderRadius: 6,
    elevation: 2,
    height: 120,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  CardRow1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50%",
    marginBottom: 7,
  },
  OrderStatus: {
    fontSize: 18,
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
