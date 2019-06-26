import React, { Component } from "react";
import {
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    Alert
} from "react-native";
import { Button, Block, Text, Input } from "../components";
import { theme } from "../constants";

export default class Signup extends Component {
    state = {
        email: null,
        password: null,
        username: null,
        errors: [],
        loading: false
    };

    handleSignup() {
        const { navigation } = this.props;
        const { email, password, username } = this.state;
        const errors = [];

        Keyboard.dismiss();

        this.setState({ loading: true });

        if (!email) errors.push("email");
        if (!password) errors.push("password");
        if (!username) errors.push("username");

        this.setState({ errors, loading: false });

        if (!errors.length)
            Alert.alert(
                "Success!",
                "Your account has been created.",
                [
                    {
                        text: "Continue",
                        onPress: () => navigation.navigate("Browse")
                    }
                ],
                { cancelable: false }
            );
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
                        Sign Up
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
                            label="Username"
                            error={hasErrors("username")}
                            style={[styles.input, hasErrors("username")]}
                            defaultValue={this.state.username}
                            onChangeText={text =>
                                this.setState({ username: text })
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

                        <Button gradient onPress={() => this.handleSignup()}>
                            <Text bold white center>
                                Sign Up
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
