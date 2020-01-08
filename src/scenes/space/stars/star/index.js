import React, {PureComponent} from 'react';
import {StyleSheet, View, Animated, InteractionManager, Dimensions} from 'react-native';

import {random} from '../../Utils';

const AnimatedView = Animated.createAnimatedComponent(View);


export default class Stars extends PureComponent {

    static defaultProps = {
        sizeRange: [0, 2],
        starColor: 'rgb(255,255,255)',
        animate: true,
        opacityAnimationDuration: 0,
        opacityRange: [0.09, 1],
    };

    state = {
        width: null,
        height: null,
        borderRadius: null,
        opacityAnimation: null,
        opacityAnimationDuration: null,
        positionAnimation: new Animated.Value(0),
        dimensions: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
    };

    calculateStarDimensions = () => {
        const val = random(this.props.sizeRange[0], this.props.sizeRange[1], false);

        return {
            width: val,
            height: val,
            borderRadius: val * random(1, 2, false)
        };
    };

    fade = async () => {
        Animated.timing(
            this.state.opacityAnimation,
            {
                toValue: this.props.opacityRange[0],
                duration: this.state.opacityAnimationDuration,
                useNativeDriver: true
            },
        ).start(() => InteractionManager.runAfterInteractions(() => this.shine()))
    };

    shine = async () => {
        Animated.timing(
            this.state.opacityAnimation,
            {
                toValue: this.props.opacityRange[1],
                duration: this.state.opacityAnimationDuration,
                useNativeDriver: true,
            },
        ).start(() => InteractionManager.runAfterInteractions(() => this.fade()));
    };

    move = async () => {
        if (random(0, 1) === 1)
            Animated.timing(
                this.state.positionAnimation,
                {
                    toValue: 1,
                    duration: random(10000, 20000, false),
                    useNativeDriver: true,
                }
            ).start(() => this.resetPosition());
    };

    resetPosition = async () => {
        this.state.positionAnimation.setValue(0);
        InteractionManager.runAfterInteractions(() => this.move());
    };

    init = async () => {

        const opacityAnimation = new Animated.Value(this.props.animate ? 0 : 1);

        let opacityAnimationDuration;

        if (this.props.opacityAnimationDuration !== 0) {
            opacityAnimationDuration = this.props.opacityAnimationDuration;
        } else {
            opacityAnimationDuration = random(1, 12, false) * 1000;
        }

        this.setState({
            opacityAnimation,
            opacityAnimationDuration,
            ...this.calculateStarDimensions(),
        }, () => {
            InteractionManager.runAfterInteractions(() => this.move());
        });
    };

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        if (this.state.opacityAnimation)
            this.state.opacityAnimation.stopAnimation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props)
            this.init();
    }

    render() {
        return <AnimatedView justeForStylingCode
                             style={[
                                 styles.star,
                                 {
                                     width: this.state.width,
                                     height: this.state.height,
                                     borderRadius: this.state.borderRadius,
                                     backgroundColor: this.props.starColor,
                                     opacity: this.state.opacityAnimation,
                                     left: this.props.x,
                                     top: this.props.y,
                                     transform: ([
                                         {
                                             translateX: this.state.positionAnimation.interpolate({
                                                 inputRange: [0, 1],
                                                 outputRange: [0, -this.state.dimensions.width],
                                             }),
                                         },
                                     ]),
                                 },
                             ]}/>;
    }
}

const styles = StyleSheet.create({
    star: {
        position: 'absolute'
    }
});
