import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Account from "../screens/Account";
import AddMicroorganism from "../screens/DashboardScreens/AddMicroorganism";
import AddUser from "../screens/DashboardScreens/AddUser";
import Catalogue from "../screens/DashboardScreens/Catalogue";
import DepositDetails from "../screens/DashboardScreens/DepositDetails";
import Deposits from "../screens/DashboardScreens/Deposits";
import EditMicroorganism from "../screens/DashboardScreens/EditMicroorganism";
import EditUser from "../screens/DashboardScreens/EditUser";
import Logs from "../screens/DashboardScreens/Logs";
// import Main from "../screens/DashboardScreens/Main";
import MicroorganismDetails from "../screens/DashboardScreens/MicroorganismDetails";
import OrderDetails from "../screens/DashboardScreens/OrderDetails";
import Orders from "../screens/DashboardScreens/Orders";
import PaymentDetails from "../screens/DashboardScreens/Payment Details";
import Payments from "../screens/DashboardScreens/Payments";
// import Reports from "../screens/DashboardScreens/Reports";
import UserDetails from "../screens/DashboardScreens/UserDetails";
import Users from "../screens/DashboardScreens/Users";
import Settings from "../screens/Settings";
import Share from "../screens/Share";
import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Navigation = () => {
  const auth = useSelector((state) => state.auth);

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
        {/* <TopTabs.Screen name="Main" component={Main} /> */}
        <TopTabs.Screen name="Catalogue" component={Catalogue} />
        <TopTabs.Screen name="Users" component={Users} />
        <TopTabs.Screen name="Orders" component={Orders} />
        <TopTabs.Screen name="Deposits" component={Deposits} />
        <TopTabs.Screen name="Payments" component={Payments} />
        {/* <TopTabs.Screen name="Reports" component={Reports} /> */}
        <TopTabs.Screen name="Logs" component={Logs} />
      </TopTabs.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.token ? (
          <>
            <Stack.Screen
              options={{
                header: ({ navigation }) => <Header navigation={navigation} />,
              }}
              name="Dashboard"
              children={dashboardTabs}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="AddUser"
              component={AddUser}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="AddMicroorganism"
              component={AddMicroorganism}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="MicroorganismDetails"
              component={MicroorganismDetails}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="EditMicroorganism"
              component={EditMicroorganism}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="UserDetails"
              component={UserDetails}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="EditUser"
              component={EditUser}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="Order Details"
              component={OrderDetails}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="Deposit Details"
              component={DepositDetails}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="Payment Details"
              component={PaymentDetails}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="Account"
              component={Account}
            />
            <Stack.Screen
              // options={{ headerShown: false }}
              name="Share"
              component={Share}
            />

            <Stack.Screen name="Settings" component={Settings} />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignIn"
            component={SignIn}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
