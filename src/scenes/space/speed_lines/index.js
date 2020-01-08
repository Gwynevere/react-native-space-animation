import React, {PureComponent} from 'react';
import {Dimensions, InteractionManager, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

import SpeedLine from './speed_line';


export default class SpeedLines extends PureComponent {

	static defaultProps = {
		number_of_speedLines: 64
	};

	state = {
		speedLines: null,
		ready: false
	};

	init = async () => {
		const speedLines = [];

		for (let i = 0; i < this.props.number_of_speedLines; i++) {
			speedLines.push(<SpeedLine/>)
		}

		this.setState({
			ready: true,
			speedLines: speedLines.map(el => el)
		});
	};

	componentDidMount() {
		this.init();
	}

	componentDidUpdate(prevProps, prevState, snapshot): void {
		if (prevProps.lines !== this.props.lines)
			this.init();
	}

	render() {
		if (!this.state.ready)
			return null;
		return this.state.speedLines;
	}

}

const styles = StyleSheet.create({
	main: {
		borderRadius: scale(8),
		width: scale(2)
	}
});
