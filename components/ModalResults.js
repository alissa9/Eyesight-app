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
import { Picker } from "@react-native-picker/picker";

const ModalResults = ({ showModal, objectLables }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedLang, setselectedLang] = useState({
    identifier: "com.apple.ttsbundle.siri_Martha_en-GB_compact",
    language: "en-GB",
    name: "Martha",
    quality: "Default",
  });

  const [country, setCountry] = useState("");
  // Gets a list of all the available languages and voices
  useEffect(() => {
    if (objectLables){
     textToSpeech(selectedLang);
    }
    
    (async () => {
      const allVoices = await Speech.getAvailableVoicesAsync();
      setVoices(allVoices);
      // console.log(allVoices);
    })();
  
  }, [objectLables]);

  // Function to read the results from the Google Vision API
  const textToSpeech = (voice) => {
    const text = objectLables.map((label) => label.description).join("  ");
    const tts = `${text}`;
    const options = {
      voice: voice.identifier,
      pitch: 1,
      rate: 0.7,
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
          <View style={tw("bg-blue-200 rounded-2xl items-center mb-24 p-8 ")}>
            <View style={tw("flex flex-row flex-wrap mb-12")}>
              <Picker
                itemSyle={{
                  fontSize: 10,
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                style={{ width: 300 }}
                selectedValue={country}
                onValueChange={(val, index) => {
                  setCountry(val);
                  textToSpeech(val);
                }}
                mode="dropdown"
              >
                <Picker.Item label="select your Language" value="Unknown" />

                {voices.map((voice) => (
                  <Picker.Item label={voice.language} value={voice} />
                ))}
              </Picker>
            </View>
            {objectLables &&
              objectLables.map((label, index) => (
                <Text style={tw("font-extrabold  text-xl mt-3  ")} key={index}>
                  {label.description}
                </Text>
              ))}
            <Pressable
              style={tw("rounded-xl  bg-gray-400 mt-24 p-5  ")}
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
