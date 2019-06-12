/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginPage from "./pages/LoginPage";
import MyLocation from "./pages/MyLocation";
import ProfilePage from "./pages/ProfilePage";
import ImagePicker from "./pages/ImagePicker";

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: LoginPage },
  Profile: { screen: ProfilePage },
  Location: { screen: MyLocation },
  ImagePicker: { screen: ImagePicker }
});
const AppContainer = createAppContainer(AppSwitchNavigator);
