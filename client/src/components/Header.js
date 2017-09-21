import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'

const headerStyle = {
    cursor: 'pointer',
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: '#039BE5'
  }
  
  class Header extends Component {
    constructor(props) {
      super(props)
      this.state = {
        open: false
      }
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    render() {
      return (
        <div>
          <AppBar
            title='Fan Club Portals'
            style={headerStyle}
            onTitleTouchTap={(e) => { this.props.history.push('/') }}
            onLeftIconButtonTouchTap={this.handleToggle}

          />
          <Drawer open={this.state.open}>
            <MenuItem onClick={this.handleToggle}>{<CloseIcon />}</MenuItem>
              <Link to="/login" style={{textDecoration:"none"}}>
                <MenuItem onClick={this.handleToggle}>Login</MenuItem>
              </Link>
              <Link to="/register" style={{textDecoration:"none"}}>
                <MenuItem onClick={this.handleToggle}>Register</MenuItem>
              </Link>
              <Link to="/aboutus" style={{textDecoration:"none"}}>
                <MenuItem onClick={this.handleToggle}>About Us</MenuItem>
              </Link>
              <Link to="/contact" style={{textDecoration:"none"}}>
                <MenuItem onClick={this.handleToggle}>Contact</MenuItem>
              </Link>
          </Drawer>
        </div>
  
      )
    }
  }
export default withRouter(Header)