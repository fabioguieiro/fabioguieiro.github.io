import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Board from './containers/Board/Board'
import CryptoCoin from './containers/CryptoCoin/CryptoCoin';
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>

        <Switch>
          <Route
            path="/cryptocoin/:id"
            component={CryptoCoin}
          />
          <Route
            path="/"
            component={Board}
            exact
          />
        </Switch>

      </BrowserRouter>
    </Provider>

  );
}

export default App;
