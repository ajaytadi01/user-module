import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
// import { NavigationProp, useNavigation } from "@react-navigation/native";

type Prop = {
  path?: string;
  title: string;
  onPress?: () => void;
  color:string;
};

const CustomButton = ({ path, title, onPress,color }: Prop) => {
  // const navigation = useNavigation<NavigationProp>();

  const changeNav = () => {
    onPress();
    // if (path){
    //   navigation.navigate(path);
    // }else{
    //   onPress();
    // }

    // navigation.navigate(path);
  };
  const backColor = {backgroundColor:  color}
  
  return (
    <Pressable
      onPress={changeNav}
      style={({ pressed }) =>
        pressed
          ? [styles.button]
          : [styles.button, backColor]
      }
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    // height: 70,
    // width: 120,
    // borderWidth: 1,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    // backgroundColor:'red',
  },
  buttonText: { textAlign: "center", color: "white" },
});
