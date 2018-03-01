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
import { GameLoop } from 'react-native-game-engine';
import * as Animatable from 'react-native-animatable';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
    };
  }
  handleViewRef = ref => (this.view = ref);
  updateHandler = ({ time }) => {
    if (isNaN(time.delta)) {
      return;
    }
    this.setState(prevState => {
      if (prevState) {
        const delta = time.delta;
        const newRotation = delta * 0.002 + prevState.rotation;
        return {
          rotation: newRotation,
        };
      }
    });
  };
  bounce = () =>
    this.view
      .bounce(800)
      .then(endState =>
        console.log(endState.finished ? 'bounce finished' : 'bounce cancelled')
      );
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
          }}
        >
          <Animatable.View
            style={{
              width: 0,
              height: 0,
              top: HEIGHT / 2 + 70,
              left: WIDTH / 2,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            animation="rotate"
            easing="linear"
            iterationCount="infinite"
            useNativeDriver={true}
            duration={3000}
            direction="reverse"
          >
            <Image
              style={{
                alignSelf: 'center',
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={require('./assets/icon.png')}
            />
          </Animatable.View>
        </View>
        <GameLoop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
          }}
          onUpdate={this.updateHandler}
        >
          <View
            style={{
              width: 0,
              height: 0,
              top: HEIGHT / 2 - 70,
              left: WIDTH / 2,
              position: 'absolute',
              alignContent: 'center',
              justifyContent: 'center',
              transform: [{ rotate: this.state.rotation + 'rad' }],
            }}
          >
            <Image
              style={{
                alignSelf: 'center',
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={require('./assets/icon.png')}
            />
          </View>
        </GameLoop>
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
});
