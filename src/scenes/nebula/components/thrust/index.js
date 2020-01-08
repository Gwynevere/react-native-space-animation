import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import ThrustVector from './thrust_vector';
import { NUMBER_OF_VECTORS, random, sum, VECTOR_SIZE_RANGE, VECTORS_FREE_SPACE_AROUND } from '../../Utils';

export default class Thrust extends PureComponent {

  renderThrustVectors = () => {
    const vectors_initial_size = [];

    for (let i = 0; i < NUMBER_OF_VECTORS; i++) {
      const initialLength = random(VECTOR_SIZE_RANGE.length[0], VECTOR_SIZE_RANGE.length[1]);
      const initialAmplitude = random(VECTOR_SIZE_RANGE.amplitude[0], VECTOR_SIZE_RANGE.amplitude[1]);
      vectors_initial_size.push({
        initialLength,
        initialAmplitude,
      });
    }

    return vectors_initial_size.map(
      (vector, index) => {
        let y = this.props.y;

        y += VECTORS_FREE_SPACE_AROUND * index;

        return <ThrustVector initialLength={vector.initialLength}
                             clock={this.props.clock}
                             initialAmplitude={vector.initialAmplitude}
                             x={this.props.x}
                             y={y}
        />;
      }
    );
  }

  render () {
    const thrustVectors = this.renderThrustVectors();

    return (
      <View style={styles.container}>
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
