import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jamesson Parra</Text>
      <Text style={styles.subtitle}>Estudiante Coderhouse</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu
        lacus eget libero ultricies sodales. Morbi id dolor at libero maximus
        tincidunt non eu ligula. Donec id sapien massa. Fusce vel pretium
        lectus. Sed eleifend enim et augue posuere, sed fringilla odio
        malesuada. Fusce rhoncus bibendum justo, sit amet feugiat libero
        consectetur eget. Nulla vel nisl sit amet libero auctor efficitur.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
});

export default AboutScreen;