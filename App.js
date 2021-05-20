import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Fonts from "expo-font";
import SignIn from "./src/screens/SignIn";
import AppLoading from "expo-app-loading";
import Navigator from "./src/routes/homeStack";
import { NavigationContainer } from "@react-navigation/native";
import { StackRouter } from "react-navigation";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Dashboard from "./src/screens/Dashboard";
import Header from "./src/components/Header";
import Settings from "./src/screens/Settings";
import Main from "./src/screens/DashboardScreens/Main";
import Catalogue from "./src/screens/DashboardScreens/Catalogue";
import Orders from "./src/screens/DashboardScreens/Orders";
import Deposits from "./src/screens/DashboardScreens/Deposits";
import Reports from "./src/screens/DashboardScreens/Reports";
import Users from "./src/screens/DashboardScreens/Users";
import globalColors from "./styles/globalColors";
import { Provider } from "react-redux";
import store from "./src/store";
import Toast from "./src/helpers/Toast";
import Payments from "./src/screens/DashboardScreens/Payments";
import Logs from "./src/screens/DashboardScreens/Logs";
import AddUser from "./src/screens/DashboardScreens/AddUser";

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const getFonts = () =>
  Fonts.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const dashboardTabs = () => {
    return (
      <TopTabs.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: globalColors.HEADER_TEXT_COLOR,
          indicatorStyle: { backgroundColor: "#ffffff" },
          tabStyle: {
            backgroundColor: globalColors.SECONDARY_COLOR,
          },
          labelStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <TopTabs.Screen name="Main" component={Main} />
        <TopTabs.Screen name="Catalogue" component={Catalogue} />
        <TopTabs.Screen name="Users" component={Users} />
        <TopTabs.Screen name="Orders" component={Orders} />
        <TopTabs.Screen name="Deposits" component={Deposits} />
        <TopTabs.Screen name="Payments" component={Payments} />
        <TopTabs.Screen name="Reports" component={Reports} />
        <TopTabs.Screen name="Logs" component={Logs} />
      </TopTabs.Navigator>
    );
  };
  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignIn"
              component={SignIn}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="AddUser"
              component={AddUser}
            />
            <Stack.Screen
              options={{
                header: ({ navigation }) => <Header navigation={navigation} />,
              }}
              name="Dashboard"
              children={dashboardTabs}
            />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => alert(err)}
      />
    );
  }
}
