/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";

firebase.crashlytics().enableCrashlyticsCollection();
export default class FiresbaseDemo extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  async componentDidMount() {
    if (Platform.OS == "android") {
      this.checkPermission();
      this.createNotificationListeners();
    }
  }

  componentWillUnmount() {
    if (Platform.OS == "android") {
      this.notificationListener();
      this.notificationOpenedListener();
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

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
      firebase.crashlytics().log("Logged");
      firebase
        .analytics()
        .logEvent("login", { email: email, password: password });
      this.setState({ email: "", password: "" });
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
    firebase
      .analytics()
      .logEvent("sign_up", { email: email, password: password });
    this.setState({ email: "", password: "" });
  };

  fetchConfig = function() {
    firebase
      .config()
      .fetch()
      .then(() => {
        return firebase.config().activateFetched();
      })
      .then(activated => {
        if (!activated) console.log("Fetched data not activated");
        return firebase.config().getValue("app_update");
      })
      .then(snapshot => {
        const app_update = snapshot.val();
        if (app_update)
          this.showAlert(
            app_update,
            "Please update the app in order to enjoy new features."
          );
      });
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
          onSubmitEditing={() => this.focusNextField("2")}
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
            backgroundColor: "#E64A19",
            marginTop: 10,
            borderRadius: 10
          }}
          onPress={() => this.loginUser(this.state.email, this.state.password)}
        />
        <Button
          title="SIGN UP"
          buttonStyle={{
            backgroundColor: "#212121",
            marginTop: 10,
            borderRadius: 10
          }}
          onPress={() => this.signupUser(this.state.email, this.state.password)}
        />
        <Button
          title="CRASH ME"
          buttonStyle={{
            backgroundColor: "#49C0DC",
            marginTop: 10,
            borderRadius: 10
          }}
          onPress={() => firebase.crashlytics().crash()}
        />
        {this.fetchConfig()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8
  },
  textInputStyle: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 18,
    paddingStart: 12,
    margin: 0,
    padding: 0
  },
  hintStyle: {
    fontSize: 16,
    color: "#000",
    alignSelf: "flex-start",
    paddingStart: 12,
    paddingTop: 8
  }
});
