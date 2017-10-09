import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postRegister, resetRegister } from '../actions/app'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import register from '../images/register.png'

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
    backgroundColor: '#61A5BF'
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
class Register extends Component {
    state = {
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        expanded: false,
        showProgress: false
    }
    componentWillReceiveProps(props) {
        if (props.regErrorMessage.length > 0) {
            this.setState({ expanded: true, showProgress: false })
        } else {
            setTimeout(() => {
                props.history.push('/dashboard/0')
            }, 2000)
        }
    }
    componentWillUnmount() {
        this.setState({})
        resetRegister()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(postRegister(this.state))
        this.setState({ fname: '', lname: '', username: '', email: '', password: '', showProgress: true })
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
            <div className="portalContainer">
                <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <div className="imageAlign">
                        <img src={register} alt='Register!' className="register" />
                      </div>
                    <CardText expandable={true} color={'red'} style={errorMessageStyle}>
                        {this.props.regErrorMessage}
                    </CardText>
                    {this.state.showProgress === true
                        ? <div style={progressCard}>
                            <CircularProgress size={80} thickness={5} />
                        </div>
                        : <form onSubmit={this.handleSubmit}>
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
                                <RaisedButton label="Cancel" type="button" onClick={this.cancel} />
                                <RaisedButton backgroundColor='#31708E' labelColor='#F7F9FB'label="Submit" type="submit" />
                            </CardActions>
                        </form>
                    }
                </Card>
            </div>
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
