export const GET_EMAIL = 'GET_EMAIL';
export const GET_TOTAL = 'GET_TOTAL';

export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_ERROR = 'GET_ERROR';

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const getTotal = (payload) => ({ type: GET_TOTAL, payload });

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

export const addExpense = (payload) => (
  {
    type: ADD_EXPENSE, payload,
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
      // dispatch(getCurrencies(data));
    } catch (error) {
      dispatch(getError(error));
    }
  };
}

export function fetchApiPrice(obj) {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data[obj.currency].ask);
      // console.log(obj.value);
      const total = data[obj.currency].ask * obj.value;
      const totalFixed = total.toFixed(2);
      dispatch(addExpense(
        { ...obj, exchangeRates: data },
      ));
      dispatch(getTotal(totalFixed));
    } catch (error) {
      console.log(error);
      dispatch(getError(error));
    }
  };
}

// teste = (curr, expenses) => {
//   const reduce = expenses.reduce((totalSum, item) => {
//     // console.log(item.exchangeRates[item.currency].ask);
//     const { value, currency } = item;
//     console.log(value, currency);
//     // const { ask } = exchangeRates[currency];
//     // return totalSum + (ask * value);
//   }, 0);
//   const totalFixed = reduce.toFixed(2);
//   dispatch(getTotal(totalFixed));
// };
