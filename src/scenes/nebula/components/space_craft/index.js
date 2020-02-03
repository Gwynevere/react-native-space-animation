import React, { PureComponent } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import Propulsion from './propulsion';
import MainBody from './main_body';
import { random } from '../../Utils';
import Animator from '../../Utils/animator';
import { AnimationProvider } from '../../context';

const { width, height } = Dimensions.get('window');
const ship_size = 72;

export default class SpaceCraft extends PureComponent {

  coordinates = {
    y0: height / 2,
    x0: width / 2,
  }

  animator_x = new Animator().init({
      min_value: this.coordinates.x0 - 10,
      max_value: this.coordinates.x0 + 10,
      clock: this.props.clock,
    },
    random(400, 800)
  )
  animator_y = new Animator().init({
      min_value: this.coordinates.y0 - 20,
      max_value: this.coordinates.y0 + 20,
      clock: this.props.clock,
    },
    random(400, 800)
  )

  ctx = {
    clock: this.props.clock,
    coordinates: this.coordinates,
    ship_size,
    animated_x: (exec_stack) => this.animator_x.extend_animation(exec_stack),
    animated_y: (exec_stack) => this.animator_y.extend_animation(exec_stack),
  }

  render () {
    return <View style={styles.main}>
      <AnimationProvider value={this.ctx}>
        <MainBody/>
        <Propulsion/>
      </AnimationProvider>
    </View>;
  }
}

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
  },
});
