import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import tw from "tailwind-rn";
import * as Speech from "expo-speech";
import { AntDesign } from "@expo/vector-icons";


const ModalResults = ({ showModal, objectLables }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedLang, setselectedLang] = useState({
    identifier: "com.apple.ttsbundle.siri_Martha_en-GB_compact",
    language: "en-GB",
    name: "Martha",
    quality: "Default",
  });

  // Gets a list of all the available languages and voices
  useEffect(() => {
    (async () => {
      const allVoices = await Speech.getAvailableVoicesAsync();
      setVoices(allVoices);
      // console.log(allVoices);
    })();
  }, []);

  // Function to read the results from the Google Vision API
  const textToSpeech = (voice) => {
    const text = objectLables.map((label) => label.description).join("  ");
    const tts = `${text}`;
    const options = {
      voice: voice.identifier,
      pitch: 1,
      rate: 1,
      language: voice.language,
    };
    Speech.speak(tts, options);
  };

  return (
    <View style={tw(" justify-center items-center ")}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("closed");
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw("flex-1 justify-center items-center  ")}>
          <View
            style={tw(
              " bg-blue-100 rounded-2xl items-center mb-24 p-8 bg-blue-200"
            )}
          >
            <View style={tw("flex flex-row flex-wrap ")}>
              {voices.map((voice) => (
                <TouchableOpacity
                  style={tw("m-3 ")}
                  onPress={() => textToSpeech(voice)}
                >
                  <Text> {voice.language}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {objectLables &&
              objectLables.map((label, index) => (
                <Text style={tw("font-extrabold  text-xl  ")} key={index}>
                  {label.description}
                </Text>
              ))}
            <Pressable
              style={tw("rounded-xl  bg-gray-400 mt-4 p-5  ")}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={tw("text-black font-bold")}>Hide Results</Text>
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
