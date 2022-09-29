// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, GET_ERROR, REQUEST_API } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state, isLoading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state, isLoading: false, currencies: action.currencies,
    };
  case GET_ERROR:
    return {
      ...state, isLoading: false, error: action.error,
    };
  default:
    return state;
  }
}

export default wallet;
