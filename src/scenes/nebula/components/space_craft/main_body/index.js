import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';

import Images from '../../../../../../res/images';
import AnimationContext from '../../../context';

const { View: AnimatedView } = Animated;

export default class MainBody extends PureComponent {
  static contextType = AnimationContext

  render () {

    const { ship_size, coordinates: { x0, y0 }, animated_x, animated_y } = this.context;

    const size = {
      width: scale(ship_size),
    };

    const position = {
      position: 'absolute',
      left: x0 - ship_size / 2,
      top: y0 - ship_size / 2,
    };

    return <AnimatedView style={[styles.top_layer, position]}>
      <Image source={Images.spaceCraft} style={[styles.ship, styles.top_layer, size]}/>
    </AnimatedView>;
  }
}

const styles = StyleSheet.create({
  top_layer: {
    zIndex: 999,
  },
  ship: {
    resizeMode: 'contain',
  },
});
