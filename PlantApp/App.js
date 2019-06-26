/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import Navigation from "./navigation";
import * as constants from "./constants";
import { Block } from "./components";

export default class App extends Component {
    render() {
        return (
            <Block>
                <Navigation />
            </Block>
        );
    }
}
