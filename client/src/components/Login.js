import React, { Component } from 'react'
import { loginUser, logoutUser } from '../lib/auth'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText  } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import login from '../images/login.png'

const cardStyle = {
  maxWidth: '1000px',
  margin: '50px auto',
  backgroundColor: '#EFA798'
}
const progressCard = {
  maxWidth: '1000px',
  textAlign: 'center',
  paddingBottom: '50px'
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
    expanded: false,
    showProgress: false
  }
  componentWillMount() {
    this.props.dispatch(logoutUser())
  }
  componentWillUnmount() {
    this.setState({})
  }
  componentWillReceiveProps(props) {
    if (props.errorMessage.length > 0) {
      this.setState({ expanded: true, showProgress: false })
    } else {
      setTimeout(() => {
        props.history.push('/dashboard/0')
      }, 2000)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ showProgress: true })
    this.props.dispatch(loginUser({ username: this.state.username, password: this.state.password }))
    this.setState({ username: '', password: '' })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleExpandChange = (expanded) => {
    this.setState({ expanded: expanded });
  };
  cancel = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }
  render() {
    return (
      <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <div className="imageAlign">
          <img src={login} alt='Login' className="login"/>
        </div>
        <CardText expandable={true} color={'red'} style={errorMessageStyle}>
          {this.props.errorMessage}
        </CardText>
        {this.state.showProgress === false
          ? <form onSubmit={this.handleSubmit}>
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
              <RaisedButton label="Cancel" type="button" onClick={this.cancel} />
              <RaisedButton backgroundColor='#31708E' labelColor='#F7F9FB' label="Submit" type="submit" />
            </CardActions>
          </form>
          : <div style={progressCard}>
            <CircularProgress size={80} thickness={5} />
          </div>
        }
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
