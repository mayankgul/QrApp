import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export const Home = () => {
  const device = useCameraDevice('front');
  const {hasPermission, requestPermission} = useCameraPermission();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      setScanning(false);
      console.log(codes[0].value);

      setTimeout(() => {
        setScanning(true);
      }, 4000);
    },
  });

  const [scanning, setScanning] = useState(true);

  const requestCameraPermission = () => {
    requestPermission().then(granted => {
      if (granted) {
        setScanning(true);
      }
    });
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Button mode="contained" onPress={() => requestCameraPermission()}>
          Grant Camera Permission
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Scan your QR code</Text>

      {device && (
        <Camera
          device={device}
          isActive={scanning}
          style={styles.cameraContainer}
          codeScanner={codeScanner}
        />
      )}

      <Button mode="contained">Reset</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cameraContainer: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 50,
  },
});
