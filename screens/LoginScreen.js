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
        source={require("../assets/bgpic1.png")}
      >
        <Text style={tw("text-white absolute bottom-60 mb-6 text-xl ml-24")}>
          Welcome To Eyesight
        </Text>
        <TouchableOpacity
          style={[
            tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%", marginVertical: "6%" },
          ]}
        >
          <Text style={tw("font-bold text-center")} onPress={signInWithGoogle}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw("absolute bottom-20 w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%", marginVertical: "6%" },
          ]}
        >
          <Text style={tw("font-bold text-center")} onPress={signInWithGoogle}>
            Register
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
