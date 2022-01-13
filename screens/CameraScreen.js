import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';







export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);



    const takePhotoFromCamera = async () => {
        if (cameraRef) {
            console.log('in take picture from camera');
            try {
                let photo = await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0.5,
                    base64: true
                });
                return photo;
                const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

            } catch (e) {
                console.log(e);
            }
        }


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

            <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
                <SafeAreaView style={{ alignItems: 'center', flexDirection: "row", justifyContent: 'space-around', marginTop: 720, }}>
                    <TouchableOpacity style={{ position: 'absoulte', bottom: 0, flex: 0, backgroundColor: 'beige', borderRadius: "12" }}
                        onPress={async () => {
                            const r = await takePhotoFromCamera();
                            Alert.alert("Debug", JSON.stringify(r))
                        }}>

                        <AntDesign name="camerao" size={70} color="black" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ position: 'absoulte', bottom: 0, flex: 0, backgroundColor: 'beige', borderRadius: "12" }} onPress={chooseFromLibrary}>

                        <AntDesign name="picture" size={70} color="black" />
                    </TouchableOpacity> */}
                </SafeAreaView>
            </Camera>

        </View>
    );
}

const styles = StyleSheet.create({}); 