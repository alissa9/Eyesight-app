import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  // console.log(user);

  const [feedback, setFeedback] = useState(null);
  const incompleteForm = !feedback;

  const sendFeedback = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      feedback: feedback,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView style={tw("flex-1 items-center pt-2")}>
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={require("../assets/logo.png")}
      />

      <Text style={tw("text-2xl text-gray-700 p-2 font-bold")}>
        Name: {user.displayName}
      </Text>
      <Text style={tw("text-xl  text-center text-gray-700 p-6 font-bold")}>
        Email: {user.email}
      </Text>

      <Text style={tw("text-lg  text-center p-4 font-bold text-blue-400")}>
        Send Feedback
      </Text>
      <Text style={tw("text-base  text-center p-8 font-bold text-gray-400")}>
        Tell us what you love about the app, or what we could be doing better to
        imporve it
      </Text>

      <TextInput onChangeText={setFeedback} placeholder="Enter feedback" />
      <Text style={tw(" text-lg text-center p-3 font-bold")}></Text>

      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded-xl  "),
          incompleteForm ? tw("bg-gray-400") : tw("bg-blue-400"),
        ]}
        onPress={sendFeedback}
      >
        <Text style={tw("text-center text-white text-xl")}> Submit </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw("w-64 p-3 rounded-xl bg-red-500 mt-16 ")}
        onPress={logout}
      >
        <Text style={tw("text-center text-white text-xl")}> Logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
