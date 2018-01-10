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
import { Route, IndexRoute } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter,
         routerReducer,
         routerMiddleware } from 'react-router-redux'

// Middlewares
import thunkMiddleware from 'redux-thunk'
import { createLogger} from 'redux-logger'

// Application Reducer
import appReducer
  from './reducers/app-reducer'


// Application Setup
const history = createHistory({
  basename: '/app'  
});
const historyRouterMiddleware = routerMiddleware(history);

const loggerMiddleware = createLogger();
const store = createStore(
  appReducer,
  applyMiddleware(
    historyRouterMiddleware,
    thunkMiddleware,
    loggerMiddleware
  )
);



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

class AboutPage extends Component {
  render() {
    return (
      <div className="page page-about">
        About.
      </div>
    );
  }
}


// Main Application
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LayoutMain>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/about" component={AboutPage} />
          </LayoutMain>
        </ConnectedRouter>
      </Provider>
    );
  }
}

// Mount application on DOM
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

