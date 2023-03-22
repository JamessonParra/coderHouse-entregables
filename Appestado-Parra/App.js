import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import store from './store';

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
    <Provider store={store}>
      <ImageBackground
        source={require('./assets/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Counter />
          </View>
        </View>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    maxWidth: 500,
    width: '90%',
    alignSelf: 'center',
  }
});

export default App;
