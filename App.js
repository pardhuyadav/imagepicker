// App.js 
import React, { useState } from "react";
import { View, StyleSheet, Image, Button } from "react-native";

import * as ImagePicker from "expo-image-picker";

function App()
{
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () =>
  {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false)
    {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1
    });

    // Explore the result
    console.log("İmage picker ", result);

    if (!result.cancelled)
    {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () =>
  {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false)
    {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 1
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled)
    {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <View style={ styles.screen }>
      <View style={ styles.buttonContainer }>
        <Button onPress={ showImagePicker } title="Select an image" />
        <Button onPress={ openCamera } title="Open camera" />
      </View>

      <View style={ styles.imageContainer }>
        {
          pickedImagePath !== '' && <Image
            source={ { uri: pickedImagePath } }
            style={ styles.image }
          />
        }
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover"
  }
});