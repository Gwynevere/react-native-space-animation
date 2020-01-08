import React, {PureComponent} from 'react';
import {StyleSheet, View, Animated, Text, Dimensions, InteractionManager} from 'react-native';

import Star from './star';
import {random} from '../Utils';


export default class Stars extends PureComponent {

	static defaultProps = {
		starsCoverage: 1,
		trueStarsColors: false,
		spaceClouds: false,
		fadeAnimationDuration: 2000,
		dimensions: {
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
		},
	};

	state = {
		stars: null,
	};

	calculateXYCoordinates = (xMax, yMax) => {
		const squareSize = 20;
		const grid_x_Length = xMax / squareSize;
		const grid_y_Length = yMax / squareSize;
		const coordinates = [];

		for (let grid_y_index = 0; grid_y_index < grid_y_Length; grid_y_index++) {
			for (let grid_x_index = 0; grid_x_index < grid_x_Length; grid_x_index++) {
				let toAnimate = [random(0, 6), random(0, 6)];
				for (let position_index = 0; position_index < random(0, 6); position_index++) {
					const x_zero = squareSize * grid_x_index;
					const y_zero = squareSize * grid_y_index;

					coordinates.push({
						x: x_zero + random(0, grid_x_Length) + position_index,
						y: y_zero + random(0, grid_y_Length) + position_index,
						animate: false, /*toAnimate.includes(position_index)*/
					});
				}
			}
		}

		return coordinates;
	};

	init = async () => {
		const width = Dimensions.get('window').width, height = Dimensions.get('window').height;

		const coordinates = this.calculateXYCoordinates(width, height);

		this.setState({
			stars: coordinates.map((coords, index) => {
				if (coords.x <= width && coords.y <= height)
					return <Star x={coords.x}
					             y={coords.y}
					             key={coords.x.toString().concat(coords.y.toString()).concat(index.toString())}
					             animate={coords.animate}
					/>;
				return null;
			}),
		});
	};

	componentDidMount() {
		this.init();
	}

	render() {
		if (this.state.stars)
			return <>
				{this.state.stars}
			</>;
		return <Text style={{color: 'white', fontSize: 20}}>Loading ...</Text>;
	}
}

const styles = StyleSheet.create({
	main: {}
});
