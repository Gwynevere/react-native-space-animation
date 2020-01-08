import React, {PureComponent} from 'react';
import {StyleSheet, View, Animated, Image, Dimensions} from 'react-native';

import Images from '../../../../../../res/images';

export default class SpaceShip extends PureComponent {

	render() {
		return <>
			<Image source={Images.SpaceShipII}
			       style={[styles.ship,
				       {
					       left: this.props.x,
					       top: this.props.y,
					       height: this.props.size,
					       width: this.props.size
				       }]}/>
		</>
	}
}

const styles = StyleSheet.create({
	ship: {
		position: 'absolute',
		resizeMode: 'contain'
	}
});
