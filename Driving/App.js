/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Block, Text } from "./components";
// import { Text } from "react-native";
import Navigation from './navigation';

export default class App extends Component {

    render() {
        return (
            <Block>
                <Navigation />
            </Block>
        );
    }
}
