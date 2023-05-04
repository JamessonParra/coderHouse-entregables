import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
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

  const handleGoToCameraScreen = () => {
    navigation.navigate('Camera');
  };

  const handleGoToMapScreen = () => {
    navigation.navigate('Map');
  };

  const handleShowMore = () => {
    setShowMore(true);
  }

  const renderUser = ({ item }) => (
    <User user={item} onDelete={handleDelete} onEdit={handleEdit} />
  );

  const keyExtractor = (item) => (item.id ? item.id.toString() : '');

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity onPress={handleAddUser} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoToCameraScreen}>
          <Text style={styles.buttonText}>Ir a cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoToMapScreen}>
          <Text style={styles.buttonText}>Ir a mapa</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() => (
          <Text style={styles.noUsersText}>No hay usuarios registrados</Text>
        )}
        ListFooterComponent={() => (
          users.length > 4 && !showMore && (
            <TouchableOpacity onPress={handleShowMore} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreButtonText}>Ver más...</Text>
            </TouchableOpacity>
          )
        )}
        onRefresh={async () => {
          setUpdated(!updated);
        }}
        refreshing={false}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8BC34A',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    pointerEvents: 'box-none',
    zIndex: 1
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flex: 1,
    paddingRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 10,
  },
  editButton: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 10,
  },
  noUsersText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  viewMoreButton: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 10,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
    bottomButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#8BC34A',
  },
    bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default HomeScreen;