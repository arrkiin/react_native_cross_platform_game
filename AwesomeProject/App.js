/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { GameLoop } from 'react-native-game-engine';
import * as Animatable from 'react-native-animatable';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class App extends PureComponent {
  colorBorder = 'grey';
  colorBackground = 'white';
  constructor(props) {
    super(props);
  }
  handleImageRef = ref => (this.image = ref);
  updateHandler = ({ time }) => {};
  animationEndHandler = obj => {
    this.colorBackground = this.colorBackground === 'grey' ? 'white' : 'grey';
    // this.image.setNativeProps({
    //   style: [
    //     styles.image,
    //     {
    //       backgroundColor: this.colorBackground,
    //     },
    //   ],
    // });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Animatable.View
            style={styles.imageContainer}
            animation="rotate"
            easing="linear"
            iterationCount="infinite"
            useNativeDriver
            duration={3000}
            direction="reverse"
            onAnimationEnd={this.animationEndHandler}
          >
            <Image
              ref={this.handleImageRef}
              style={styles.image}
              source={require('./assets/icon.png')}
            />
          </Animatable.View>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Svg width="200" height="200">
            <Rect
              x="25"
              y="25"
              width="150"
              height="50"
              fill="rgb(255, 153, 204)"
              strokeWidth="1"
              stroke="#e60073"
              strokeDasharray="200"
              strokeDashoffset="0"
            />
          </Svg>
        </View>
        <GameLoop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          onUpdate={this.updateHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: 100,
    height: 100,
    top: HEIGHT / 2 - 50,
    left: WIDTH / 2 - 50,
    backgroundColor: 'white',
  },
  image: {
    position: 'relative',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    // backgroundColor: 'grey',
    // borderColor: 'grey',
    // borderWidth: 1,
    // borderRadius: 0,
  },
});
