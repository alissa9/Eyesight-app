import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import tw from "tailwind-rn";
const ModalResults = ({ showModal, objectLables }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // if (modalVisible) {
  //   return <></>;
  // }
  return (
    <View style={tw(" justify-center items-center ")}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("closed");
          Aert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw("flex-1 justify-center items-center ")}>
          <View style={tw(" bg-white rounded-md  items-center ")}>
            {objectLables &&
              objectLables.map((label, index) => (
                <Text style={tw("font-extrabold mt-2 ")} key={index}>
                  {label.description}
                </Text>
              ))}
            <Pressable
              style={tw("rounded-md p-6 bg-gray-200 mt-10 mb-10 ")}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={tw("text-blue-400 font-bold")}>Hide Results</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={tw("bg-white p-3 rounded-2xl ")}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tw("text-red-400 font-bold")}>Show Results</Text>
      </Pressable>
    </View>
  );
};

export default ModalResults;
