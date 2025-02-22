import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const Home = () => {
  const userName = useAppSelector((state) => state.user.userDetails);
  const [name, setName] = useState("");
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.UserList.usersList);

  console.log(usersList, "from store");

  useEffect(() => {
    dispatch({ type: "GET_DATA_FROM_API" });
    //   let singleUserData = userName.filter((item) => item.id === params.id);
    //   navigation.setOptions({ title: `Hi, ${singleUserData[0].Name}` });
    //   setName(singleUserData[0].Name);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Hi, {name} !</Text>
      {usersList.map((item) => {
        console.log(item.id);

        return <Text key={item.id}>{item.name}</Text>;
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
