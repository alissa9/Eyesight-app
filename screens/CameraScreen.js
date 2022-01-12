import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';





export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const takePhotoFromCamera = async () => {
        const option = { quality: 0.5, base64: true }


    }

    const chooseFromLibrary = () => {

    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>

            <Camera style={{ flex: 1 }} type={type}>
                <SafeAreaView style={{ alignItems: 'center', flexDirection: "row", justifyContent: 'space-around', marginTop: 770, }}>
                    <TouchableOpacity style={{ position: 'absoulte', bottom: 0, flex: 0, backgroundColor: 'beige', borderRadius: "12" }} onPress={takePhotoFromCamera}>

                        <AntDesign name="camerao" size={70} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absoulte', bottom: 0, flex: 0, backgroundColor: 'beige', borderRadius: "12" }} onPress={chooseFromLibrary}>

                        <AntDesign name="picture" size={70} color="black" />
                    </TouchableOpacity>
                </SafeAreaView>
            </Camera>

        </View>
    );
}

const styles = StyleSheet.create({}); 