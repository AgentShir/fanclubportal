import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { Link } from 'react-router-dom'
import { getPortalInfo } from '../actions/app'
import { Card, CardText, CardHeader } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider';
const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',

}
const cardHeaderStyle = {
    textAlign: 'center'
}
const titleStyle = {
    fontSize: '50px'
}
class UserHomepage extends Component {
    componentWillMount() {
        let portalId = localStorage.getItem('portalId')

        console.log(' porta lin', portalId)
        getPortalInfo(portalId)
    }
    addEvent = (e) => {
        //  let portalId = localStorage.getItem('portalId')
        console.log('here')
        this.props.history.push(`/${localStorage.portalId}/addEvent`)
    }
    render() {
        return (
            <div className="portalContainer">
                <Card style={cardStyle} className="headerCard">
                    <CardHeader style={cardHeaderStyle} className="mainHeader"
                        title={"Welcome " + localStorage.getItem('username')}
                        titleStyle={titleStyle}
                    />
                </Card>
                <Card style={cardStyle} className="headerCard">
                    <CardText>
                        <span className="updateEventTitle">
                            <h2>{this.props.portalInfo.fanClubName + " upcoming events"}</h2>
                            <FlatButton label="Add Event" type="submit" onClick={this.addEvent} />
                        </span>
                        <List>
                            {this.props.portalEvents.map((event) => (
                                <div key={event.id} >
                                    <Link to={`/updateEvent/${event.id}`} className="link">
                                        <ListItem key={event.id}
                                            primaryText={event.description}
                                            secondaryText={event.date + " at " + event.time}
                                        />
                                    </Link>
                                    <Divider />
                                </div>
                            ))}
                        </List>
                    </CardText>
                </Card>
            </div>
        )
    }
}

const stateToProps = function (appState) {
    const { portalInfo, portalEvents } = appState.app
    return {
        portalInfo,
        portalEvents
    }
}

export default connect(stateToProps)(Authorize(UserHomepage))