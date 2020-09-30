import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './helpers/history';
import SecretRoute from './helpers/secretRoute';
import Dashboard from './pages/dashboard/index';
import SingIn from './pages/signIn';

function App() {
  return (
    <Router history={history}>
      <SecretRoute exact path="/" component={Dashboard} />
      <Route exact path="/login" component={SingIn} />
    </Router>
  );
}

export default App;
