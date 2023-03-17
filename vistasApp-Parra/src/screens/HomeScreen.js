import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ENTREGABLE 4</Text>
      <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.card}>
        <Text style={styles.cardTitle}>Mí historia</Text>
        <Text style={styles.cardText}>Learn more about our team and our mission.</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={styles.card}>
        <Text style={styles.cardTitle}>Contactos</Text>
        <Text style={styles.cardText}>Get in touch with us and let us know your thoughts.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '90%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
});

export default HomeScreen;
