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
  Animated,
  Easing
} from "react-native";

export default class App extends Component<{}> {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3);
  }

  componentDidMount() {
    this.animate();
    this.spring();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.animate());
  }

  spring() {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver:true
    }).start();
  }

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    });
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0]
    });
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    });
    const rotateX = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "180deg", "0deg"]
    });

    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 300,
            height: 200,
            marginTop: 50,
            marginBottom: 10,
            alignSelf: "center",
            transform: [{ scale: this.springValue }]
          }}
          source={{
            uri:
              "https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png"
          }}
          resizeMode="contain"
        />
        <Animated.View
          style={{
            marginLeft,
            height: 30,
            width: 40,
            backgroundColor: "red"
          }}
        />
        <Animated.View
          style={{
            opacity,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: "blue"
          }}
        />
        <Animated.View
          style={{
            marginLeft: movingMargin,
            marginTop: 10,
            height: 30,
            width: 40,
            backgroundColor: "orange"
          }}
        />
        <Animated.Text
          style={{
            fontSize: textSize,
            marginTop: 10,
            color: "green"
          }}
        >
          Animated Text!
        </Animated.Text>
        <Animated.View
          style={{
            transform: [{ rotateX }],
            marginTop: 50,
            height: 30,
            width: 40,
            backgroundColor: "black"
          }}
        >
          <Text style={{ color: "white" }}>Hello from TransformX</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
