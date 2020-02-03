import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import ThrustVector from './thrust_vector';
import AnimationContext from '../../../context';
import { NUMBER_OF_THRUST_LINES, THRUST_LINE, random } from '../../../Utils';

export default class Propulsion extends PureComponent {

  static contextType = AnimationContext

  render_thrust_vectors = () => {
    let { coordinates: { x0, y0 }, ship_size, animated_x, animated_y, clock } = this.context;
    const thrust_lines = [];
    x0 = x0 - ship_size / 3;
    y0 = y0 + 10;

    for (let i = 0; i < NUMBER_OF_THRUST_LINES; i++) {
      const initialHeight = random(THRUST_LINE.height[0], THRUST_LINE.height[1], false);
      const initialLength = random(THRUST_LINE.length[0], THRUST_LINE.length[1], false);
      const initialRadius = random(THRUST_LINE.radius[0], THRUST_LINE.radius[1], false);
      thrust_lines.push({
        initialHeight,
        initialLength,
        initialRadius,
      });
    }

    let all_vectors_height = 0;

    for (let i = 0; i < thrust_lines.length; i++) {
      all_vectors_height += thrust_lines[i].initialHeight;
    }

    const initial_y = y0 - (all_vectors_height / 2);

    return thrust_lines.map(
      (tl, index) => {
        let y = initial_y;

        for (let i = 0; i < thrust_lines.length; i++) {
          if (i < index) {y += thrust_lines[i].initialHeight;}
        }

        return <ThrustVector clock={clock}
                             initialHeight={tl.initialHeight}
                             initialLength={tl.initialLength}
                             initialRadius={tl.initialRadius}
                             x={x0}
                             y={y}
        />;
      }
    );
  }

  render () {
    return (
      <View style={[
        styles.container]}>
        {this.render_thrust_vectors()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});
