import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  useAnimatedValue,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

interface Props {
  value: number | string;
  name: string;
  label: string;
  onValueChange: (name: string, text: string, isValid: boolean) => void;
  type?: string;
  required?: boolean;
  testId: string;
}

const ValidatedInput = ({
  value,
  name,
  label,
  onValueChange,
  type = "text",
  required = false,
  testId,
}: Props) => {
  // const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const labelAnimation = useAnimatedValue(0);
  const labelfontAnimation = useAnimatedValue(18);

  const validateInput = (text: string | number) => {
    let isValid = true;

    if (required && text == "") {
      setError(`${label} is required`);
      isValid = false;
    } else if (type === "text" && !/^[a-zA-Z ]{0,25}$/.test(text as string)) {
      setError("Please enter a alphabets only.");
      isValid = false;
    } else if (
      type === "email" &&
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z]+\.[a-zA-Z]{2,})$/.test(text as string)
    ) {
      setError("Please enter a valid email address.");
      isValid = false;
    } else if (
      type === "number" &&
      !/^((\+91?)|\+)?[7-9][0-9]{9}$/.test(text as string)
    ) {
      // console.log(text);
      setError("Please enter a valid Mobile Number.");
      isValid = false;
    } else {
      // console.log("calleed", required, text);
      setError("");
      setFocused(true);
    }
    if (onValueChange) {
      if (!required && text == "") isValid = true;
      onValueChange(name, text as string, isValid);
      
    }
  };
  const handleChange = (text: string) => {
    setError("");

    onValueChange(name, text as string, false);
  };

  useEffect(() => {
    if (value) {
      handleFocusAnimation();
    }
  }, [value]);
  const handleFocusAnimation = () => {
    setFocused(true);

    Animated.timing(labelAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(labelfontAnimation, {
      toValue: 12,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleBlurChange = () => {
    validateInput(value);

    setFocused(false);
    if (value == "") {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(labelfontAnimation, {
        toValue: 18,
        duration: 300,
        useNativeDriver: false,
      }).start();

      if (required) setError(`${label} is required`);
      if (!required && value == "") setError("");
    }
  };

  const heightInterpolation = labelAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });
  const labelStyle = { top: heightInterpolation, fontSize: labelfontAnimation };

  const maxLengths = type == "number" ? 10 : 25;
  // console.log(error?error:'');

  return (
    <View>
      <View
        style={[
          styles.container,
          focused && { borderColor: "green", borderBottomWidth: 2 },
          error && { borderColor: "red" },
        ]}
      >
        <Animated.Text
          style={[
            styles.label,
            labelStyle,
            focused ? { color: "green" } : { color: "#747474" },
            error && { color: "red" },
          ]}
        >
          {label}
        </Animated.Text>

        <TextInput
          testID={testId}
          style={styles.input}
          keyboardType={type === "number" ? "numeric" : "default"}
          value={
            value !== null && value !== undefined ? String(value) : undefined
          }
          onChangeText={handleChange}
          onBlur={handleBlurChange}
          onFocus={handleFocusAnimation}
          maxLength={maxLengths}
        />
      </View>
      {!required && <Text>optional</Text>}
      <Text testID={`${testId}-error`} style={styles.errorText}>
        {error ? error : ""}
      </Text>
      {/* {error ? (
        <Text testID={`${label}-error`} style={styles.errorText}>
          {error}
        </Text>
      ) : (
        <Text testID={`${label}-error`} style={{ opacity: 0 }}></Text>
      )} */}
    </View>
  );
};

export default ValidatedInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    borderColor: "#747474",
    // fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    position: "absolute",
    left: 13,
    marginTop: 4,
    color: "#747474",
  },
  required: { color: "red" },
  input: {
    // borderWidth:1,
    marginTop: 5,
    height: 55,
    fontSize: 18,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 1,
    color: "red",
    fontSize: 14,
  },
});
