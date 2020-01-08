import React, {PureComponent} from 'react';
import {StyleSheet, View, Animated, Dimensions, InteractionManager} from 'react-native';
import {scale} from 'react-native-size-matters';
import {random} from "../../Utils";


const AnimatedLine = Animated.createAnimatedComponent(View);


export default class SpeedLine extends PureComponent {
	static defaultProps = {
		rotation_angle: 0.25,
		animation_duration_range: [0.4, 1],
		length_range: [32, 100],
		width_range: [0.5, 2],
		opacity_range: [0.4, 0.8],
		y0_range: [0, Dimensions.get('window').height - 20],
		x0_range: [Dimensions.get('window').width / 2, Dimensions.get('window').width],
	};

	state = {
		speedLine: null,
		animation: null,
		ready: false
	};

	Move = async () => {
		Animated.timing(
			this.state.animation,
			{
				toValue: 1,
				duration: random(this.props.animation_duration_range[0], this.props.animation_duration_range[1], false) * 1000,
				useNativeDriver: true
			}
		).start(() => this.Reset());
	};

	Reset = async () => {
		this.state.animation.setValue(0);
		this.Move();
	};

	init = async () => {
		const animation = new Animated.Value(0);

		const length = random(this.props.length_range[0], this.props.length_range[1], false);
		const width = random(this.props.width_range[0], this.props.width_range[1], false);
		const opacity = random(this.props.opacity_range[0], this.props.opacity_range[1], false);

		const x0 = random(this.props.x0_range[0], this.props.x0_range[1]);
		const y0 = random(this.props.y0_range[0], this.props.y0_range[1]);
		const xn = 0 - length;
		const yn = (x0 * Math.tan(this.props.rotation_angle)) + y0 /*- Math.tan(this.props.rotation_angle * Math.PI / 180) * length*/;

		console.log(x0, y0, xn, yn);

		const speedLine = <AnimatedLine just_for_stylling
		                                style={[
			                                styles.speed_line,
			                                {
				                                left: x0,
				                                top: y0,
				                                transform: ([
					                                {
						                                rotateZ: '-25deg'
					                                },
					                                {
						                                translateX: animation.interpolate({
							                                inputRange: [0, 1],
							                                outputRange: [0, (xn - x0 - length)]
						                                })
					                                }
				                                ]),
				                                opacity,
				                                height: width,
				                                width: length
			                                }
		                                ]}/>
		;

		this.setState({
			animation,
			speedLine,
			ready: true,
		}, () => this.Move());
	};

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => this.init());
	}

	componentDidUpdate(prevProps, prevState, snapshot): void {
		if (
			prevProps.rotation_angle !== this.props.rotation_angle ||
			prevProps.animation_duration_range !== this.props.animation_duration_range ||
			prevProps.length_range !== this.props.length_range ||
			prevProps.width_range !== this.props.width_range ||
			prevProps.opacity_range !== this.props.opacity_range ||
			prevProps.x0 !== this.props.x0 ||
			prevProps.y0 !== this.props.y0
		)
			this.init();
	}

	render() {
		if (!this.state.ready)
			return null;
		return this.state.speedLine;
	}

}

const styles = StyleSheet.create({
	speed_line: {
		position: 'absolute',
		borderRadius: scale(28),
		backgroundColor: 'rgb(255,255,255)'
	}
});
