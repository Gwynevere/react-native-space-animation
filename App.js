/**
 * Space travel React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import Nebula from './src/scenes/nebula';

const App: () => React$Node = () => {
  return (
    <View style={styles.main}>
      <Nebula />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default App;
