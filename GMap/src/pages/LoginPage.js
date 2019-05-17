import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Button, Text } from "native-base";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";

const permissions = ["public_profile", "email", "user_location", "user_birthday"]

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center"
          }}
        />
      );
    }
    return (
      <View style={[styles.container, {paddingHorizontal:10}]}>
        <Button full rounded dark={true} onPress={() => this.loginUser()}>
          <Text>Click Here To Login With Facebook</Text>
        </Button>
      </View>
    );
  }
  loginUser = () => {
    LoginManager.logInWithReadPermissions(permissions).then(
      result => {
        if (result.isCancelled) {
          console.log("login is cancelled.");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            this.initUser(accessToken);
          });
        }
      }
    );
  };

  initUser = accessToken => {
    this.setState({ isLoading: true });
    fetch(
      `https://graph.facebook.com/v3.3/me?fields=id,name,location,birthday&access_token=${accessToken}`
    )
      .then(response => response.json())
      .then(user => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate("Profile", { user: user });
      })
      .catch(() => {
        console.log("ERROR GETTING DATA FROM FACEBOOK");
      });
  };
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECECEC"
  }
});
