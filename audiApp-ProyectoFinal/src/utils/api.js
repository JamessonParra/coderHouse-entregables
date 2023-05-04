const BASE_URL = 'https://api.audired.com.ar/api/v1';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'usuario': `${email}`,
          'password': `${password}`
        })
      });

      const data = await response.json();
      if (!data.access_token) throw new Error('Error logging in');

      dispatch(loginSuccess(data.access_token));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const checkApiConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}/healthcheck`);
    const responseData = await response.json();
    return responseData.status === 'OK';
  } catch (error) {
    console.error(error);
    return false;
  }
};