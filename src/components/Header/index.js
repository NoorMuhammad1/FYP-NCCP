import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch } from "react-redux";
import globalColors from "../../../styles/globalColors";
import { authConstants } from "../../actions/constants";
import Toast from "../../helpers/Toast";
// import { useDispatch } from "react-redux";

const Header = ({ title, navigation }) => {
  const dispatch = useDispatch();
  const [value, SetValue] = useState("java");
  const [modalVisible, setModalVisible] = useState(false);
  const onValueChange = (itemValue) => {
    alert(itemValue);
  };

  const SettingsModal = () => {
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
            <TouchableOpacity
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
                setModalVisible(false);
                dispatch({ type: authConstants.LOGOUT });
              }}
            >
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <View style={styles.headerContainer}>
      <Toast />
      <View style={styles.headerInnerContainer}>
        <Text style={styles.headerTitle}>NCCP</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Entypo
            name={"dots-three-vertical"}
            size={18}
            style={styles.headerOptionsIcon}
          />
        </TouchableOpacity>
        {SettingsModal()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: globalColors.SECONDARY_COLOR,
    paddingTop: 3,
    paddingBottom: 3,
    height: 110,
  },
  headerInnerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: globalColors.HEADER_TEXT_COLOR,
  },
  headerOptionsIcon: {
    alignSelf: "flex-end",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    alignItems: "flex-end",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
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

export default Header;
