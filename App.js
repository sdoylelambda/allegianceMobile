import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReactDOM from 'react-dom'
// import 'semantic-ui-css/semantic.min.css'
import App2 from './src/App2'
import * as serviceWorker from './src/serviceWorker'
// import { Auth0Provider } from './components/auth/react-auth0-wrapper'
import { Auth0Provider } from './src/components/auth/react-auth0-wrapper'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './src/reducers'
import { BrowserRouter as Router } from 'react-router-dom'
// A function that routes the user to the right place
// after login

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default function App() {
  return (
    <View style={styles.container}>
      <Auth0Provider
        domain={process.env.REACT_APP_DOMAIN}
        client_id={process.env.REACT_APP_CLIENTID}
        audience={process.env.REACT_APP_AUDIENCE}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Provider store={store}>
          <Router>
            <App2 style={{ width: '800px' }} />
          </Router>
        </Provider>
      </Auth0Provider>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
