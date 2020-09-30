import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import store from './store/configureStore';
import { style } from './theme/style';
import GlobalStyle from './theme/global';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={style}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
