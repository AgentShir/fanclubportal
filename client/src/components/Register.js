import React, { Component } from 'react'
import postRegister from '../actions/app'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
}
const buttonStyle = {
    textAlign: 'right'
}
class Register extends Component {
  state = {
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    postRegister(this.state)
  }

    render() {
        return (
            <Card style={cardStyle}>
                <CardTitle title= "Register" />
                <form onSubmit={this.handleSubmit}>
                <CardText>
                    <TextField
                        onChange={this.handleChange} value={this.state.fname} hintText="First Name"
                        floatingLabelText="First Name"
                        name="fname"
                        fullWidth={true}
                    /><br />

                    <br />
                    <TextField
                        onChange={this.handleChange} value={this.state.lname} hintText="Last Name"
                        floatingLabelText="Last Name"
                        name="lname"
                        fullWidth={true}
                    /><br />
                    <TextField
                        onChange={this.handleChange} value={this.state.username} hintText="Username"
                        floatingLabelText="Username"
                        name="username"
                        fullWidth={true}
                    /><br />
                    <TextField
                        onChange={this.handleChange} value={this.state.password} hintText="Password"
                        floatingLabelText="Password"
                        name="password"
                        type="password"
                        fullWidth={true}
                    /><br />
                    <TextField
                        onChange={this.handleChange} value={this.state.email} hintText="Email"
                        floatingLabelText="Email"
                        name="email"
                        type="email"
                        fullWidth={true}
                    /><br />
                </CardText>
                <CardActions style={buttonStyle}>
                    <FlatButton label="Submit" type="submit" />
                </CardActions>
                </form>
                <p>{this.state.fname} {this.state.lname}</p>
                <p>{this.state.username} {this.state.password}</p>
                <p>{this.state.email}</p>
            </Card>
        )
    }
}
export default Register
