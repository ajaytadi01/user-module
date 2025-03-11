import { Animated, useAnimatedValue } from "react-native";
import React, { useEffect, useState } from "react";
import { Props } from "../utils/ValidatedInput";

const useInputValidationViewModel = ({
  value,
  name,
  label,
  onValueChange,
  type,
  required,
}: Props) => {
  // console.log({
  //   value,
  //   name,
  //   label,
  //   onValueChange,
  //   type,
  //   required,
  // });

  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const labelAnimation = useAnimatedValue(0);
  const labelfontAnimation = useAnimatedValue(18);

  const validateInput = (text: string | number) => {
    let isValid = true;

    if (required && text == "") {
      setError(`${label} is required`);
      isValid = false;
    } else if (type === "text" && !/^[a-zA-Z]{0,25}$/.test(text as string)) {
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
      setError("Please enter a valid Mobile Number.");
      isValid = false;
    } else {
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

  return {
    handleChange,
    handleBlurChange,
    handleFocusAnimation,
    error,
    focused,
    labelStyle,
    maxLengths,
  };
};

export default useInputValidationViewModel;
