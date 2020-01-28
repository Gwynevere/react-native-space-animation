import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import Images from '../../../../../res/images';
import Thrust from '../thrust';

const { width, height } = Dimensions.get('window');
const image_size = 72;
const { cond, call, timing, Clock, Extrapolate, set, block, stopClock, Value, interpolate, eq, or, startClock, clockRunning, debug } = Animated;

export default class SpaceCraft extends PureComponent {

  coordinates = {
    y: height / 2 - image_size / 2,
    x: width / 2 - image_size / 2,
  }

  render () {
    const position = {
      top: this.coordinates.y,
      left: this.coordinates.x,
    };

    return <View style={styles.main}>
      <Image source={Images.spaceCraft} style={[styles.ship, position]}/>
      <Thrust clock={this.props.clock}
              x={this.coordinates.x + 14}
              y={this.coordinates.y - (image_size / 2) - (image_size / 4.4)}/>
    </View>;
  }
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
  },
  ship: {
    width: scale(image_size),
    resizeMode: 'contain',
    zIndex: 999,
  },
});
