import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Image } from "react-native";

import Welcome from "../screens/Welcome";
import Settings from "../screens/Settings";
import Product from "../screens/Product";
import Login from "../screens/Login";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Signup from "../screens/Signup";
import Forgot from "../screens/Forgot";

import { theme } from "../constants";

const screens = createStackNavigator(
    {
        Welcome,
        Settings,
        Product,
        Login,
        Explore,
        Browse,
        Signup,
        Forgot
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base * 4,
                backgroundColor: theme.colors.white,
                borderBottomColor: "transparent",
                elevation: 0
            },
            headerBackImage: (
                <Image source={require("../assets/icons/back.png")} />
            ),
            headerBackTitle: null,
            headerLeftContainerStyle: {
                alignItems: "center",
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base
            },
            headerRightContainerStyle: {
                alignItems: "center",
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base
            }
        }
    }
);

export default createAppContainer(screens);
