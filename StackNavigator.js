import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CameraScreen from './screens/CameraScreen';
import ProfileScreen from './screens/ProfileScreen';

import useAuth from './hooks/useAuth'

const Stack = createNativeStackNavigator();
const StackNavigator = () => {

    const { user } = useAuth();
    return (


        <Stack.Navigator
            // hiding headers 
            screenOptions={{ headerShown: false, }}

        >
            {user ? (
                <>
                    <Stack.Screen name="Home"  component={HomeScreen} />

                    <Stack.Screen name="Camera" component={CameraScreen} />
                    <Stack.Group screenOptions={{ presentation:'modal'}}>
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        </Stack.Group>


                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>

    )
}

export default StackNavigator;


