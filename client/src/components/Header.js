import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../lib/auth'
import logo from '../images/logo_white.png'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'

const headerStyle = {
  cursor: 'pointer',
  boxShadow: 'none',
  // backgroundColor:'#4DB6AC'
  backgroundColor: '#24292E'
}
// const menuStyle={
//   fill:'black'
// }
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  handleToggle = () => this.setState({ open: !this.state.open });

  logout = () => {
    this.props.dispatch(logoutUser())
    this.handleToggle()
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <AppBar
          title={<img src={logo} alt='Fan Portals' className='appLogo' />}
          style={headerStyle}
          showMenuIconButton={false}
          onTitleTouchTap={(e) => { this.props.history.push('/') }}
          onRightIconButtonTouchTap={this.handleToggle}
          iconElementRight={<IconButton><MenuIcon /></IconButton>}
        />
        <Drawer open={this.state.open} openSecondary={true}>
          <MenuItem onClick={this.handleToggle}>{<CloseIcon />}</MenuItem>
          {!this.props.isAuthenticated ?
            <div>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <MenuItem onClick={this.handleToggle}>Login</MenuItem>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <MenuItem onClick={this.handleToggle}>Register</MenuItem>
              </Link>
              <Link to="/aboutUs" style={{ textDecoration: "none" }}>
                <MenuItem onClick={this.handleToggle}>About Us</MenuItem>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <MenuItem onClick={this.handleToggle}>Contact</MenuItem>
              </Link></div>
            : <div>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <MenuItem onClick={this.handleToggle}>Home</MenuItem>
              </Link>
              {localStorage.getItem('portalId') === 'null' ?
                <div>
                  <Link to="/addPortal" style={{ textDecoration: "none" }}>
                    <MenuItem onClick={this.handleToggle}>Add Portal</MenuItem>
                  </Link>
                </div>
                : <div>
                  <Link to={`/portal/${localStorage.portalId}`} style={{ textDecoration: "none" }}>
                    <MenuItem onClick={this.handleToggle}>View Portal</MenuItem>
                  </Link>
                  <Link to={`/updatePortal/${localStorage.portalId}`} style={{ textDecoration: "none" }}>
                    <MenuItem onClick={this.handleToggle}>Edit Portal</MenuItem>
                  </Link>
                  <Link to={`/${localStorage.portalId}/addEvent`} style={{ textDecoration: "none" }}>
                    <MenuItem onClick={this.handleToggle}>Add Event</MenuItem>
                  </Link>
                  <Divider />
                </div>
              }
              <Link to="/aboutUs" style={{ textDecoration: "none" }}>
                <MenuItem onClick={this.handleToggle}>About Us</MenuItem>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <MenuItem onClick={this.handleToggle}>Contact</MenuItem>
              </Link>
              <Divider />
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </div>}
        </Drawer>
      </div>
    )
  }
}
function mapStateToProps(appState) {
  const { isAuthenticated, errorMessage, isFetching } = appState.auth
  return {
    isAuthenticated,
    isFetching,
    errorMessage
  }
}


export default withRouter(connect(mapStateToProps)(Header))
