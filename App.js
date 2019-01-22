/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Image
} from "react-native";
import Button from "./Button";

const cross = require("./assets/images/cross.png");
const ou = require("./assets/images/ou.png");

const EMPTY = -1;
const TIC = 0;
const TAC = 1;

const initialState = [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY]
];

type Props = {};
export default class App extends React.Component<Props> {
  state = {
    battleField: initialState,
    currentPlayer: TIC
  };

  setMark = (row, column, mark) => {
    if (this.state.battleField[row][column] !== EMPTY) {
      Alert.alert("meh..");
      return;
    }
    this.state.battleField[row][column] = mark;
    this.setState({
      currentPlayer: this.state.currentPlayer === TIC ? TAC : TIC
    });

    this.checkWinner();
  };

  checkWinner = () => {
    const { battleField } = this.state;
    const checkFor = player => {
      for (let i = 0; i < 3; ++i) {
        if (
          player === battleField[i][0] &&
          player === battleField[i][1] &&
          player === battleField[i][2]
        ) {
          return true;
        }
      }
      for (let i = 0; i < 3; ++i) {
        if (
          player === battleField[0][i] &&
          player === battleField[1][i] &&
          player === battleField[2][i]
        ) {
          return true;
        }
      }

      return false;
    };

    if (checkFor(TIC)) {
      Alert.alert("TIC WON");
    }

    if (checkFor(TAC)) {
      Alert.alert("TAC WON");
    }
  };

  render = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontFamily: "Rubik",
            fontSize: 24,
            fontWeight: "bold"
          }}
        >
          TIC ... TAC
        </Text>
      </View>
      <View style={styles.body}>
        {[0, 1, 2].map(column => (
          <View key={`row-${column}`} style={styles.row}>
            {[0, 1, 2].map(row => (
              <Button
                key={`item-${column}-${row}`}
                tic={this.state.battleField[row][column] === TIC}
                tac={this.state.battleField[row][column] === TAC}
                onPress={() =>
                  this.setMark(row, column, this.state.currentPlayer)
                }
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        {this.state.currentPlayer === TIC && (
          <Image
            resizeMode="contain"
            source={cross}
            style={{
              width: 80,
              height: 80
            }}
          />
        )}
        {this.state.currentPlayer === TAC && (
          <Image
            resizeMode="contain"
            source={ou}
            style={{
              width: 80,
              height: 80
            }}
          />
        )}
        <Text
          style={{
            fontFamily: "Rubik",
            fontSize: 18,
            fontWeight: "300",
            marginTop: 20
          }}
        >
          Now Playing
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15
  },
  body: {
    flex: 2,
    alignSelf: "stretch",
    flexDirection: "column",
    maxHeight: Dimensions.get("window").height / 2
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  header: {
    paddingTop: 80,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
