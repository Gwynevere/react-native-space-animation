import Animated, { Easing } from 'react-native-reanimated';
import { random } from './index';

const { cond, call, timing, spring, Clock, Extrapolate, set, block, stopClock, Value, interpolate, eq, or, startClock, clockRunning, debug } = Animated;

export default class Animator {

  init = (
    {
      min_value,
      max_value,
      starting_value,
      min_duration,
      max_duration,
      clock,
    },
    duration,
  ) => {
    this.min_value = min_value;
    this.max_value = max_value;
    this.starting_value = starting_value;
    this.min_duration = min_duration;
    this.max_duration = max_duration;
    this.clock = clock;

    if (duration) {
      this.duration = duration;
    } else {
      this.duration = random(min_duration, max_duration);
    }

  }

  extend_animation = (exec_stack = ({ position }) => position) => {
    const { min_value, max_value, starting_value, clock, duration } = this;
    let state = {
      finished: new Value(0),
      position: new Value(starting_value ? starting_value : min_value),
      time: new Value(0),
      frameTime: new Value(0),
    };
    let config = {
      duration: new Value(duration),
      toValue: new Value(max_value),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      timing(clock, state, config),
      cond(
        state.finished,
        [
          set(state.finished, 0),
          cond(
            eq(state.position, max_value),
            set(config.toValue, min_value),
            set(config.toValue, max_value)
          ),
          set(state.time, 0),
          set(state.frameTime, 0),
        ]
      ),
      exec_stack({
        position: state.position,
        min_value,
        max_value,
        starting_value,
        clock,
        duration,
      }),
    ]);
  }

}
