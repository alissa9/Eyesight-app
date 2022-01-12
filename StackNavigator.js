import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import CameraScreen from './screens/CameraScreen';
import useAuth from './hooks/useAuth'

const Stack = createNativeStackNavigator();
const StackNavigator = () => {

    const { user } = useAuth();
    return (


        <Stack.Navigator
            // hiding headers 
            screenOptions={{
                headerShown: false,
            }}

        >
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />

                    <Stack.Screen name="Camera" component={CameraScreen} />

                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>

    )
}

export default StackNavigator;


