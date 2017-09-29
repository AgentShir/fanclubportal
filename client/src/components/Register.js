import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postRegister } from '../actions/app'
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
class Register extends Component {
    state = {
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        expanded: false
    }
    componentWillReceiveProps(props) {
        if (!props.isAuthenticated) {
            this.setState({ expanded: true })
        } else {
            this.setState({ expanded: false })
            this.props.history.push('/home')
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(postRegister(this.state))
        this.setState({fname: '',lname: '',username: '', email: '',password: '',})
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
      };
    render() {
        return (
            <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardTitle title="Register" />
                <CardText expandable={true} color={'red'} style={errorMessageStyle}>
                    {this.props.regErrorMessage}
                </CardText>
                <form onSubmit={this.handleSubmit}>
                    <CardText>
                        <TextField
                            onChange={this.handleChange} value={this.state.fname} hintText="First Name"
                            floatingLabelText="First Name"
                            name="fname"
                            fullWidth={true} required={true} autoComplete="off"
                        /><br />

                        <br />
                        <TextField
                            onChange={this.handleChange} value={this.state.lname} hintText="Last Name"
                            floatingLabelText="Last Name"
                            name="lname"
                            fullWidth={true} required={true} autoComplete="off"
                        /><br />
                        <TextField
                            onChange={this.handleChange} value={this.state.username} hintText="Username"
                            floatingLabelText="Username"
                            name="username"
                            fullWidth={true} required={true} autoComplete="off"
                        /><br />
                        <TextField
                            onChange={this.handleChange} value={this.state.password} hintText="Password"
                            floatingLabelText="Password"
                            name="password"
                            type="password"
                            fullWidth={true} required={true} autoComplete="off"
                        /><br />
                        <TextField
                            onChange={this.handleChange} value={this.state.email} hintText="Email"
                            floatingLabelText="Email"
                            name="email"
                            type="email"
                            fullWidth={true} required={true} autoComplete="off"
                        /><br />
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

    const regErrorMessage = appState.app.errorMessage
    return {
        isAuthenticated,
        isFetching,
        errorMessage,
        regErrorMessage
    }
}
export default connect(mapStateToProps)(Register)
