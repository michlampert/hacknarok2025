import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@reactvision/react-viro';
import React, { useState } from 'react';
import { StyleSheet, View, Button, SafeAreaView } from 'react-native';
import CircularMenuExample from './src/components/CircularMenuExample';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log('onInitialized', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

const App = () => {
  const [showAR, setShowAR] = useState(false);
  const [showCircularMenu, setShowCircularMenu] = useState(false);

  if (showAR) {
    return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={styles.f1}
      />
    );
  }

  if (showCircularMenu) {
    return <CircularMenuExample />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Show AR Demo" onPress={() => setShowAR(true)} />
        <View style={styles.buttonSpacer} />
        <Button title="Show Circular Menu Demo" onPress={() => setShowCircularMenu(true)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  f1: { 
    flex: 1 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    width: '80%',
  },
  buttonSpacer: {
    height: 20,
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default App;