// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_EMAIL, GET_TOTAL, CALCULATE_TOTAL } from '../actions';

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
  case CALCULATE_TOTAL: {
    console.log(state.total);
    console.log(action.payload);

    const newTotal = parseFloat(state.total) - parseFloat(action.payload);
    console.log(newTotal);
    console.log('teste');
    const newTotalFixed = newTotal.toFixed(2);
    return {
      ...state,
      total: newTotalFixed,
    }; }
  default:
    return state;
  }
}

export default user;
