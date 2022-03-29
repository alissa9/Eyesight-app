import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [name, setName] = useState("");

  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

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
      pitch: 1,
      rate: 0.7,
    };
    Speech.speak(tts, options);
  };

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={tw("flex-row mt-4")}>
          <Text style={tw(" text-lg mr-16  font-bold")}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
            style={tw(" text-xl mr-16")}
          ></Button>
        </View>
      );
    });
  }

  return (
    <SafeAreaView style={tw("flex-1 ")}>
      <ScrollView>
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
            style={tw("w-40  p-4 rounded-2xl bg-blue-400  mt-5 self-center")}
            onPress={textToSpeech}
          >
            <Text style={tw("text-center text-white text-xl")}> Speak </Text>
          </TouchableOpacity>

          <Text style={tw("mt-10 font-bold text-2xl  ")}>Recording</Text>
          <Text style={tw("text-lg font-bold")}>{message}</Text>
          <TouchableOpacity
            style={tw(
              "w-40 p-4 rounded-2xl bg-blue-400  self-center mb-4 justify-center"
            )}
            title={recording ? "Stop Recording" : "Start Recording"}
            onPress={recording ? stopRecording : startRecording}
          >
            <Text style={tw("text-white text-lg w-44  justify-center")}>
              {recording ? "Stop Recording" : "Start Recording"}
            </Text>
          </TouchableOpacity>

          {getRecordingLines()}
        </View>
        {/* End of Body */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
