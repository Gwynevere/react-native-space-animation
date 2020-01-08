import React, {PureComponent} from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { random } from '../../Utils';

const { cond, call, timing, Clock, Extrapolate, set, block, stopClock, Value, interpolate, eq, or, startClock, clockRunning, debug } = Animated;

export default class Star extends PureComponent {

  static defaultProps = {
    radius: [0.4, 1.6],
  }

  clock = new Clock()
  clockII = new Clock()
  duration = random(40, 50, false) * 1000

  runPosXTimer = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(this.props.x),
      time: new Value(0),
      frameTime: new Value(0),
    };
    const config = {
      duration: this.duration,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          set(state.position, this.props.width),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      state.position,
    ]);
  }

  runPosYTimer = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(this.props.y),
      time: new Value(0),
      frameTime: new Value(0),
    };
    const config = {
      duration: this.duration,
      toValue: new Value(this.props.y + this.props.dy),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          set(state.position, this.props.y),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      state.position,
    ]);
  }
  runSizeTime = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };
    const config = {
      duration: 5000,
      toValue: new Value(1),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          stopClock(clock),
          set(state.finished, 0),
          set(state.position, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          startClock(clock),
        ]
      ),
      interpolate(state.position, {
        inputRange: [0, 1],
        outputRange: [1, this.props.radius],
        extrapolate: Extrapolate.CLAMP,
      }),
    ]);
  }

  runOpacityTimer = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };
    const config = {
      duration: random(4, 8, true) * 1000,
      toValue: new Value(1),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      cond(
        clockRunning(clock),
        [],
        [
          startClock(clock),
        ]
      ),
      timing(clock, state, config),
      cond(
        state.finished,
        [
          stopClock(clock),
          set(state.finished, 0),
          set(state.position, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          startClock(clock),
        ]
      ),
      state.position,
    ]);
  }

  render () {
    const radius = random(this.props.radius[0], this.props.radius[1], false);
    const animatedStyle = {
      top: this.runPosYTimer(this.props.clock),
      left: this.runPosXTimer(this.props.clock),
      width: radius,
      height: radius,
      borderRadius: radius,
      opacity: 1,
    };

    return (
      <>
        <Animated.View style={[styles.container, animatedStyle]}/>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,255)',
  },
});
