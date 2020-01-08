import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { random, VECTOR_SIZE_RANGE } from '../../../Utils';

const { cond, call, timing, Clock, Extrapolate, set, block, stopClock, Value, interpolate, eq, or, startClock, clockRunning, debug } = Animated;

export default class Thrust extends PureComponent {
  duration = random(0.2, 1.2, false) * 1000

  runPosXTimer = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(this.props.x),
      time: new Value(0),
      frameTime: new Value(0),
    };
    const config = {
      duration: this.duration,
      toValue: new Value(this.props.x - VECTOR_SIZE_RANGE.length[1]),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          set(state.position, this.props.x),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      state.position,
    ]);
  }

  runForceLengthTimer = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(this.props.initialLength),
      time: new Value(0),
      frameTime: new Value(0),
    };
    const config = {
      duration: this.duration,
      toValue: new Value(VECTOR_SIZE_RANGE.length[1]),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          set(state.position, VECTOR_SIZE_RANGE.length[0]),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      state.position,
    ]);
  }

  render () {
    const animatedStyle = {
      top: this.props.y,
      left: this.runPosXTimer(this.props.clock),
      width: this.runForceLengthTimer(this.props.clock),
      height: this.props.initialAmplitude,
      borderRadius: this.props.initialAmplitude / 2,
    };

    return (
      <Animated.View style={[styles.thrustVector, animatedStyle]}/>
    );
  }
}

const styles = StyleSheet.create({
  thrustVector: {
    backgroundColor: '#82ADA9',
  },

});
