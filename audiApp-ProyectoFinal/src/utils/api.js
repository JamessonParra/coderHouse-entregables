const BASE_URL = 'https://api.audired.com.ar/api/v1';
export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const apiConnection = await checkApiConnection();
      if (!apiConnection) throw new Error('Error de conexión con el servidor');
      
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'usuario': `${email}`,
          'password': `${password}`
        })
      });

      const data = await response.json();
      if (!data.access_token) throw new Error(data.errors);
      dispatch(loginSuccess(data.access_token));
      return true;
    } catch (error) {
      console.error(error);
      dispatch(loginFailure(error.message));
    }
  };
};

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const checkApiConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}/healthcheck`);
    const responseData = await response.json();
    return responseData.code !== '404';
  } catch (error) {
    console.error(error);
    return false;
  }
};