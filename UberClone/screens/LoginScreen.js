import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Animated,
  Keyboard,
  Platform
} from "react-native";

import { Icon } from "native-base";
import * as Animatable from "react-native-animatable";

const { height, width } = Dimensions.get("window");

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      placeholderText: "Enter your mobile number"
    };
  }

  componentWillMount() {
    this.loginHeight = new Animated.Value(150);
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardWillHide
    );

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.bottomBorderWidth = new Animated.Value(0);
  }

  keyboardWillShow = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration,
        toValue: event.endCoordinates.height + 10
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 1
      }),
      Animated.timing(this.bottomBorderWidth, {
        duration: duration,
        toValue: 1
      })
    ]).start();
  };

  keyboardWillHide = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.bottomBorderWidth, {
        duration: duration,
        toValue: 0
      })
    ]).start();
  };

  increaseLoginHeight = () => {
    this.setState({ placeholderText: "9876543210" });
    Animated.timing(this.loginHeight, {
      toValue: height,
      duration: 500
    }).start(() => this.refs.textInputMobile.focus());
  };

  decreaseLoginHeight = () => {
    this.setState({ placeholderText: "Enter your mobile number" });
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500
    }).start();
  };

  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [1, 0]
    });
    const marginTopText = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [25, 100]
    });
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [0, 1]
    });
    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [150, 400, height],
      outputRange: [0, 0, 100]
    });
    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [100, 25]
    });
    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [0, 1]
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            top: 60,
            left: 25,
            zIndex: 100,
            opacity: headerBackArrowOpacity
          }}
        >
          <TouchableOpacity onPress={() => this.decreaseLoginHeight()}>
            <Icon name="md-arrow-back" style={{ color: "black" }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            right: 10,
            bottom: Platform.OS == "android" ? 10 : this.keyboardHeight,
            zIndex: 100,
            backgroundColor: "#54575e",
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            opacity: this.forwardArrowOpacity
          }}
        >
          <TouchableOpacity onPress={() => this.decreaseLoginHeight()}>
            <Icon name="md-arrow-forward" style={{ color: "white" }} />
          </TouchableOpacity>
        </Animated.View>
        <ImageBackground
          source={require("../assets/login_bg.jpg")}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Animatable.View
              animation="zoomIn"
              iterationCount={1}
              style={{
                backgroundColor: "#fff",
                height: 100,
                width: 100,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 26, color: "#000" }}>
                UBER
              </Text>
            </Animatable.View>
          </View>
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{ height: this.loginHeight, backgroundColor: "#fff" }}
            >
              <Animated.View
                style={{
                  alignItems: "flex-start",
                  marginTop: marginTopText,
                  paddingHorizontal: 25,
                  opacity: headerTextOpacity
                }}
              >
                <Text style={{ fontSize: 24, color: "black" }}>
                  Get moving with Uber
                </Text>
              </Animated.View>
              <TouchableOpacity onPress={() => this.increaseLoginHeight()}>
                <Animated.View
                  style={{
                    marginTop: marginTopText,
                    paddingHorizontal: 25,
                    flexDirection: "row"
                  }}
                >
                  <Animated.Text
                    style={{
                      fontSize: 24,
                      color: "gray",
                      position: "absolute",
                      bottom: titleTextBottom,
                      left: titleTextLeft,
                      opacity: titleTextOpacity
                    }}
                  >
                    Enter your mobile number
                  </Animated.Text>

                  <Image
                    source={require("../assets/india.png")}
                    style={{ height: 24, width: 24, resizeMode: "contain" }}
                  />
                  <Animated.View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderBottomWidth: this.bottomBorderWidth
                    }}
                    pointerEvents="none"
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        paddingHorizontal: 10,
                        color: "black"
                      }}
                    >
                      +91
                    </Text>
                    <TextInput
                      ref="textInputMobile"
                      style={{
                        flexGrow: 1,
                        fontSize: 20,
                        paddingVertical: 0,
                        height: 24
                      }}
                      placeholder={this.state.placeholderText}
                      underlineColorAndroid="transparent"
                      maxLength={10}
                      keyboardType="phone-pad"
                    />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>

            <View
              style={{
                backgroundColor: "white",
                height: 70,
                alignItems: "flex-start",
                justifyContent: "center",
                borderTopColor: "#e8e8ec",
                borderTopWidth: 1,
                paddingHorizontal: 25
              }}
            >
              <Text
                style={{
                  color: "#5a7fdf",
                  fontWeight: "bold"
                }}
              >
                Or connect using social account...{" "}
              </Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
