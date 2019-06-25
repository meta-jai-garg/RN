/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import LoginPage from "./pages/LoginPage";
import MyLocation from "./pages/MyLocation";
import ProfilePage from "./pages/ProfilePage";
import ImagePick from "./pages/ImagePicker";

class App extends Component {
    render() {
        return <AppContainer />;
    }
}

export default App;

const AppSwitchNavigator = createStackNavigator(
    {
        Login: { screen: LoginPage },
        Profile: { screen: ProfilePage },
        Location: { screen: MyLocation },
        ImagePicker: { screen: ImagePick }
    },
    { initialRouteName: "Login", headerMode: "none" }
);
const AppContainer = createAppContainer(AppSwitchNavigator);
