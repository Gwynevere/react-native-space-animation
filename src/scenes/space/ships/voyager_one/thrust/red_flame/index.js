import React, {PureComponent} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

export default class RedFlame extends PureComponent {

	static defaultProps = {
		rotationAngle: 15,
	};

	render() {
		return null;
	}
}

const styles = StyleSheet.create({
	thrust_line: {
		position: 'absolute'
	}
});
