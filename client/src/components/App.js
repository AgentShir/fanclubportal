import React, { Component } from 'react'

// router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// connecting react and redux
import {Provider} from 'react-redux'
import store from '../store'

// layout
import Layout from './Layout'

// page components
import Home from './Home'
import Login from './Login'
import Register from './Register'
import AboutUs from './AboutUs'
import Contact from './Contact'
import CreatePortal from './CreatePortal'

// base styles and icons
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'

// custom styles
import '../styles/App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/aboutus" component={AboutUs} />
              <Route path='/contact' component={Contact} />
              <Route path='/createportal' component={CreatePortal} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App