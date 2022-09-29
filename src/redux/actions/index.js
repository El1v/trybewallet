export const GET_EMAIL = 'GET_EMAIL';

export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_ERROR = 'GET_ERROR';

export const getEmail = (payload) => ({ type: GET_EMAIL, payload });

export const requestAPI = () => (
  { type: REQUEST_API, loading: true,
  });

export const getCurrencies = (currencies) => (
  {
    type: GET_CURRENCIES, loading: false, currencies,
  });

export const getError = (error) => (
  {
    type: GET_ERROR, loading: false, error,
  });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      const onlyCurrencies = Object.keys(data);
      const filteredCurrencies = onlyCurrencies.filter((currency) => currency !== 'USDT');
      dispatch(getCurrencies(filteredCurrencies));
    } catch (error) {
      dispatch(getError(error));
    }
  };
}
