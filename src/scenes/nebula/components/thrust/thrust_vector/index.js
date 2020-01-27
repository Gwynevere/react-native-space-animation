import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { random, THRUST_LINE, ANGLE_OF_THRUST } from '../../../Utils';

const { cond, call, timing, Clock, Extrapolate, set, block, stopClock, Value, interpolate, eq, or, startClock, clockRunning, debug } = Animated;

export default class Thrust extends PureComponent {
  duration = random(50, 100, false)
  line_color = THRUST_LINE.colors[random(0, 11).toString()]
  circle_color = THRUST_LINE.colors[random(0, 11).toString()]

  runThrustLineXTime = (clock, x) => {
    x = x + this.props.initialLength;

    const state = {
      finished: new Value(0),
      position: new Value(x),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: this.duration,
      toValue: new Value(x - THRUST_LINE.length[1]),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          cond(
            eq(state.position, x - THRUST_LINE.length[1]),
            [
              set(config.toValue, x - THRUST_LINE.length[0]),
            ], [
              set(config.toValue, x - THRUST_LINE.length[1]),
            ],
          ),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      state.position,
    ]);
  }

  runThrustLinelengthTime = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(this.props.initialLength),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: this.duration,
      toValue: new Value(THRUST_LINE.length[1]),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          cond(
            eq(state.position, THRUST_LINE.length[1]),
            [
              set(config.toValue, THRUST_LINE.length[0]),
            ], [
              set(config.toValue, THRUST_LINE.length[1]),
            ],
          ),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      state.position,
    ]);
  }

  runThrustCircleRadiusTimer = (clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(this.props.initialRadius),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: this.duration,
      toValue: new Value(THRUST_LINE.radius[1]),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          cond(
            eq(state.position, THRUST_LINE.radius[1]),
            [
              set(config.toValue, THRUST_LINE.radius[0]),
            ], [
              set(config.toValue, THRUST_LINE.radius[1]),
            ],
          ),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      state.position,
    ]);
  }

  render () {
    const x = this.props.x - this.props.initialLength;
    const y = this.props.y;
    const circle_x = x - THRUST_LINE.radius[0] / 2;
    const circle_y = this.props.y - THRUST_LINE.radius[0] / 2;

    const animatedStyleThrustLine = {
      backgroundColor: this.circle_color,
      position: 'absolute',
      top: y,
      left: this.runThrustLineXTime(this.props.clock, x),
      width: this.runThrustLinelengthTime(this.props.clock),
      height: this.props.initialHeight,
    };

    const animatedStyleCircle = {
      backgroundColor: this.circle_color,
      position: 'absolute',
      top: circle_y,
      left: this.runThrustLineXTime(this.props.clock, circle_x),
      height: this.runThrustCircleRadiusTimer(this.props.clock),
      width: this.runThrustCircleRadiusTimer(this.props.clock),
      borderRadius: this.runThrustCircleRadiusTimer(this.props.clock),
    };

    return <View>
      <Animated.View style={[animatedStyleThrustLine]}/>
      <Animated.View style={[animatedStyleCircle, styles.circle]}/>
    </View>;
  }
}

const styles = StyleSheet.create({
  circle: {
    zIndex: 999,
  },
});
