import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import PositionRoute from './components/routing/PositionRoute'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import Add from './components/pages/Add';
import Edit from './components/pages/Edit';
import Profile from './components/pages/Profile';
import MyMessages from './components/pages/MyMessages';

import AuthState from './context/auth/AuthState';
import MessageState from './context/message/MessageState';

import './App.css';


const App = () => {
    return (
      <AuthState>
        <MessageState>
          <Router>
            <Fragment>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PositionRoute exact path='/my_messages' component={MyMessages} />
                  <Route exact path='/signup' component={Signup} />
                  <Route exact path='/login' component={Login} />
                  <PositionRoute exact path = '/add' component={Add} />
                  <PositionRoute exact path = '/edit' component={Edit} />
                  <PrivateRoute exact path = '/profile' component={Profile} />
                </Switch>
            </Fragment>
          </Router>
          </MessageState>
      </AuthState>
      
    );
}

export default App;
