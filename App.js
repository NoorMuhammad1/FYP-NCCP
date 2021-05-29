import React, { useState } from "react";
import * as Fonts from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import store from "./src/store";
import Navigation from "./src/navigation";
const getFonts = () =>
  Fonts.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <Navigation />
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
