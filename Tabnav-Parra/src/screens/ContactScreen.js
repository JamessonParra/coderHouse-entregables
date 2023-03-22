import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Concatos</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Email:</Text>
        <Text style={styles.infoValue}>coderhouse@gmail.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Phone:</Text>
        <Text style={styles.infoValue}>(555) 555-5555</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
  },
});

export default ContactScreen;
