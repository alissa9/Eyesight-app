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

  const [bio, setBio] = useState(null);
  const [age, setAge] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const incompleteForm = !bio || !age || !occupation;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      bio: bio,
      occupation: occupation,
      age: age,
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

      <Text style={tw("text-xl text-gray-700 p-2 font-bold")}>
        Name: {user.displayName}
      </Text>
      <Text style={tw("text-center text-gray-700 p-2 font-bold")}>
        Email: {user.email}
      </Text>

      <Text style={tw("text-center p-3 font-bold text-green-400")}>
        Biographical info
      </Text>

      <TextInput onChangeText={setBio} placeholder="Enter your info" />
      <Text style={tw("text-center p-3 font-bold text-green-400")}></Text>

      <Text style={tw("text-center p-3 font-bold text-green-400")}>
        Occupation
      </Text>
      <TextInput
        value={occupation}
        onChangeText={setOccupation}
        placeholder="Enter your Occupation"
      />
      <Text style={tw("text-center p-3 font-bold text-green-400")}></Text>

      <Text style={tw("text-center p-3 font-bold text-green-400")}>
        The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your Age"
        maxLength={2}
        keyboardType="numeric"
      />
      <Text style={tw("text-center p-4 font-bold text-green-400")}></Text>

      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded-xl  "),
          incompleteForm ? tw("bg-gray-400") : tw("bg-blue-400"),
        ]}
        onPress={updateUserProfile}
      >
        <Text style={tw("text-center text-white text-xl")}>
          {" "}
          Update Profile{" "}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw("w-64 p-3 rounded-xl bg-red-500 mt-12 ")}
        onPress={logout}
      >
        <Text style={tw("text-center text-white text-xl")}> Logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
