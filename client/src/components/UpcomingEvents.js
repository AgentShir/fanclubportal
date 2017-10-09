import React, { Component } from 'react'
import { Authorize } from '../lib/auth'
import { goingToEvent, notGoingToEvent } from '../actions/app'
import placeholder from '../images/square_logo.png'
import { Card } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GoingIcon from 'material-ui/svg-icons/notification/event-available'
import BusyIcon from 'material-ui/svg-icons/notification/event-busy'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign: 'center'

}
const iconStyle={
    fill:'blue'
}
class UpcomingEvents extends Component {
    static defaultProps = {
        events: []
    }
    state = {
        open: false,
        followId:'',
        eventId:'',
        portalName: '',
        description: '',
        location: '',
        date: '',
        time: '',
        theme: '',
        going:''
    };

    handleOpen = (event) => () => {
        this.setState({ open: true, followId:event.followId, eventId:event.eventId, portalName: event.fanClubName, description: event.description, location: event.location, date: event.date, time: event.time, theme: event.theme, going:event.going });
    }

    handleClose = () => {
        this.setState({ open: false })
    };
    goingToEvent =(e) => {
        e.preventDefault()
        this.setState({ open: false })
        goingToEvent(this.state.eventId, this.state.followId)
    }
    notGoing =(e) => {
        e.preventDefault()
        e.preventDefault()
        this.setState({ open: false })
        notGoingToEvent(this.state.eventId, this.state.followId)
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Going"
                primary={true}
                onClick={this.goingToEvent}
            />
        ];
        const actions2 = [
            <FlatButton
                label="Cancel"
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Not Going"
                primary={true}
                onClick={this.notGoing}
            />
        ];

        return (
            <div>
                <Dialog
                    title={this.state.portalName}
                    actions={this.state.going !== 1 ? actions: actions2}
                    modal={false}
                    open={this.state.open}
                >
                    <h2>{this.state.description}</h2>
                    <p>Come and Join us at <strong>{this.state.location} {this.state.date} @ {this.state.time} </strong>
                        {this.state.theme && <span>Theme: {this.state.theme}</span>} </p>
                </Dialog>
                {this.props.events
                    ? <List>
                        {this.props.events.map((event) => (
                            <div key={event.eventId}>
                            {event.logo
                                    ? <ListItem key={event.eventId}
                                        leftAvatar={<Avatar src={event.logo} />}
                                        primaryText={event.description}
                                        secondaryText={<p>{event.date} @ {event.time} {event.eventId}</p>}
                                        secondaryTextLines={2}
                                        onClick={this.handleOpen(event)}
                                        rightIcon = {event.going === 1 ? <GoingIcon style={iconStyle}/> : <BusyIcon /> }
                                    />
                                    : <ListItem key={event.eventId}
                                        leftAvatar={<Avatar src={placeholder} />}
                                        primaryText={event.description}
                                        secondaryText={<p>{event.date} @ {event.time}{event.eventId}</p>}
                                        secondaryTextLines={2}
                                        onClick={this.handleOpen(event)}
                                        rightIcon = {event.going === 1 ? <GoingIcon style={iconStyle}/> : <BusyIcon /> }
                                    />
                             }
                             </div>
                        ))}
                    </List>
                    : <Card style={cardStyle} className="headerCard">
                        <CircularProgress size={80} thickness={5} />
                    </Card>
                }
            </div>
        )
    }
}

export default Authorize(UpcomingEvents)
