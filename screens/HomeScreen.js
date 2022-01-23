import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import * as Speech from "expo-speech";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [name, setName] = useState("");

  // getting the voices options then print them to console to choose
  const listAllVoice0ptions = async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    // console.log(voices);
  };
  useEffect(listAllVoice0ptions);

  // Text To Speech function which
  //  takes text input to speech
  const textToSpeech = () => {
    const tts = `${name}`;
    options = {
      voice: "com.apple.ttsbundle.siri_Arthur_en-GB_compact",
      pitch: 1.2,
      rate: 0.8,
    };
    Speech.speak(tts, options);
  };

  return (
    <SafeAreaView style={tw("flex-1 ")}>
      {/* Header */}
      <View style={tw("flex-row items-center justify-center px-4 ")}>
        <TouchableOpacity>
          <Image
            style={tw("h-20  bg-transparent")}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        style={tw(
          "rounded-xl bg-gray-100 flex-row items-center justify-between px-3 "
        )}
      >
        <Text style={tw(" font-bold italic  text-xl text-black ")}>
          Welcome {user.displayName} !
        </Text>
        <TouchableOpacity>
          <Image
            source={{ uri: user.photoURL }}
            style={tw("h-16 w-16 rounded-full ")}
          />
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      {/* Start of Body */}
      <View style={tw("m-10")}>
        <Text style={tw("mb-5 font-bold text-2xl ")}>Text To Speech</Text>
        <TextInput
          onChangeText={setName}
          value={name}
          style={tw("h-14 text-xl bg-gray-200 rounded-xl ")}
          placeholder=" Enter your Text"
        />
        <TouchableOpacity
          style={tw("w-40  p-5 rounded-2xl bg-blue-400  mt-5 self-center")}
          title="Speak it"
          onPress={textToSpeech}
        >
          <Text style={tw("text-center text-white text-xl")}> Speak it </Text>
        </TouchableOpacity>
      </View>
      {/* End of Body */}
    </SafeAreaView>
  );
};

export default HomeScreen;
