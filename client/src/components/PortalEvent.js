import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { postEvent, getEventInfo, updateEvent, updateComplete, removeEvent, resetEventForm } from '../actions/app'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import CircularProgress from 'material-ui/CircularProgress'
import event from '../images/event.png'

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
    backgroundColor: '#FFFFFF'
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
const minDate = new Date();
class PortalEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            location: '',
            theme: '',
            date: null,
            time: null,
            expanded: false,
            showProgress: false
        }
    }

    componentWillMount() {
        if (this.props.location.pathname.indexOf('/updateEvent') !== -1) {
            let eventId = this.props.match.params.eventId
            getEventInfo(eventId)
        }
    }
    componentWillUnmount() {
        this.setState({})
        resetEventForm()
    }
    componentWillReceiveProps(props) {
        if (props.location.pathname.indexOf('/addEvent') !== -1) {
            if (props.updateStatus === 'fail') {
                this.setState({ expanded: true, showProgress: false })
            } else if (props.updateStatus === 'success') {
                this.setState({ expanded: false })
                this.props.history.push('/dashboard/1')
            }
        }
        else if (props.location.pathname.indexOf('/updateEvent') !== -1) {
            this.setState({
                description: props.eventInfo.description,
                location: props.eventInfo.location,
                theme: props.eventInfo.theme,
                date: props.eventInfo.date,
                time: props.eventInfo.time
            })

            if (props.updateStatus === 'success') {
               this.props.history.push('/dashboard/1')
                updateComplete()
            } else if (props.updateStatus === 'fail') {
                this.setState({ expanded: true, showProgress: false })
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleDateChange = (e, date) => {
        this.setState({ date })
    }
    handleTimeChange = (e, time) => {
        this.setState({ time })
    }
    addEvent = (e) => {
        e.preventDefault()
        // this.setState({ showProgress: true })
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

    removeEvent = (e) => {
        e.preventDefault()
        let eventId = this.props.match.params.eventId
        // this.setState({showProgress:true})
        removeEvent(eventId)

    }
    cancel = (e) => {
        e.preventDefault()
        this.props.history.push('/dashboard/1')
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };
    render() {
        return (
            <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
              <div className="imageAlign">
                <img src={event} alt='Create Event' className="event" />
              </div>
                <CardText expandable={true} color={'red'} style={errorMessageStyle}>
                    {this.props.errorMessage}
                </CardText>
                {this.state.showProgress === false
                    ? <form onSubmit={this.addEvent}>
                        <CardText>
                            <TextField
                                hintText="Description"
                                floatingLabelText="Tell us about your Event"
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
                                floatingLabelText="Tell us the location"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth={true}
                                required={true}
                                autoComplete="off"
                            /><br /><br />
                            <TextField
                                hintText="Theme"
                                floatingLabelText="Theme"
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
                            {this.props.location.pathname.indexOf('/updateEvent') !== -1 &&
                            <RaisedButton labelColor='#cd0000'label="Delete" type="button" onClick={this.removeEvent} />}
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
    const { errorMessage, eventInfo, updateStatus } = appState.app
    if (eventInfo.date !== undefined) {
        eventInfo.date = new Date(eventInfo.date)
    }
    // time
    if (eventInfo.time !== undefined) {
        var newTime
        if (typeof eventInfo.time === 'object') {
            newTime = eventInfo.time
        } else {
            newTime = new Date()
            var tempTime = eventInfo.time
            var times = tempTime.split(":")
            newTime.setHours(times[0])
            newTime.setMinutes(times[1])
            newTime.setSeconds(times[2])
        }

        eventInfo.time = newTime
    }
    return {
        errorMessage,
        eventInfo,
        updateStatus
    }
}
export default connect(mapStateToProps)(Authorize(PortalEvent))
