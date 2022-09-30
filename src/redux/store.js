import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
// import reducer from '../index';
import reducer from './reducers';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

store.subscribe(() => {
  console.log(store.getState().wallet.expenses);
});

if (window.Cypress) {
  window.store = store;
}

export default store;
