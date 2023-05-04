import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { editUser, addUser, generateCode } from '../actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddUserScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserById = async (id) => {
      const storedUsers = await AsyncStorage.getItem('users');

      if (storedUsers !== null) {
        const parsedUsers = JSON.parse(storedUsers);
        const user = parsedUsers.find((user) => user.id === id);
        console.log(user)
        if (user) {
          setEditingUser(user);
          setName(user.name);
          setEmail(user.email);
        }
      }
    };

    const getUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers !== null) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();

    if (route.params?.user) {
      setEditingUser(route.params.user);
      setName(route.params.user.name);
      setEmail(route.params.user.email);
    } else {
      setEditingUser(null);
      setName('');
      setEmail('');
    }
  }, [route.params?.user]);

  const handleSave = async () => {
    if (editingUser) {
      const updatedUser = { ...editingUser, name, email };
      dispatch(editUser(updatedUser));
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    } else {
      const newUser = {
        id: generateCode(5),
        name,
        email,
      };
      setUsers([...users, newUser]);
      await AsyncStorage.setItem('users', JSON.stringify([...users, newUser])); 
      dispatch(addUser(newUser));
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddUserScreen;