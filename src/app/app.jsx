/*
 * Project Bluescreen Red
 * ----------------------
 *
 * This is the react based control interface for
 * things like lights, sound, stair effects, and so on.
 *
 */

// React
import React     from 'react'
import ReactDOM  from 'react-dom'

import { Component } from 'react'

// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

// Router
import { createHistory } from 'history'
import { Router,
         Route,
         IndexRoute,
         IndexRedirect,
         useRouterHistory } from 'react-router'

import { syncHistoryWithStore } from 'react-router-redux'

// Middlewares
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerMiddleware as createRouterMiddleware }
  from 'react-router-redux'


// Application Setup
const browserHistory = useRouterHistory(createHistory)({
  basename: '/app'
});

const loggerMiddleware = createLogger();
const store = createStore(combinedReducer, applyMiddleware(
  routerMiddleware,
  thunkMiddleware,
  loggerMiddleware
));

const history = syncHistoryWithStore(browserHistory, store);

// Initial stubs
class LayoutMain extends Component {
  render() {
    return (
      <div className="app">
        <h1>Layout</h1>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class WelcomePage extends Component {
  render() {
    return (
      <div className="page page-welcome">
        Welcome Welcome Welcome!
      </div>
    );
  }
}


// Main Application
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={LayoutMain}>
            <IndexRoute component={WelcomePage}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

// Mount application on DOM
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

