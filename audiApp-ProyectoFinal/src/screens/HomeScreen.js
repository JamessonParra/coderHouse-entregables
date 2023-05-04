import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({ user, onDelete, onEdit }) => (
  <View style={styles.userContainer} key={user.id}>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
    <TouchableOpacity onPress={() => onDelete(user.id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Quitar</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onEdit(user)} style={styles.editButton}>
      <Text style={styles.editButtonText}>Editar</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [showMore, setShowMore] = useState(false);
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector(state => (state.users || []).slice(0, showMore ? undefined : 5)).sort((a, b) => b.id - a.id);

  useEffect(() => {
    const getUsers = async () => {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers !== null) {
        dispatch({ type: 'SET_USERS', payload: JSON.parse(storedUsers) });
        setUpdated(!updated);
      }
    };
  
    getUsers();
  
    const unsubscribe = navigation.addListener('focus', async () => {
      setShowMore(true);
    });
    return unsubscribe;
  }, [navigation, updated]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setUpdated(!updated);
  }

  const handleAddUser = () => {
    navigation.navigate('AddUser');
  }

  const handleEdit = (user) => {
    navigation.navigate('AddUser', { user });
  }

  const handleShowMore = () => {
    setShowMore(true);
  }

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
    <View style={styles.userButtons}>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  </View>
  );

  const keyExtractor = (item) => (item.id ? item.id.toString() : '');
  
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddUser} style={styles.navButton}>
          <Text style={styles.navButtonText}>Añadir usuario</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderUser}
      ListEmptyComponent={() => (
        <Text style={styles.noUsersText}>No hay usuarios registrados</Text>
      )}
    />
      </View>
    
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 16,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: 14,
      color: '#888',
    },
    noUsersText: {
      textAlign: 'center',
      marginTop: 16,
      fontSize: 18,
      fontWeight: 'bold',
    },
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#eee',
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    navButton: {
      backgroundColor: '#ddd',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    navButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    userButtons: {
      flexDirection: 'row',
    },
    deleteButton: {
      backgroundColor: 'red',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginRight: 10,
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    editButton: {
      backgroundColor: 'blue',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    editButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
    
    export default HomeScreen;
