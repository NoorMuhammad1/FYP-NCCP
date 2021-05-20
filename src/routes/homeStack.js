// import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainer } from "react-navigation";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { View, Text, StyleSheet } from "react-native";
// import SignIn from "../screens/SignIn";
// import Dashboard from "../screens/Dashboard";
// import Users from "../screens/Users";
// import globalColors from "../../styles/globalColors";

// // const Tabs = createMaterialTopTabNavigator();
// // const Tabs = createMaterialTopTabNavigator(
// //   {
// //     Dashboard: {
// //       screen: Dashboard,
// //       navigationOptions: {
// //         tabBarLabel: () => (
// //           <View>
// //             <Text>Dashboard</Text>
// //           </View>
// //         ),
// //       },
// //     },
// //     Users: {
// //       screen: Users,
// //       navigationOptions: {
// //         tabBarLabel: () => (
// //           <View>
// //             <Text>Users</Text>
// //           </View>
// //         ),
// //       },
// //     },
// //   },
// //   {
// //     initialRouteName: "Dashboard",
// //     lazyload: true,
// //     tabBarPosition: "top",
// //     swipeEnabled: true,
// //     tabBarOptions: {
// //       style: {
// //         height: 60,
// //         backgroundColor: globalColors.SECONDARY_COLOR,
// //         paddingBottom: 3,
// //         paddingTop: 3,
// //       },
// //       indicatorStyle: {
// //         backgroundColor: "#fff",
// //         elevation: 10,
// //       },
// //       activeTintColor: "#fff",
// //       inactiveTintColor: "gray",
// //     },
// //   }
// // );

// // const MainScreenNavigator = createStackNavigator({
// //   Tabs: {
// //     screen: Tabs,
// //     navigationOptions: {
// //       title: "NCCP",
// //       headerStyle: {
// //         backgroundColor: globalColors.PRIMARY_COLOR,
// //       },
// //       headerTitleStyle: {
// //         color: "#fff",
// //       },
// //     },
// //   },
// // });

// const screens = {
//   SignIn: {
//     screen: SignIn,
//   },
// };

// const HomeStack = createStackNavigator(screens);

// export default createAppContainer(HomeStack);
