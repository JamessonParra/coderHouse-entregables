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

  const handleCamera = () => {
    navigation.navigate('Camera');
  }

  const handleMap = () => {
    navigation.navigate('Map');
  }

  const handleAddUserButton = () => {
    navigation.navigate('AddUser');
  }

  const renderUser = ({ item }) => (
    <User user={item} onDelete={handleDelete} onEdit={handleEdit} />
  );

  const keyExtractor = (item) => (item.id ? item.id.toString() : '');

  return (
    <View style={styles.container}>
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
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleAddUser} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Nuevo User +</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCamera} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleMap} >
          <Text Text style={styles.bottomButtonText}>Mapa</Text>
        </TouchableOpacity>
</View>
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
header: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
height: 80,
width: '100%',
backgroundColor: '#4F3EAE',
paddingTop: 30,
},
headerText: {
color: '#fff',
fontSize: 20,
fontWeight: 'bold',
},
cameraContainer: {
flex: 1,
width: '100%',
backgroundColor: '#000',
},
bottomButtonsContainer: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
position: 'absolute',
bottom: 30,
width: '100%',
},
bottomButton: {
flexDirection: 'column',
alignItems: 'center',
marginHorizontal: 20,
},
bottomButtonIcon: {
height: 50,
width: 50,
marginBottom: 10,
},
bottomButtonText: {
color: '#333',
fontSize: 14,
fontWeight: 'bold',
},
});

export default HomeScreen;
