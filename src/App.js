import React, { Component } from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store/Store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
