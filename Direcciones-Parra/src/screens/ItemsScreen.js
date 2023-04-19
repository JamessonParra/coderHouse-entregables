import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { openDatabase } from 'expo-sqlite';
import { getAllData } from '../../utils/DatabaseUtils';
import DeviceInfoPanel from '../../components/DeviceInfoPanel';

const db = openDatabase('database.db');

const ItemsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Obtiene todos los items de la tabla "items" al montar el componente
    getAllData(db, 'items', (result) => {
      if (result.rows.length > 0) {
        setItems(result.rows._array);
      }
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { itemId: item.id })}>
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items</Text>
      <DeviceInfoPanel deviceId="123456789" />
      <FlatList data={items} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewItem')}>
        <Text style={styles.addButtonText}>Add New Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ItemsScreen;