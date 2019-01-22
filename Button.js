// @flow
import React from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { Image, View, Text, StyleSheet } from "react-native";

type Props = {
  onPress?: () => void,
  tic: boolean,
  tac: boolean
};

type State = {
  pressAnimation: any
};

const cross = require("./assets/images/cross.png");
const ou = require("./assets/images/ou.png");

export default class Button extends React.Component<Props, State> {
  state = {
    pressAnimation: new Animated.Value(0)
  };

  onPressIn = () => {
    if (this.props.disabled) return;
    Animated.spring(this.state.pressAnimation, {
      toValue: 30,
      speed: 100
    }).start();
  };

  onPressOut = () => {
    if (this.props.disabled) return;
    Animated.spring(this.state.pressAnimation, {
      toValue: 0,
      speed: 100
    }).start();
  };

  onPress = () => {
    if (this.props.disabled || !this.props.onPress) return;
    this.props.onPress();
  };

  render = () => (
    <Animated.View
      style={{
        flex: 1,
        padding: 10,
        transform: [
          {
            scale: this.state.pressAnimation.interpolate({
              inputRange: [0, 30],
              outputRange: [1, 0.9]
            })
          }
        ]
      }}
    >
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
      >
        <View style={styles.imageContainer}>
          {this.props.tic && (
            <Image resizeMode="contain" source={cross} style={styles.image} />
          )}
          {this.props.tac && (
            <Image resizeMode="contain" source={ou} style={styles.image} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
