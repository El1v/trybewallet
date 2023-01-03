// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES, GET_ERROR, REQUEST_API, ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state, isLoading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      isLoading: false,
      currencies: action.currencies,
    };
  case GET_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      isLoading: false,
      editor: false,
      idToEdit: 0,
      expenses: [
        ...state.expenses,
        action.payload],
    };
  case REMOVE_EXPENSE: {
    const newArray = state.expenses
      .filter((element) => element.id !== action.payload);
    return {
      ...state,
      isLoading: false,
      expenses: [...newArray],
    }; }
  case EDIT_EXPENSE: {
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.idToEdit,
      valueToEdit: action.payload.value,
      isLoading: false,
    }; }
  default:
    return state;
  }
}

export default wallet;
