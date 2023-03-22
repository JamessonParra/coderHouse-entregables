import { createStore } from 'redux';

const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) 
    {
        case 'AGREGAR':
          return { ...state, count: state.count + 1 };
        case 'REDUCIR':
          return { ...state, count: state.count > 0 ? state.count - 1 : 0 };
        case 'RESET':
          return { ...state, count: 0 };
        default:
          return state;
    }
};

const store = createStore(reducer);

export default store;
