import React, { Component } from 'react'

// router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// connecting react and redux
import {Provider} from 'react-redux'
import store from '../store'

// layout
import Layout from './Layout'

// page components
import MyComponent from './MyComponent'

// base styles and icons
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'

// custom styles
import '../styles/App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={MyComponent} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    )
  }
}

export default App
