import React, { Component } from "react";
import {
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";

import { Button, Block, Text, Input } from "../components";

import { theme } from "../constants";

const EMAIL = "hell@example.com";

export default class Forgot extends Component {
    state = {
        email: "",
        errors: [],
        loading: false
    };

    handleForgot() {
        const { navigation } = this.props;
        const { email } = this.state;
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading: true });

        if (email !== EMAIL) errors.push("email");

        this.setState({ errors, loading: false });

        if (!errors.length) {
            Alert.alert(
                "Password sent",
                "Please check your email.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Login")
                    }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Error",
                "Please check you Email address.",
                [{ text: "Try again" }],
                { cancelable: false }
            );
        }
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;

        const hasErrors = key =>
            errors.includes(key) ? styles.hasErrors : null;
        return (
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>
                        Forgot
                    </Text>
                    <Block middle>
                        <Input
                            label="Email"
                            error={hasErrors("email")}
                            style={[styles.input, hasErrors("email")]}
                            defaultValue={this.state.email}
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                        />
                        <Button gradient onPress={() => this.handleForgot()}>
                            <Text bold white center>
                                Forgot
                            </Text>
                        </Button>
                        <Button onPress={() => navigation.goBack()}>
                            <Text
                                caption
                                gray2
                                center
                                style={{ textDecorationLine: "underline" }}
                            >
                                Back to Login
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    forgot: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        borderWidth: 0,
        borderRadius: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent
    }
});
