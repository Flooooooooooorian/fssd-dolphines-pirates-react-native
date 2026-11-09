import { useState } from "react";
import { Switch, TextInput, View } from "react-native";

export default function Create() {
  const [value, setValue] = useState("");
  const [isEnabled, setEnabled] = useState(false);

  const handleInputChange = (value: string) => {
    setValue(value);
    console.log(value);
  };

  const toggleSwitch = () => {
    setEnabled(!isEnabled);
  };

  return (
    <View>
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
    </View>
  );
}
