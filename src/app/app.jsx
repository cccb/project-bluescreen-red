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

// Configuration
import loadConfig from 'utils/config/loader'
import { updateConfig } from 'utils/config/actions'

// Components
import MainLayout from 'components/layout/main'

// Pages
import MainHallPage  from 'pages/main-hall/page'
import MainAudioPage from 'pages/main-audio/page'
import LightsPage    from 'pages/lights/page'

// MQTT
import {mqttConnect} from 'utils/mqtt'


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
          <MainLayout>
            <Route exact path="/" component={MainHallPage} />
            <Route path="/main" component={MainHallPage} />
            <Route path="/audio" component={MainAudioPage} />
            <Route path="/lights" component={LightsPage} />
            <Route path="/about" component={AboutPage} />
          </MainLayout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

// Load configuration
loadConfig("/config/config.json").then((config) => {
  store.dispatch(updateConfig(config));

  // Connect mqtt client
  let client = mqttConnect(config.mqtt.uri, store); // Add support for auth
})
.catch((err) => {
  alert("App unconfigured. Please provide a config/config.json");
});
window.store = store;

// Mount application on DOM
ReactDOM.render(
  <App />,
  document.getElementById('app')
);


