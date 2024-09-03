// import { StyleSheet, View, Text, SafeAreaView, Button, Image, TouchableOpacity } from "react-native";
// import { useEffect, useState, useRef } from "react";
// import { CameraView } from 'expo-camera';
// import {shareAsync} from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';
// import { StatusBar } from "expo-status-bar";

// const CameraScreen = () => {
//     let cameraRef = useRef();
//     const [facing, setFacing] = useState<CameraType>('back');
//     const [hasCameraPermissions, setHasCameraPermissions] = useState();
//     //const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState();
//     const [photo, setPhoto] = useState();

//     function toggleCameraFacing() {
//         setFacing(current => (current === 'back' ? 'front' : 'back'));
//       }

//     useEffect(() => {
//         (async () => {
//             const cameraPermissions = await Camera.requestCameraPermissionsAsync();
//             const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
//             setHasCameraPermissions(cameraPermissions.status === "granted");
//             // setHasMediaLibraryPermissions(mediaLibraryPermissions.status === "granted");
//         })();
//     },[])

//     let takePic = async () => {
//         let options = {
//             quality: 1,
//             base64: true,
//             exif: false
//         };

//         let newPhoto = await cameraRef.current.takePictureAsync(options)
//         setPhoto(newPhoto);
//     }

//     if(photo) {
//         let sharePic = () => {
//             shareAsync(photo.uri).then(()=> {
//                 setPhoto(undefined);
//             })
//         }

//         // let savePhoto = () => {
//         //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
//         //         setPhoto(undefined); 
//         //     })
//         // }

//         return (
//             <SafeAreaView style = {styles.container}>
//                 <Image source = {{uri: "data:image/jpg;base64," + photo.base64}} />
//                 <Button title="Share" onPress={sharePic} />
//                 {/* {hasMediaLibraryPermissions && <Button title="Save to gallery" onPress={savePhoto} /> } */}
//                 <Button title = "Discard" onPress = { () => {setPhoto(undefined);}} />

//             </SafeAreaView> 
//         );
//     }

//     if(hasCameraPermissions === undefined) {
//         return <Text> Need camera access to proceed </Text>
//     }
//     return (
//         <CameraView style={styles.container} facing={facing}>
//             <View style = {styles.buttonContainer}>
//                 <Button title="Take Picture" onPress={takePic} />
//             </View>
//             <TouchableOpacity style={styles.buttonContainer} onPress={toggleCameraFacing}>
//             <Text>Flip Camera</Text>
//           </TouchableOpacity>
//             <StatusBar style="auto" />
//         </CameraView>
//     );
// }


// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     buttonContainer: {
//         backgroundColor: '#fff',
//         alignSelf: 'flex-end'
//     },
//     preview: {
//         alignSelf: 'stretch',
//         flex: 1
//     }
// })
// export default CameraScreen;



import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraScreen;