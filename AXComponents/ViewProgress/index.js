import React, {PureComponent} from 'react';
import {Text, Animated, StyleSheet, View} from 'react-native';

const AView = Animated.createAnimatedComponent(View)

const INFLATE = 1;
const OUTFLATE = 0;
const MIN = 6;
const MAX = 10;
const DURATION = 500;
const MIN_COLOR = 'rgb(49,27,146)';
const MAX_COLOR = 'rgb(255,255,255)';

export default class XViewProgress extends PureComponent {

	animateColor = new Animated.Value(0);

	render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return <View>
		</View>;
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1
	}
})