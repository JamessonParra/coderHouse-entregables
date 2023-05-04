import AsyncStorage from '@react-native-async-storage/async-storage';

export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    payload: user,
  };
};
export const editUser = (updatedUser) => async (dispatch) => {
  try {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const updatedUsers = users.map((user) => {
      if (user.id !== updatedUser.id) {
        return user;
      } else {
        return updatedUser;
      }
    });

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    dispatch({
      type: 'EDIT_USER',
      payload: updatedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};



export const deleteUser = (id) => {
  return {
    type: 'DELETE_USER',
    payload: id,
  };
};

export const getAllUsers = () => {
  return {
    type: 'GET_ALL_USERS',
  };
};

export const generateCode = (length) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};
