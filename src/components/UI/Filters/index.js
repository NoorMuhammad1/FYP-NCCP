import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Filters = ({ items, setFilter }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const filterModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modal}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.title}
                style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false);
                  setFilter(item.value);
                }}
              >
                <Text style={styles.modalOptionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
            {/* <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Settings");
              }}
            >
              <Text style={styles.modalOptionText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                console.log("Logout");
                setModalVisible(false);
                dispatch({ type: authConstants.LOGOUT });
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.iconStyle}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="filter-outline" size={25} />
      </TouchableOpacity>
      {filterModal()}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
  },
  modalContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    marginTop: 136,
    marginRight: 10,
    minWidth: 150,
    elevation: 2,
  },
  modalOption: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  modalOptionText: {
    fontSize: 16,
  },
});
