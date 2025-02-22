import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputField from "../utils/InputField";
import CustomButton from "../utils/CustomButton";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AddToStore } from "../store/reducers";

interface Props {
  setSignin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = ({ setSignin }: Props) => {
  const [userSignUpData, setUserSignUpData] = useState({
    id: Date.now(),
    Name: "",
    Email: "",
    Password: "",
  });
  let { Name, Email, Password } = userSignUpData;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleTextInputChange = (value: any, name: any) => {
    setUserSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
      id: Date.now(),
    }));
  };
  const handlePress = () => {
    if (Name == "" || Email == "" || Password == "") {
      return;
    }
    console.log(userSignUpData);

    dispatch(AddToStore(userSignUpData));
    navigation.navigate("Home", { id: userSignUpData.id });

    // setUserSignUpData({ id: Date.now(), Name: "", Email: "", Password: "" });
  };

  return (
    <View style={styles.card}>
      <InputField
        name={"Name"}
        value={userSignUpData.Name}
        placeholder={"Enter Name"}
        type={undefined}
        onTextChange={handleTextInputChange}
      />
      <InputField
        name={"Email"}
        value={userSignUpData.Email}
        placeholder={"Enter Email"}
        type={undefined}
        onTextChange={handleTextInputChange}
      />
      <InputField
        name={"Password"}
        value={userSignUpData.Password}
        placeholder={"Enter Password"}
        type={"password"}
        onTextChange={handleTextInputChange}
      />
      <View style={styles.button}>
        <CustomButton
          color="#9463db"
          title={"Sign Up"}
          onPress={handlePress}
          path={""}
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
        <Text style={{ textAlign: "center" }}>Have Account?</Text>
        <Pressable
          onPress={() => setSignin((prevState: any) => !prevState)}
          style={{ marginLeft: 5 }}
        >
          <Text style={{ color: "#774db3", fontSize: 18 }}> Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    backgroundColor: "gray",
  },
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
