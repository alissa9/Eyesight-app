import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { store } from './store';
import tw from 'tailwind-rn';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();


export default function App() {
  return (
    <NavigationContainer>

      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
