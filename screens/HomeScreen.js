import React, { useLayoutEffect } from 'react';
import { useNavigation } from "@react-navigation/core"
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';


const HomeScreen = () => {

    const navigation = useNavigation();
    const { user, logout } = useAuth();



    return (
        <SafeAreaView>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={logout}>

                    <Image source={{ uri: user.photoURL }} style={tw("h-10 w-10 rounded-full")} />
                </TouchableOpacity>



                <TouchableOpacity>
                    <Image style={tw("h-16 w-16")} source={require("../assets/logo.png")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name='chatbubbles-sharp' size={30} color='#66c6ba' />
                </TouchableOpacity>
            </View>
            {/* End of Header */}

            {/* <Button title="Go to Chat Screen" onPress={() => navigation.navigate("Chat")} />

            <Button title="Logout" onPress={logout} /> */}
        </SafeAreaView>
    )
}

export default HomeScreen;
