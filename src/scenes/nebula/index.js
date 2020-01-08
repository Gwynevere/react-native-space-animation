import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Cluster from './components/stars_cluster';
import SpaceCraft from './components/space_craft';
import Animated from 'react-native-reanimated';

const { Clock } = Animated;

export default class Nebula extends PureComponent {

  clock = new Clock()

  render () {
    return (
      <View style={styles.container}>
        <Cluster clock={this.clock}/>
        <SpaceCraft clock={this.clock}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,255)',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});
