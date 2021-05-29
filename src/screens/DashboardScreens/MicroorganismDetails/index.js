import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import globalColors from "../../../../styles/globalColors";
import { fetchMicroorganismData } from "../../../actions/catalogue.actions";
import Loading from "../../../components/Loading";
import { MicroorganismLabels } from "./MicroorganismLabels";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const MicroorganismDetails = (props) => {
  const id = props.route.params.microorganism_id;
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const micro = useSelector((state) => state.catalogue.fetchMicroorganism.data);
  const fetchMicroorganism = useSelector(
    (state) => state.catalogue.fetchMicroorganism
  );

  useEffect(() => {
    dispatch(fetchMicroorganismData({ id }));
  }, []);

  useEffect(() => {
    setData(fetchMicroorganism.data);
  }, [fetchMicroorganism]);
  return fetchMicroorganism.fetching ? (
    <Loading>Loading microorganism data. Please wait...</Loading>
  ) : (
    <ScrollView style={globalStyles.scrollViewContainer}>
      <View style={styles.header}>
        {data.CoreDataSets && (
          <View style={styles.headerContianer}>
            <View>
              <Text
                style={styles.headerTitle}
              >{`${data.CoreDataSets.Genus} ${data.CoreDataSets.SpeciesEpithet}`}</Text>
              <Text>{data.CoreDataSets.AccessionNumber}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("EditMicroorganism", { id, data })
              }
            >
              <FontAwesome5 name="edit" size={15} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {Object.keys(data).map((item, index) => (
        <View style={styles.subHeaderContainer} key={item}>
          <Text style={styles.subHeader}>{MicroorganismLabels[item]}</Text>
          {data[item] &&
            Object.keys(data[item]).map((element, i) => (
              <View style={styles.informationContainer} key={element}>
                <Text style={styles.informationTitle}>
                  {MicroorganismLabels[element]}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {data[item][element]}
                </Text>
              </View>
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default MicroorganismDetails;

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
    paddingBottom: 30,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
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
