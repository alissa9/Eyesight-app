import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Platform, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';





export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);



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


            } catch (e) {
                console.log(e);
            }
        }


    }
    const chooseFromLibrary = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useEffect(() => {
        (async () => {
            const reponse = await checkForLabels()
            console.log(reponse)

        })()

    }, [])
    async function checkForLabels(base64) {
        return await
            fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCEzWUbpQmcga6G7TL4cz3d1sWGoPdFPzM", {
                method: 'POST',
                body: JSON.stringify({
                    "requests": [
                        {
                            "image": {
                                "content": base64
                            },
                            "features": [
                                {
                                    "type": "LABEL_DETECTION"
                                }
                            ]
                        }
                    ]
                })
            }).then((response) => {
                return response.json();
            }, (err) => {
                console.error('promise rejected')
                console.error(err)
            });
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
                            const base64 = await takePhotoFromCamera();
                            // Alert.alert("Debug", JSON.stringify(r))
                            // console.log(JSON.stringify(base64));

                        }}>

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