import React, {PureComponent} from 'react';
import {Text, Animated, StyleSheet, View} from 'react-native';

const AText = Animated.createAnimatedComponent(Text)
const AView = Animated.createAnimatedComponent(View)

const INFLATE = 1;
const OUTFLATE = 0;
const MIN = 6;
const MAX = 10;
const DURATION = 500;
const MIN_COLOR = 'rgb(49,27,146)';
const MAX_COLOR = 'rgb(255,255,255)';

export default class AXText extends PureComponent {

	animateColorP1 = new Animated.Value(0);
	animateColorP2 = new Animated.Value(0);
	animateColorP3 = new Animated.Value(0);
	animateP1 = new Animated.Value(0);
	animateP2 = new Animated.Value(0);
	animateP3 = new Animated.Value(0);

	/*--Behavior--*/
	animationStageI = () => Animated.parallel([
		Animated.timing(this.animateP1, {
			toValue: INFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateP3, {
			toValue: OUTFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateColorP1, {
			toValue: INFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateColorP3, {
			toValue: OUTFLATE,
			duration: DURATION
		})
	]).start(this.animationStageII);

	animationStageII = () => Animated.parallel([
		Animated.timing(this.animateP1, {
			toValue: OUTFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateP2, {
			toValue: INFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateColorP1, {
			toValue: OUTFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateColorP2, {
			toValue: INFLATE,
			duration: DURATION
		}),
	]).start(this.animationStageIII);

	animationStageIII = () => Animated.parallel([
		Animated.timing(this.animateP2, {
			toValue: OUTFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateP3, {
			toValue: INFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateColorP2, {
			toValue: OUTFLATE,
			duration: DURATION
		}),
		Animated.timing(this.animateColorP3, {
			toValue: INFLATE,
			duration: DURATION,
		}),
	]).start(this.animationStageI);


	/*--LifeCycle--*/
	componentDidMount() {
		this.animationStageI();
	}

	/*--render--*/
	render() {
		return <View style={styles.main}>
			<View style={styles.text}>
				<Text style={{fontSize: 14, color: 'white'}}>Loading </Text>
			</View>
			<View style={styles.progressLine}>
				<AView style={[{
					width: this.animateP1.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					height: this.animateP1.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					borderRadius: this.animateP1.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					backgroundColor: this.animateColorP1.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN_COLOR, MAX_COLOR]
					})
				}, styles.point]}/>
				<AView style={[{
					width: this.animateP2.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					height: this.animateP2.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					borderRadius: this.animateP2.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					backgroundColor: this.animateColorP2.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN_COLOR, MAX_COLOR]
					})
				}, styles.point]}/>
				<AView style={[{
					width: this.animateP3.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					height: this.animateP3.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					borderRadius: this.animateP3.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN, MAX]
					}),
					backgroundColor: this.animateColorP3.interpolate({
						inputRange: [0, 1],
						outputRange: [MIN_COLOR, MAX_COLOR]
					})
				}, styles.point]}/>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	main: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		marginHorizontal: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	progressLine: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		flexDirection: 'row'
	},
	point: {
		marginHorizontal: 4
	}
});