import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { addTodo } from "../actions";

class AddTodo extends Component {
  state = {
    text: ""
  };

  addMyTodo = text => {
    this.props.add(text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder="Eg. Create New Video"
          style={{
            borderWidth: 1,
            borderColor: "#f2f2e1",
            backgroundColor: "#eaeaea",
            height: 50,
            flex: 1,
            padding: 8
          }}
        />
        <TouchableOpacity onPress={() => this.addMyTodo(this.state.text)}>
          <View
            style={{
              height: 50,
              backgroundColor: "#eaeaea",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon
              name="md-add"
              size={30}
              style={{ color: "#de9595", padding: 10 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  add: text => dispatch(addTodo(text))
});

export default connect(
  null,
  mapDispatchToProps
)(AddTodo);
