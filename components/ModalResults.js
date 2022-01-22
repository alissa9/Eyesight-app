import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import tw from "tailwind-rn";

import { AntDesign } from "@expo/vector-icons";
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
          <View style={tw(" bg-blue-100 rounded-md items-center mb-24 p-8 ")}>
            {objectLables &&
              objectLables.map((label, index) => (
                <Text style={tw("font-extrabold  text-xl ")} key={index}>
                  {label.description}
                </Text>
              ))}
            <Pressable
              style={tw("rounded-md  bg-gray-300 p-4 mt-4  ")}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={tw("text-red-400 font-bold")}>Hide Results</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={tw("bg-blue-200 p-3 rounded-2xl items-center  ")}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="infocirlce" size={50} color="black" />
        <Text style={tw("text-black font-bold mt-2")}>Show Results</Text>
      </Pressable>
    </View>
  );
};

export default ModalResults;
