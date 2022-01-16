import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import {
  AntDesign,
  Entypo,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={tw("flex-1 ")}>
      {/* Header */}
      <View style={tw("flex-row items-center justify-center px-4 ")}>
        <TouchableOpacity>
          <Image
            style={tw("h-20  bg-transparent")}
            resizeMode="contain"
            source={require("../assets/logo2.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        style={tw(
          "   rounded-xl bg-gray-100 flex-row items-center justify-between px-3 "
        )}
      >
        <Text style={tw(" font-bold italic ")}>
          Welcome {user.displayName} !
        </Text>
        <TouchableOpacity>
          <Image
            source={{ uri: user.photoURL }}
            style={tw("h-14 w-14 rounded-full mt-2")}
          />
        </TouchableOpacity>
      </View>
      {/* End of Header */}
      {/* Start of Body */}

      {/* End of Body */}

      {/* Start of Footer */}

      {/* End of Footer */}
    </SafeAreaView>
  );
};

export default HomeScreen;
