import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Wel from "../screens";
import Rewa from "../screens";
import Tri from "../screens";

import { theme } from "../constants";

const screens = createStackNavigator(
    {
        Wel,
        Rewa,
        Tri
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                height: 60,
                backgroundColor: theme.colors.gray4,
                borderBottomColor: "transparent"
            },
            headerTitleContainerStyle: {
                alignItems: "flex-end",
                paddingLeft: theme.sizes.padding
            },
            headerLeftContainerStyle: {
                alignItems: "flex-end",
                paddingLeft: theme.sizes.padding
            },
            headerRightContainerStyle: {
                alignItems: "flex-end",
                marginRight: theme.sizes.padding
            }
        },
        headerLayoutPreset: "left"
    }
);

export default createAppContainer(screens);
