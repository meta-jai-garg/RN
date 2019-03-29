import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class CounterApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%"
          }}
        >
          <TouchableOpacity onPress={() => this.props.increase()}>
            <Text style={{ fontSize: 24, color: "black" }}>Increase</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, color: "black" }}>
            {this.props.counter}
          </Text>
          <TouchableOpacity onPress={() => this.props.decrease()}>
            <Text style={{ fontSize: 24, color: "black" }}>Decrease</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increase: () => dispatch({ type: "INCREASE" }),
    decrease: () => dispatch({ type: "DECREASE" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterApp);
