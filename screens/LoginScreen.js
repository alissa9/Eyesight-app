import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={require("../assets/bgPic.jpg")}
      >
        <Text
          style={tw(
            "text-white absolute bottom-60 mb-2 text-3xl ml-8 p-4 mb-44"
          )}
        >
          Welcome To Eyesight
        </Text>
        <TouchableOpacity
          style={[
            tw("absolute bottom-80 w-52 bg-white p-5 rounded-3xl "),
            { marginHorizontal: "25%", marginVertical: "4%" },
          ]}
        >
          <Text style={tw("font-bold text-center")} onPress={signInWithGoogle}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw("absolute bottom-60 w-52 bg-white p-5 rounded-3xl"),
            { marginHorizontal: "25%", marginVertical: "4%" },
          ]}
        >
          <Text style={tw("font-bold text-center")} >
            Register
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
