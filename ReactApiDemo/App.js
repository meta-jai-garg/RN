/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Vibration,
    AccessibilityInfo,
    Keyboard,
    TextInput
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default class App extends Component {
    state = {
        type: "idk",
        isConnected: false,
        screenReaderEnabled: false
    };

    componentDidMount() {
        AccessibilityInfo.addEventListener(
            "screenReaderChanged",
            this._handleScreenReaderToggled
        );
        AccessibilityInfo.fetch().then(screenReaderEnabled => {
            this.setState({ screenReaderEnabled });
        });
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this._keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            this._keyboardDidHide
        );
    }

    _keyboardDidShow() {
        console.log("Keyboard Shown");
    }

    _keyboardDidHide() {
        console.log("Keyboard Hidden");
    }

    componentWillUnmount() {
        AccessibilityInfo.removeEventListener(
            "screenReaderChanged",
            this._handleScreenReaderToggled
        );

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _handleScreenReaderToggled = screenReaderEnabled => {
        this.setState({ screenReaderEnabled });
    };

    networkStatus() {
        NetInfo.fetch().then(state => {
            this.setState({ type: state.type });
            this.setState({ isConnected: state.isConnected });
        });
        const { type, isConnected } = this.state;
        return (
            <View>
                <Text style={{ fontSize: 16, padding: 8 }}>
                    Connection Type: {type}
                </Text>
                <Text
                    style={{
                        color: isConnected ? "#00FF00" : "#FF0000",
                        fontSize: 16,
                        padding: 8
                    }}
                >
                    Is Connected: {isConnected ? "true" : "false"}
                </Text>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => Vibration.vibrate(10000)}
                    style={{ padding: 12 }}
                >
                    <Text style={{ color: "#FF0000", fontSize: 18 }}>
                        Start Vibration
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Vibration.cancel()}
                    style={{ padding: 12 }}
                >
                    <Text style={{ color: "#00FF00", fontSize: 18 }}>
                        Stop Vibration
                    </Text>
                </TouchableOpacity>
                <Text>Keyboard Events</Text>
                <TextInput
                    placeholder="Click Here..."
                    onSubmitEditing={Keyboard.dismiss}
                />
                <Text style={{ fontSize: 18, padding: 12 }}>
                    The screen reader is{" "}
                    {this.state.screenReaderEnabled ? "enabled" : "disabled"}.
                </Text>

                {this.networkStatus()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    }
});
