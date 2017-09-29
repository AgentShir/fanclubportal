import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { postEvent, getEventInfo, updateEvent, updateComplete } from '../actions/app'
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
const minDate = new Date();
class PortalEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            location: '',
            theme: '',
            date: null,
            time: null
        }
    }

    componentWillMount() {
        if (this.props.location.pathname.indexOf('/updateEvent') !== -1) {
            let eventId = this.props.match.params.eventId
            getEventInfo(eventId)
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.location.pathname.indexOf('/addEvent') !== -1) {
            if (props.updateStatus === 'fail') {
                this.setState({ expanded: true })
            } else if (props.updateStatus === 'success') {
                this.setState({ expanded: false })
                this.props.history.push('/')
            }
        }
        else {
            this.state = {
                description: props.eventInfo.description,
                location: props.eventInfo.location,
                theme: props.eventInfo.theme,
                //date: props.eventInfo.date,
                // time: props.eventInfo.time
                date: props.eventDate,
                time: props.eventTime
            }
            if (props.updateStatus === 'success') {
                this.props.history.push('/')
                updateComplete()
            } else if (props.updateStatus === 'fail') {
                this.setState({ expanded: true })
            }
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
        let portalId = localStorage.getItem('portalId')
        if (this.props.location.pathname.indexOf('/addEvent') !== -1) {
            postEvent(this.state, portalId)
            this.setState({ description: '', location: '', theme: '', date: null, time: null })
        }
        else {
            let eventId = this.props.match.params.eventId
            updateEvent(eventId, portalId, this.state)
        }
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };
    render() {
        return (
            <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardTitle title="Event" />
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
                            minDate={minDate}
                            hintText="Date"
                            container="inline"
                            mode="landscape"
                            locale="en-US"
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
                            minutesStep={5}
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
    const { errorMessage, eventInfo, updateStatus } = appState.app
    if (eventInfo.date !== undefined) {
        var newDate = new Date(eventInfo.date)
    }
    // time
    if (eventInfo.time !== undefined) {
        var newTime = new Date()
        var tempTime = eventInfo.time
        var times = tempTime.split(":")
        newTime.setHours(times[0])
        newTime.setMinutes(times[1])
        newTime.setSeconds(times[2])
    }
    return {
        errorMessage,
        eventInfo,
        updateStatus,
        eventDate: newDate,
        eventTime: newTime
    }
}
export default connect(mapStateToProps)(Authorize(PortalEvent))
