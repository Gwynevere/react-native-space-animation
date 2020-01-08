import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const { block, cond, eq, or, add, diff, and, lessThan, call, multiply, abs, set, timing, Value, Clock, event, lessOrEq, greaterOrEq, divide, stopClock, startClock } = Animated;

export default class Rotation extends React.Component {

  clock = new Clock()
  teta = new Value(0)

  rotation = block([
    set(
      this.teta,
      divide(diff(this.clock), 1000)
    ),
    this.teta,
  ])

  render () {
    return (
      <View style={styles.container}>
        <Animated.Code exec={
          block([
            startClock(this.clock),
          ])
        }/>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                {
                  rotate: this.rotation,
                },
              ],
            },
          ]}
        >
        </Animated.View>
      </View>
    );
  }
}

const BOX_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'tomato',
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderColor: '#000',
  },
});
