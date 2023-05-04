import { SET_AUTH_TOKEN } from '../constants/actionTypes';

export const setAuthToken = (token) => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});