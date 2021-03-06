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
  Image,
  Animated
} from "react-native";
import Cell from "./Cell";

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
type State = {
  battleField: Array<Array<EMPTY | TIC | TAC>>,
  currentPlayer: TIC | TAC
};
export default class App extends React.Component<Props, State> {
  state = {
    battleField: [...initialState],
    currentPlayer: TIC,
    currentPlayerAnimation: new Animated.Value(1)
  };

  setMark = (row: number, column: numeber, mark: TIC | TAC) => {
    // If the user clicks on the cell that already taken
    if (this.state.battleField[row][column] !== EMPTY) {
      Alert.alert("meh..");
      return;
    }

    // Marking the clicked cell
    this.state.battleField[row][column] = mark;
    this.setState({});

    if (!this.checkWinner()) {
      Animated.timing(this.state.currentPlayerAnimation, {
        toValue: 0,
        duration: 150
      }).start(() => {
        this.setState(
          {
            currentPlayer: this.state.currentPlayer === TIC ? TAC : TIC
          },
          () => {
            Animated.timing(this.state.currentPlayerAnimation, {
              toValue: 1,
              duration: 150
            }).start();
          }
        );
      });
    }
  };

  checkWinner = () => {
    const { battleField } = this.state;
    const ifEnded = () => {
      for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
          if (battleField[i][j] === EMPTY) {
            return false;
          }
        }
      }
      return true;
    };

    const checkFor = player => {
      // let's make this stupid
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

      if (
        player === battleField[0][0] &&
        player === battleField[1][1] &&
        player === battleField[2][2]
      ) {
        return true;
      }

      if (
        player === battleField[0][2] &&
        player === battleField[1][1] &&
        player === battleField[2][0]
      ) {
        return true;
      }

      return false;
    };

    // OMG, so much duplicated code, but who cares
    if (checkFor(TIC)) {
      Alert.alert(
        "X WON",
        "Congrats, yo!",
        [{ text: "Reset Game", onPress: this.resetGame }],
        { cancelable: false }
      );
      return true;
    }

    if (checkFor(TAC)) {
      Alert.alert(
        "O WON",
        "Congrats, yo!",
        [{ text: "Reset Game", onPress: this.resetGame }],
        { cancelable: false }
      );
      return true;
    }

    if (ifEnded()) {
      Alert.alert(
        "Oh no..",
        "The game is over",
        [{ text: "Reset Game", onPress: this.resetGame }],
        { cancelable: false }
      );
      return true;
    }
  };

  resetGame = () => {
    this.setState({
      battleField: [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
      ],
      currentPlayer: TIC
    });
  };

  render = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TIC ... TAC</Text>
      </View>
      <View style={styles.body}>
        {[0, 1, 2].map(column => (
          <View key={`row-${column}`} style={styles.row}>
            {[0, 1, 2].map(row => (
              <Cell
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
        <Animated.Image
          resizeMode="contain"
          source={this.state.currentPlayer === TIC ? cross : ou}
          style={{
            ...styles.footerImage,
            opacity: this.state.currentPlayerAnimation
          }}
        />
        <Text style={styles.footerText}>Now Playing</Text>
      </View>
    </View>
  );
}

const isIphoneX = () => {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      (dimen.height === 896 || dimen.width === 896))
  );
};

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
    flexDirection: "column"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  header: {
    paddingTop: isIphoneX() ? 80 : 40,
    paddingBottom: isIphoneX() ? 40 : 20,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 24,
    fontWeight: "bold"
  },
  footer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  footerImage: {
    width: 80,
    height: 80
  },
  footerText: {
    fontFamily: "Rubik",
    fontSize: 18,
    fontWeight: "300",
    marginTop: 20
  }
});
