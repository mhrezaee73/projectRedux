import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import * as Actions from "../actions/Actions";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "aqua",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch"
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#11fa11",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
          onPress={() =>
            this.props.dispatch({
              type: Actions.Increment,
              step: +this.state.step
            })
          }
        >
          <Text style={{ textAlign: "center", fontSize: 40, color: "black" }}>
            +
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 50, color: "black" }}>
            {this.props.Count}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#11fa11",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
          onPress={() =>
            this.props.dispatch({
              type: Actions.Decrement,
              step: +this.state.step
            })
          }
        >
          <Text style={{ textAlign: "center", fontSize: 40, color: "black" }}>
            -
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch"
          }}
        >
          <TextInput
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 25,
              alignSelf: "stretch"
            }}
            value={String(this.state.step)}
            onChangeText={step => this.setState({ step })}
            defaultValue={String(1)}
            keyboardType="decimal-pad"
            keyboardAppearance="dark"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProp = state => {
  return {
    Count: state.Reducer.Count
  };
};

export default connect(mapStateToProp)(Counter);
