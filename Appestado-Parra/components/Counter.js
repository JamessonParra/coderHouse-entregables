import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Counter = ({ count, dispatch }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch({ type: 'REDUCIR' })}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch({ type: 'AGREGAR' })}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centrado verticalmente
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 10
  },
  button: {
    backgroundColor: 'rgba(255, 174, 51, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  counterContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(Counter);
