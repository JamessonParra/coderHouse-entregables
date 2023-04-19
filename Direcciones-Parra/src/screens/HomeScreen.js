import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getData } from '../../utils/DatabaseUtils';
import DeviceInfoPanel from '../../components/DeviceInfoPanel';
import { HEADER_TITLE } from '../constants/HeaderConstants';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getData('devices', null, null, (result) => {
      setDevices(result._array);
    });
  }, [route.params]);

  const renderItem = ({ item }) => <DeviceInfoPanel device={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatlistContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('NewItem', {
            onAddItem: () => route.params.onUpdate(),
          })
        }
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: HEADER_TITLE,
    headerLeft: () => (
      <TouchableOpacity style={styles.headerButton} onPress={() => navData.navigation.toggleDrawer()}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
    ),
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  flatlistContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  addButton: {
    backgroundColor: '#FF5722',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;