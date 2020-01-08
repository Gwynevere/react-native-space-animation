import React, {PureComponent} from 'react';
import {StyleSheet, View, Animated, InteractionManager} from 'react-native';
import {scale} from 'react-native-size-matters';

import {random} from "../../../../Utils";


const AnimatedFlame = Animated.createAnimatedComponent(View);


export default class BlueFlame extends PureComponent {

    static defaultProps = {
        blue_flame_length: 4,
        emptiness: 6,
        animation_duration_range: [0.2, 1]
    };

    state = {
        animations: null,
        flames: null,
        ready: false
    };

    StartAnimations = async () => this.RunAnimationsForward();

    StopAnimations = () => {
        if (this.state.animations)
            this.state.animations.map(animation => animation.stopAnimation(() => console.log("Animation stopped")));
    };

    RunAnimationsForward = async () => {
        this.state.animations.map(animation => this.Shine(animation));
        /*return InteractionManager.runAfterInteractions(() => {
            Animated.parallel(
                this.state.animations.map(animation => this.Shine(animation))
            ).start(
                () => this.RunAnimationsReverse()
            );
        })*/
    };

    RunAnimationsReverse = async () => {
        /*return InteractionManager.runAfterInteractions(() => {
            Animated.parallel(
                this.state.animations.map(animation => this.Fade(animation))
            ).start(
                () => this.RunAnimationsForward()
            );
        })*/
    };

    Shine = async (animated_value) => {
        Animated.timing(
            animated_value, {
                toValue: 1,
                duration: random(this.props.animation_duration_range[0], this.props.animation_duration_range[1], false) * 1000,
                useNativeDriver: true
            }
        ).start(() => this.Fade(animated_value));
    };

    Fade = async (animated_value) => {
        Animated.timing(
            animated_value, {
                toValue: 0,
                duration: random(this.props.animation_duration_range[0], this.props.animation_duration_range[1], false) * 1000,
                useNativeDriver: true
            }
        ).start(() => this.Shine(animated_value));
    };

    FlameOpacityAnimation = (i, value, length) => {
        if ((length / i) % 2 === 0)
            return value.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            });
        return value;
    };

    init = async () => {
        let size = this.props.size;
        let flame_width = (size / 3.8) / (this.props.blue_flame_length + this.props.emptiness);

        let width = size / 1.4;
        let height = flame_width;
        let left = this.props.x - (size / 2);
        let top = this.props.y + size / 2.2 + size / 4.4;

        const flames = [];
        const animations = [];

        for (let i = 0; i < this.props.blue_flame_length / 2; i++) {
            animations.push(new Animated.Value(0))
        }

        for (let i = 0; i < this.props.blue_flame_length; i++) {
            flames.push(
                <AnimatedFlame just_for_stylling
                               style={[
                                   styles.flame,
                                   {
                                       transform: ([{rotateZ: (-25 - i * 2.2).toString().concat('deg')}]),
                                       width,
                                       height,
                                       left,
                                       top: top + i * flame_width + this.props.emptiness * i,
                                       opacity: this.FlameOpacityAnimation(i, animations[parseInt(i / 2)], animations.length),
                                   }
                               ]}/>
            )
        }

        InteractionManager.runAfterInteractions(() => {
            this.setState({
                flames,
                animations: animations.map(el => el),
                ready: true
            }, () => this.StartAnimations())
        })

    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.init());
    }

    componentWillUnmount() {
        this.StopAnimations();
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        if (
            prevProps.blue_flame_length !== this.props.blue_flame_length ||
            prevProps.emptiness !== this.props.emptiness ||
            prevProps.animation_duration_range !== this.props.animation_duration_range
        )
            this.init();
    }

    render() {
        if (!this.state.ready)
            return null;
        return this.state.flames;
    }
}

const styles = StyleSheet.create({
    flame: {
        position: 'absolute',
        backgroundColor: '#327d59',
        borderRadius: scale(28)
    }
});
