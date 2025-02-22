import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputField from "../utils/InputField";
import CustomButton from "../utils/CustomButton";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  // const userdetails = useSelector((state)=>state.user.userDetails)
  const [isSignIn, setIsSignIn] = useState(true);
  const [userSignInData, setUserSignInData] = useState({
    Email: "",
    Password: "",
  });
  const [isWrongCred, setWrongCred] = useState(false);
  const userCredentionals = useSelector((state) => state.user.userDetails);
  const navigation = useNavigation();
  const { Email, Password } = userSignInData;
  console.log(userCredentionals);

  const handleSignInChange = (value: any, name: any) => {
    setUserSignInData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSignInPress = () => {
    for (let i = 0; i < userCredentionals.length; i++) {
      
      if (Email === userCredentionals[i].Email) {
        if (Password === userCredentionals[i].Password) {
          // console.log(userCredentionals[i].id,'oknsdfadfa');

          navigation.navigate("Home",{id:userCredentionals[i].id});
          return;
        }
      }
    }
    setWrongCred(true);
    // console.log(Email, Password);
  };
  const warningText = isWrongCred ? "**Invalid Credentionals" : "";
  // console.log(userdetails);

  const loginTsx = (
    <View style={styles.card}>
      <Text style={{ textAlign: "right", color: "red" }}>{warningText}</Text>
      <InputField
        name={"Email"}
        placeholder={"Enter Email"}
        type={undefined}
        onTextChange={handleSignInChange}
        value={userSignInData.Email}
      />
      <InputField
        name={"Password"}
        placeholder={"Enter Password"}
        type={"password"}
        onTextChange={handleSignInChange}
        value={userSignInData.Password}
      />
      <View style={styles.button}>
        <CustomButton
          title={"Sign In"}
          // path={"Home"}
          onPress={handleSignInPress}
          color="#9463db"
        />
      </View>

      <View
        style={{
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>Don't have Account?</Text>
        <Pressable
          onPress={() => setIsSignIn((prevState) => !prevState)}
          style={{ marginLeft: 5 }}
        >
          <Text style={{ color: "#774db3", fontSize: 18 }}> Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, marginLeft: 40 }}>
        <Text style={[styles.text, styles.WelcomeText]}>Welcome</Text>
        <Text style={[styles.text, styles.signInText]}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </Text>
      </View>
      {isSignIn ? loginTsx : <SignUp setSignin={setIsSignIn} />}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#774db3",
  },
  WelcomeText: {
    color: "#b1aabd",
    fontSize: 18,
  },
  text: {
    fontFamily: "roboto",
  },
  signInText: { color: "#fff", fontSize: 32 },
  card: {
    backgroundColor: "#f3e5f5",
    flex: 1,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: 60,
    padding: 20,
    paddingTop: 50,
  },
  button: {
    width: "80%",
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
});
