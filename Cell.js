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

export default class Cell extends React.Component<Props, State> {
  state = {
    pressAnimation: new Animated.Value(0),
    appearingAnimation: new Animated.Value(0),
    visible: false
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

  componentWillUpdate = (props, state) => {
    if ((props.tic || props.tac) && !this.state.visible) {
      Animated.timing(this.state.appearingAnimation, {
        toValue: 1,
        duration: 150
      }).start(() => {
        this.state.visible = true;
      });
    }

    if (this.state.visible && !(props.tic || props.tac)) {
      Animated.timing(this.state.appearingAnimation, {
        toValue: 0,
        duration: 150
      }).start(() => {
        this.state.visible = false;
      });
    }
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
            <Animated.Image
              resizeMode="contain"
              source={cross}
              style={{
                ...styles.image,
                transform: [
                  {
                    scale: this.state.appearingAnimation.interpolate({
                      inputRange: [0, 0.8, 1],
                      outputRange: [0, 1.2, 1]
                    })
                  }
                ]
              }}
            />
          )}
          {this.props.tac && (
            <Animated.Image
              resizeMode="contain"
              source={ou}
              style={{
                ...styles.image,
                transform: [
                  {
                    scale: this.state.appearingAnimation.interpolate({
                      inputRange: [0, 0.8, 1],
                      outputRange: [0, 1.2, 1]
                    })
                  }
                ]
              }}
            />
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
