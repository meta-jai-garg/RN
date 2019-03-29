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
  PanResponder,
  Animated,
  Dimensions
} from "react-native";

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      showDraggable: true,
      dropZoneValues: null,
      pan: new Animated.ValueXY()
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) this.setState({ showDraggable: false });
        else
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
      }
    });
  }

  isDropZone(gesture) {
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.dropZone,
            this.state.showDraggable
              ? { backgroundColor: "#2c3e50" }
              : { backgroundColor: "#1abc9c" }
          ]}
          onLayout={this.setDropZoneValues.bind(this)}
        >
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        {this.renderDraggable()}
        {this.renderDraggable()}
        {this.renderDraggable()}
        {this.renderDraggable()}
        {this.renderDraggable()}
      </View>
    );
  }
  renderDraggable() {
    if (this.state.showDraggable) {
      return (
        <View style={styles.draggableContainer}>
          <Animated.View
            style={[this.state.pan.getLayout(), styles.circle]}
            {...this.panResponder.panHandlers}
          >
            <Text style={styles.text}>Drag me!</Text>
          </Animated.View>
        </View>
      );
    }
  }

  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: event.nativeEvent.layout
    });
  }
}

let CIRCLE_RADIUS = 36;
let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  dropZone: {
    height: height / 4
  },
  circle: {
    backgroundColor: "#1abc9c",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff"
  },
  draggableContainer: {
    position: "absolute",
    flexDirection: "row",
    top: height / 2 - CIRCLE_RADIUS,
    left: width / 2 - CIRCLE_RADIUS
  }
});
