import React, { Component } from "react";

import {
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";
import { Button, Block, Text, Input } from "../components";

import { theme } from "../constants";

const EMAIL = "hell@example.com";
const PASSWORD = "incorrect";

export default class Login extends Component {
    state = {
        email: EMAIL,
        password: PASSWORD,
        errors: [],
        loading: false
    };

    handleLogin() {
        const { navigation } = this.props;
        const { email, password } = this.state;
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading: true });

        // setTimeout(() => {
        if (email !== EMAIL) errors.push("email");
        if (password !== PASSWORD) errors.push("password");

        this.setState({ errors, loading: false });

        if (!errors.length) navigation.navigate("Browse");
        // }, 2000);
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;

        const hasErrors = key =>
            errors.includes(key) ? styles.hasErrors : null;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>
                        Login
                    </Text>
                    <Block middle>
                        <Input
                            email
                            label="Email"
                            error={hasErrors("email")}
                            style={[styles.input, hasErrors("email")]}
                            defaultValue={this.state.email}
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                        />
                        <Input
                            secure
                            label="Password"
                            error={hasErrors("password")}
                            style={[styles.input, hasErrors("password")]}
                            defaultValue={this.state.password}
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                        />

                        <Button gradient onPress={() => this.handleLogin()}>
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text bold white center>
                                    Login
                                </Text>
                            )}
                        </Button>
                        <Button onPress={() => navigation.navigate("Forgot")}>
                            <Text
                                caption
                                gray2
                                center
                                style={{ textDecorationLine: "underline" }}
                            >
                                Forgot your password?
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    login: {
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
