import React, {PureComponent} from 'react';
import {StyleSheet, InteractionManager, Dimensions} from 'react-native';

import Images from '../../../../../res/images';
import Thrust from "./thrust";
import SpaceShip from "./space_ship";

export default class VoyagerOne extends PureComponent {

	static defaultProps = {
		shipSize: 120,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	};

	state = {
		width: null,
		height: null,
		spaceship_x_coord: null,
		spaceship_y_coord: null,
		shipSize: null,
		ready: false
	};

	init = async () => {
		const width = this.props.width;
		const height = this.props.height;
		const shipSize = this.props.shipSize;

		const spaceship_x_coord = (width / 2) - shipSize / 2;
		const spaceship_y_coord = (height / 2) - shipSize / 2;

		const ready = true;

		this.setState({
			width,
			height,
			shipSize,
			spaceship_x_coord,
			spaceship_y_coord,
			ready
		})
	};

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => this.init());
	}

	componentDidUpdate(prevProps, prevState, snapshot): void {
		if (
			prevProps.shipSize !== this.props.shipSize ||
			prevProps.width !== this.props.width ||
			prevProps.height !== this.props.height
		)
			this.init();
	}

	render() {
		if (!this.state.ready)
			return null;
		return <>
			<SpaceShip x={this.state.spaceship_x_coord}
			           y={this.state.spaceship_y_coord}
			           size={this.state.shipSize}
			/>
			<Thrust x={this.state.spaceship_x_coord}
			        y={this.state.spaceship_y_coord}
			        size={this.state.shipSize}
			/>
		</>
	}
}

const styles = StyleSheet.create({});
