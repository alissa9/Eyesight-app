import React, { useLayoutEffect } from 'react';
import { useNavigation } from "@react-navigation/core"
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Entypo, Ionicons, Feather, FontAwesome } from "@expo/vector-icons"
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';




const HomeScreen = () => {

    const navigation = useNavigation();
    const { user, logout } = useAuth();



    return (
        <SafeAreaView style={tw('flex-1 ')}>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity>

                    <Image source={{ uri: user.photoURL }} style={tw("h-16 w-16 rounded-full mt-2")} />
                </TouchableOpacity>



                <TouchableOpacity>
                    <Image style={tw("h-20 w-20 bg-transparent")} source={require("../assets/logo.png")} />
                </TouchableOpacity>

               
            </View>

            <View style={tw("w-40  p-2 rounded-xl bg-gray-300 ml-2 mt-3")}>
                <Text style={tw(" font-bold italic")}>
                Welcome {user.displayName} !
            </Text>
            </View>
            {/* End of Header */}

            {/* Start of Body */}

            {/* End of Body */}
           
            {/* Start of Footer */}
            <View style={tw("flex-row items-center justify-between px-5 absolute inset-x-12 bottom-0 h-40 mb-2 ")}>
            
                <TouchableOpacity
                    style={tw(" bg-red-300  ")}
                    onPress={() => navigation.navigate("Profile")}>
                    <AntDesign name="profile" size={50} color="black" />
                </TouchableOpacity>

                 <TouchableOpacity style={tw("bg-red-300 ")}
                onPress={() => navigation.navigate("Camera")}
                >
               <Entypo name="camera" size={50}  />
                </TouchableOpacity>



            </View>

           {/* End of Footer */}

        </SafeAreaView >
    )
}

export default HomeScreen;
