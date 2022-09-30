// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_EMAIL, GET_TOTAL } from '../actions';

const INITIAL_STATE = {
  email: '',
  total: 0,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_EMAIL:
    return { ...state, email: action.payload };
  case GET_TOTAL: {
    const total = (parseFloat(state.total) + parseFloat(action.payload));
    const newTotal = total.toFixed(2);
    return { ...state, total: newTotal }; }
  default:
    return state;
  }
}

export default user;
