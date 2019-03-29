/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class FiresbaseDemo extends Component<{}> {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {}

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    loginUser = (email, password) => {
        Keyboard.dismiss();
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(function(user) {
                    console.log(user);
                });
        } catch (error) {
            console.log(error.toString());
        }
    };
    signupUser = (email, password) => {
        Keyboard.dismiss();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(JSON.stringify(error)));
        this.setState({ email: '', password: '' });

        firebase
            .analytics()
            .logEvent('user', { email: email, password: password });
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hintStyle}>Email</Text>
                <TextInput
                    style={styles.textInputStyle}
                    ref="1"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => this.focusNextField('2')}
                    onChangeText={email => this.setState({ email })}
                    blurOnSubmit={false}
                    value={this.state.email}
                />
                <Text style={styles.hintStyle}>Password</Text>
                <TextInput
                    style={styles.textInputStyle}
                    ref="2"
                    secureTextEntry={true}
                    returnKeyType="done"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button
                    title="LOGIN"
                    buttonStyle={{
                        backgroundColor: '#E64A19',
                        marginTop: 10,
                        borderRadius: 10
                    }}
                    onPress={() =>
                        this.loginUser(this.state.email, this.state.password)
                    }
                />
                <Button
                    title="SIGN UP"
                    buttonStyle={{
                        backgroundColor: '#212121',
                        marginTop: 10,
                        borderRadius: 10
                    }}
                    onPress={() =>
                        this.signupUser(this.state.email, this.state.password)
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8
    },
    textInputStyle: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 18,
        paddingStart: 12,
        margin: 0,
        padding: 0
    },
    hintStyle: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'flex-start',
        paddingStart: 12,
        paddingTop: 8
    }
});
