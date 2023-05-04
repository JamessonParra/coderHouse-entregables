const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
      
    case 'EDIT_USER':
      const updatedUsers = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        } else {
          return user;
        }
      });
      return {
        ...state,
        users: updatedUsers,
      };
    case 'DELETE_USER':
      const filteredUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        users: filteredUsers,
      };
    case 'GET_ALL_USERS':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;