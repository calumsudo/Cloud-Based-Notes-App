import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WelcomePage from './screens/WelcomePage';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
