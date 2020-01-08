import React, {PureComponent} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import BlueFlame from "./blue_flame";

export default class Thrust extends PureComponent {
	render() {
		return <>
			<BlueFlame x={this.props.x}
			           y={this.props.y}
			           size={this.props.size}/>
			<BlueFlame x={this.props.x + 10}
			           y={this.props.y + 3}
			           size={this.props.size - 6}/>
			<BlueFlame x={this.props.x + 20}
			           y={this.props.y + 6}
			           size={this.props.size - 12}/>
		</>
	}
}

const styles = StyleSheet.create({
	blue_flame: {
		position: 'absolute',
	}
});
