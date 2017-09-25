import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { postEvent } from '../actions/app'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

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
class PortalEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            location: '',
            theme: '',
            date: null,
            time: null,
            expanded:false
        }
    }
    componentWillReceiveProps(props) {
        if (props.errorMessage.length > 0) {
            this.setState({ expanded: true })
        } else {
            this.setState({ expanded: false })
            this.props.history.push('/')
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleDateChange = (e, date) => {
        this.setState({
            date: date
        })
    }
    handleTimeChange = (e, time) => {
        this.setState({ time: time })
    }
    addEvent = (e) => {
        e.preventDefault()
        let portalId = this.props.match.params.portalId
        postEvent(this.state, portalId)
        this.setState({ description: '', location: '', theme: '', date: null, time: null })
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
      };
    render() {
        return (
            <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardTitle title="Add Event" />
                <CardText expandable={true} color={'red'} style={errorMessageStyle}>
                    {this.props.errorMessage}
                </CardText>
                <form onSubmit={this.addEvent}>
                    <CardText>
                        <TextField
                            hintText="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            fullWidth={true}
                            required={true}
                            autoComplete="off"
                        /><br />
                        <br />
                        <TextField
                            hintText="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth={true}
                            required={true}
                            autoComplete="off"
                        /><br /><br />
                        <TextField
                            hintText="Theme"
                            name="theme"
                            value={this.state.theme}
                            onChange={this.handleChange}
                            fullWidth={true}
                            autoComplete="off"
                        /><br /><br />
                        <DatePicker
                            name="date"
                            value={this.state.date}
                            onChange={this.handleDateChange}
                            hintText="Date"
                            container="inline"
                            mode="landscape"
                            fullWidth={true}
                            required={true}
                        /><br /><br />
                        <TimePicker
                            name="time"
                            value={this.state.time}
                            onChange={this.handleTimeChange}
                            fullWidth={true}
                            hintText="Time"
                            autoOk={true}
                            required={true}
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
    const { errorMessage} = appState.app
    return {
        errorMessage
    }
}
export default connect(mapStateToProps)(Authorize(PortalEvent))