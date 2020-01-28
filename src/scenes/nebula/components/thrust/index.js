import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import ThrustVector from './thrust_vector';
import { NUMBER_OF_THRUST_LINES, THRUST_LINE, random } from '../../Utils';

export default class Thrust extends PureComponent {

  renderThrustVectors = () => {
    const thrust_lines = [];

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

    for (let i; i < thrust_lines.length; i++) {
      all_vectors_height += thrust_lines[i].initialHeight;
    }

    const initial_y = this.props.y - (all_vectors_height / 2);

    return thrust_lines.map(
      (tl, index) => {
        let y = initial_y;

        for (let i = 0; i < thrust_lines.length; i++) {
          if (i < index) {y += thrust_lines[i].initialHeight;}
        }

        return <ThrustVector clock={this.props.clock}
                             initialHeight={tl.initialHeight}
                             initialLength={tl.initialLength}
                             initialRadius={tl.initialRadius}
                             x={this.props.x}
                             y={y}
        />;
      }
    );
  }

  render () {
    const thrustVectors = this.renderThrustVectors();

    return (
      <View style={[
        styles.container]}>
        {thrustVectors}
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
