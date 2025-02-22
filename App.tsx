import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Home from "./src/screens/Home";
import Form from "./src/screens/Form";
import Preview from "./src/screens/Preview";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Form">
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            // options={{ headerBackVisible: false }}
            name="Form"
            component={Form}
          />
          <Stack.Screen
            options={{ headerBackVisible: false }}
            name="Preview"
            component={Preview}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // <View>
    //   <Text>asd asdfa asdfa asdff</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
