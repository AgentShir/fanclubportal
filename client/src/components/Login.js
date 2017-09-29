import React, { Component } from 'react'
import { loginUser, logoutUser } from '../lib/auth'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const cardStyle = {
  maxWidth: '1000px',
  margin: '50px auto',
}
const buttonStyle = {
  textAlign: 'right'
}
const errorMessageStyle = {
  fontSize: '20px'
}

class Login extends Component {
  state = {
    username: '',
    password: '',
    expanded: false
  }
  componentWillMount() {
    this.props.dispatch(logoutUser())
  }
  componentWillReceiveProps(props) {
    if (!props.isAuthenticated) {
      this.setState({ expanded: true })
    } else {
      this.setState({ expanded: false })
      this.props.history.push('/home')
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(loginUser({ username: this.state.username, password: this.state.password }))
    this.setState({username:'',password:''})
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };

  render() {
    return (
      <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardTitle title="Login" />
        <CardText expandable={true} color={'red'} style={errorMessageStyle}>
          {this.props.errorMessage}
        </CardText>
        <form onSubmit={this.handleSubmit}>
          <CardText>
            <TextField
              floatingLabelText="Username"
              hintText="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              fullWidth={true}
              required={true}
              autoComplete="off"
            /><br />
            <br />
            <TextField
              floatingLabelText="Password"
              hintText="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth={true}
              required={true}
              autoComplete="off"
            /><br /><br />
          </CardText>
          <CardActions style={buttonStyle}>
            <FlatButton label="Submit" type="submit" />
          </CardActions>
        </form>
      </Card>
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

export default connect(mapStateToProps)(Login)