import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Create() {
  const [value, setValue] = useState("");
  const [isEnabled, setEnabled] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const handleInputChange = (value: string) => {
    setValue(value);
    console.log(value);
  };

  const toggleSwitch = () => {
    setEnabled(!isEnabled);
  };

  console.log(permission);

  const handleTakePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    console.log(photo);
  };

  return (
    <View>
      <CameraView ref={cameraRef} facing="back" style={styles.camera} />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <TextInput
        value={value}
        onChangeText={handleInputChange}
        placeholder="Placeholder"
        keyboardType="numeric"
      />
      <Pressable onPress={requestPermission}>
        <Text>Request Permission</Text>
      </Pressable>
      <Pressable onPress={handleTakePicture}>
        <Text>Take Picture</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    minHeight: 500,
  },
});
