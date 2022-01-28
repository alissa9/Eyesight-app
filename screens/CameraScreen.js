import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  Image,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ModalResults from "../components/ModalResults";
import tw from "tailwind-rn";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [objectLables, setObjectLabels] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);

  // take photo from phone
  const takePhotoFromCamera = async () => {
    if (cameraRef) {
      console.log("in take picture from camera");
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true,
        });
        const response = await checkForLabels(photo.base64);
        const labels = response.responses[0].labelAnnotations;

        setObjectLabels(labels);
        setShowModal(true);
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Choose a photo from library
  const chooseFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    const response = await checkForLabels(photo.base64);
    const labels = response.responses[0].labelAnnotations;
    setObjectLabels(labels);
    setShowModal(true);

    if (!photo.cancelled) {
      setImage(photo.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const reponse = await checkForLabels();
      console.log(reponse);
    })();
  }, []);
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  async function checkForLabels(base64) {
    return await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" + GOOGLE_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  maxResults: 10,
                  type: "LABEL_DETECTION",
                },
              ],
            },
          ],
        }),
      }
    ).then(
      (response) => {
        return response.json();
      },
      (err) => {
        console.error("promise rejected");
        console.error(err);
      }
    );
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={tw("flex-1 ")}>
      <Camera style={tw("flex-1")} type={type} ref={cameraRef}>
        <SafeAreaView>
          <TouchableOpacity
            style={tw(
              "absolute top-0 right-0 mt-12 mr-4 bg-blue-200 rounded-2xl items-center p-0.5"
            )}
            onPress={chooseFromLibrary}
          >
            <AntDesign name="picture" size={70} color="black" />
            <Text style={tw("text-black font-bold ")}>Gallery</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView style={tw("absolute bottom-8")}>
          <SafeAreaView style={tw(" flex-row ml-16 ")}>
            <ModalResults showModal={showModal} objectLables={objectLables} />
            <TouchableOpacity
              style={tw("bg-blue-200 rounded-2xl p-2 ml-10 items-center ")}
              onPress={() => takePhotoFromCamera()}
            >
              <AntDesign name="camerao" size={50} color="black" />
              <Text style={tw("text-black font-bold mt-2")}>
                Take A Picture
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({});
