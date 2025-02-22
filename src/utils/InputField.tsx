import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  onTextChange: (e:string, name:string) => void;
  value: string;
}

const InputField = ({
  name,
  placeholder,
  type,
  onTextChange,
  value,
}: Props) => {

  const [focusValidation, setFocusValidation] = useState(false);
  const [textValidation, setTextValidation] = useState("");

  const validationStyle = focusValidation
    ? { borderBottomColor: "red", borderBottomWidth: 2 }
    : {
        borderBottomColor: "#bababa",
        borderBottomWidth: 2,
      };

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>{name}</Text>
      <View style={validationStyle}>
        <TextInput
          value={value}
          secureTextEntry={type == "password" ? true : false}
          style={styles.textInput}
          placeholder={placeholder}
          onChangeText={(e) => {
            setFocusValidation(false)
            onTextChange(e, name);
            setTextValidation(e);
          }}
          onBlur={() => {
            textValidation
              ? setFocusValidation(false)
              : setFocusValidation(true);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  container: {
    borderBottomColor: "#bababa",
    borderBottomWidth: 2,
  },
  label: {
    marginTop: 10,
  },
  textInput: {
    borderRadius: 18,
    fontSize: 16,

    height: 60,
    paddingLeft: 14,
  },
});

export default InputField;
