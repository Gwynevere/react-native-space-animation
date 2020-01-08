import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import Stars from './stars';
import SpeedLines from './speed_lines';
import VoyagerOne from './ships/voyager_one';


export default class Space extends PureComponent {

	render() {
		return <View style={styles.main}>
			<Stars/>
			<SpeedLines/>
		{/*	<VoyagerOne/>*/}
		</View>;
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: '#000000',
	}
});
