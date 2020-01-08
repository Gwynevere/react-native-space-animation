import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const { block, cond, eq, or, add, diff, and, lessThan, call, multiply, abs, set, Value, Clock, event, lessOrEq, greaterOrEq, divide, stopClock, startClock } = Animated;

const POSITION_THRESHOLD = 1;
const VELOCITY = 100;

export default class SpaceII extends React.Component {

  opacity = new Value(1)
  radius = new Value(38)
  posX = new Value(0)
  offsetX = new Value(0)
  gestureState = new Value(State.UNDETERMINED)

  onHandlerStateChange = event([{
    nativeEvent: {
      state: this.gestureState,
    },
  }])

  onGestureEvent = event([{
    nativeEvent: {
      translationX: this.offsetX,
    },
  }])

  opacityValue = cond(
    or(
      eq(this.gestureState, State.END),
      eq(this.gestureState, State.CANCELLED),
      eq(this.gestureState, State.UNDETERMINED),
    ),
    set(this.opacity, 1),
    set(this.opacity, 0.8)
  )

  calculateOffset = cond(
    or(
      lessOrEq(this.offsetX, 20),
      greaterOrEq(this.offsetX, -20)
    ),
    divide(this.offsetX, 1),
    divide(this.offsetX, 1)
  )

  translateXBy = cond(
    or(
      eq(this.gestureState, State.ACTIVE),
      eq(this.gestureState, State.BEGAN),
    ),
    add(this.posX, this.calculateOffset),
    set(this.posX, add(this.posX, this.offsetX))
  )

  radiusValue = cond(
    or(
      eq(this.gestureState, State.ACTIVE),
      eq(this.gestureState, State.BEGAN),
    ),
    add(this.radius, 4),
    this.radius
  )

  stopWhenNeeded = (dt, position, velocity, clock) => {
    return cond(
      and(
        lessThan(position, POSITION_THRESHOLD),
        lessThan(-POSITION_THRESHOLD, position)
      ),
      [
        stopClock(clock),
        set(velocity, 0),
        set(position, 0),
      ]
    );
  }

  velocityOverTime = (velocity, position, dt) => {
    return 0;
  }

  force = (dt, position, velocity) => {
    return set(velocity, cond(lessThan(position, 0), VELOCITY, -VELOCITY));
  }

  interaction = (gestureTranslation, gestureState) => {
    const start = new Value(0);
    const dragging = new Value(0);
    const position = new Value(0);
    const velocity = new Value(0);
    const clock = new Clock();
    const dt = divide(diff(clock), 1000);

    return block([
      cond(
        or(eq(gestureState, State.ACTIVE), eq(gestureState, State.BEGAN)),
        stopClock(clock),
        [
          cond(eq(gestureState, State.END), startClock(clock)),
          this.force(dt, position, velocity),
          this.stopWhenNeeded(dt, position, velocity, clock),
          cond(set(position, add(position, multiply(velocity, dt)))),
        ]
      ),
      cond(
        eq(gestureState, State.ACTIVE),
        [
          cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
          set(position, add(start, gestureTranslation)),
        ],
        [
          set(dragging, 0),
          position,
        ]
      ),
    ]);
  }

  /*cond(
    eq(gestureState, State.ACTIVE),
  [
    stopClock(clock),
  cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
  set(position, add(start, gestureTranslation)),
],
  [
    cond(eq(gestureState, State.UNDETERMINED), startClock(clock),),
  set(dragging, 0),
  this.force(dt, position, velocity),
  this.stopWhenNeeded(dt, position, velocity, clock),
  set(position, add(position, multiply(velocity, dt))),
]
),*/
  translateXByAlternative = this.interaction(this.offsetX, this.gestureState)

  render () {
    return (
      <View style={styles.container}>
        <PanGestureHandler
          maxPointers={1}
          minDist={10}
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onHandlerStateChange}>
          <Animated.View
            style={[
              styles.box,
              {
                height: this.radiusValue,
                width: this.radiusValue,
                borderRadius: this.radiusValue,
                opacity: this.opacityValue,
                transform: [
                  {
                    translateX: this.translateXByAlternative,
                  },
                ],
              },
            ]}
          >
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const CIRCLE_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'tomato',
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: '#000',
  },
});
