import React, { Component } from 'react'

// router
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthRoute as Route } from '../lib/auth'

// connecting react and redux
import { Provider } from 'react-redux'
import store from '../store'

// layout
import Layout from './Layout'

// page components
import Home from './Home'
import Login from './Login'
import Register from './Register'
import AboutUs from './AboutUs'
import Contact from './Contact'
import Portal from './Portal'
import PortalEvent from './PortalEvent'
import PortalView from './PortalView'
import Dashboard from './Dashboard'
import Category from './Category'


// base styles and icons
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'

// custom styles
import '../styles/App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fullBlack} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  datePicker: {
    color: '#002642',
    calendarTextColor: '#85C0EA',
    selectColor:'#85C0EA',
    calendarYearBackgroundColor: '#85C0EA',
  },
  palette:{
    primary1Color:'#85C0EA',
    primary2Color:'#85C0EA',
    pickerHeaderColor: '#002642',
    shadowColor: fullBlack
  }
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/aboutUs" component={AboutUs} />
                <Route path='/contact' component={Contact} />
                <Route path='/addPortal' component={Portal} />
                <Route path='/:portalId/addEvent' component={PortalEvent} />
                <Route path='/updateEvent/:eventId' component={PortalEvent} />
                <Route path='/portal/:portalId' component={PortalView} />
                <Route path='/updatePortal/:portalId' component={Portal} />
                <Route path='/dashboard/:tabId' component={Dashboard} />
                <Route path='/category/:categoryId' component={Category} />
              </Switch>
            </Layout>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
