import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './src/components/Button';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back); //camera will start at the back cam
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  //if the user allow access to the camera
  const takePicture = async () => {
    if(cameraRef) {
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      }catch(e) {
        console.log(e);
      }
    }
  }   
  const saveImage = async () => {
    if(image) {
      try{
        await MediaLibrary.createAssetAsync(image); //takes as an asset as parameter which is the uri for the image 
        alert('Picture save!')
        setImage(null); 
      } catch(e) {
        console.log(e)
      }
    }
  }

  if (hasCameraPermission === false) { //validation if the user doesn't allow to use the camera
    return <Text>No access to camera</Text>
  }
   
  return (
    <View style={styles.container}>
      <Text style={{justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
    }}>Position the camera directly to the QR code.</Text>
      {!image ?
      <Camera
      style={styles.camera}
      type={type} //used the variable type
      flashMode={flash} // used the variable flash
      ref={cameraRef} //contains the reference of the camera
      >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
        <Button icon={'retweet'}  onPress={() =>{
          setType(type === CameraType.back 
            ? CameraType.front 
            : CameraType.back)
        }}/>
        <Button icon={'flash'} 
        color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#FFFFFF'} 
        onPress={() => {
          setFlash(flash === Camera.Constants.FlashMode.off 
            ? Camera.Constants.FlashMode.on 
            : Camera.Constants.FlashMode.off)
        }}/>
      </View>
      
      </Camera>
      //if doesn't show an image it will show the black screen
      :
      <Image source={{uri: image}} style={styles.camera} />
      }

      <View>
        {image ?
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20
        }}> 
          <Button title={"Retake"} after="retweet" onPress={() => setImage(null)}/>
          <Button title={"Save"} after="check" onPress={saveImage}/>
        </View> 
        :
        <Button capture="controller-record" size={40} onPress={takePicture} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    
  },
  camera: {
    flex: 0.5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#F2BB4E',
    paddingLeft: 10,
    paddingRight: 10
  }
});
