import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import theme from './theme';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ThemeProvider theme={ theme }>
      <BrowserRouter>
        <Provider store={ store }>
          <CssBaseline />
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>,

  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
