import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
// import rootReducer from '../../redux/reducers';
import reducer from '../../redux/reducers';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withRedux(component, store) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRedux(component, options = {}) {
  const {
    initialState = {
      user: {
        email: 'eliveltonmn@trybe.com',
        total: '10',
      },
      wallet: {
        isLoading: false,
        currencies: ['USD', 'CAD', 'GBP'],
        expenses: [
          {
            id: 0,
            value: '10',
            description: 'description',
            tag: 'Lazer',
            method: 'Dinheiro',
            currency: 'USD',
            exchangeRates: {
              USD: {
                code: 'USD',
                name: 'Dólar Americano/Real Brasileiro',
                ask: '5.41',
              },
            },
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    },
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
  } = options;

  return {
    ...render(withRedux(component, store)),
    store,
  };
}

export function renderWithRouterAndRedux(component, options = {}) {
  const {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = options;

  return {
    ...renderWithRedux(withRouter(component, history), options),
    history,
  };
}
