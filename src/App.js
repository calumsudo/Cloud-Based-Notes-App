import React, { useState, useEffect } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WelcomePage from './screens/WelcomePage';
import HomePage from './screens/HomePage';
import { getAuthUser } from './components/auth/AuthDetails';

const history = createBrowserHistory();

const App = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      const user = await getAuthUser();
      setAuthUser(user);
    };
    fetchAuthUser();
  }, []);

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/">
            <WelcomePage authUser={authUser} />
          </Route>
          <Route exact path="/home">
            <HomePage authUser={authUser} />
          </Route>
          <Route exact path="/home/:uid">
            {' '}
            {/* Add this route for the redirect URL */}
            <HomePage authUser={authUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
