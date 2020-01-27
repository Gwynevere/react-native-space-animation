import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { ANGLE_OF_THRUST, random } from '../../Utils';
import Star from '../star';

const { Clock, startClock, block, Value, cond, eq, stopClock, timing } = Animated;
const { width, height } = Dimensions.get('window');

export default class Nebula extends PureComponent {

  star = {
    x: 'x',
    y: 'y',
    zLevel: 'lvl',
  }

  state = {
    stars: null,
  }

  clock_timeout = new Clock()
  clock = this.props.clock

  run_timer = () => {
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
      startClock(this.clock_timeout),
      timing(this.clock_timeout, state, config),
      cond(
        state.finished,
        block([
          stopClock(this.clock_timeout),
          startClock(this.clock),
        ])
      ),
    ]);
  }

  calculate_dy = (x, y) => {
    return Math.tan(ANGLE_OF_THRUST * Math.PI / 180) * x;
  }

  cluster = () => {
    const length = random(120, 130);
    const starsCoordinates = [];

    for (let i = 0; i < length; i++) {
      let x = random(0, width - 8, true);
      let y = random(0, height - 8, true);

      starsCoordinates.push({
        x,
        y,
        dy: this.calculate_dy(x, y),
      });
    }

    return starsCoordinates;
  }

  init = async => {
    this.setState({
      stars: this.cluster().map(
        (coordinate, index) => (
          <Star x={coordinate.x}
                y={coordinate.y}
                dy={coordinate.dy}
                key={index + ''}
                animate={coordinate.animate}
                clock={this.clock}
                width={width}
                height={height}/>
        )
      ),
    });
  }

  componentDidMount () {
    this.init();
  }

  renderContent = () => {
    if (this.state.stars) {
      return this.state.stars;
    }
    return <Text style={styles.text}>loading...</Text>;
  }

  render () {
    return (
      <View style={styles.container}>
        <Animated.Code exec={
          this.run_timer()
        }/>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});
