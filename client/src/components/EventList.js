import React, { Component } from 'react'
import { Authorize } from '../lib/auth'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'

const eventCard={
    backgroundColor:'inherit'
}
const cardTextStyle={
    color:'#31708E'
}
const titleStyle={
    fontWeight: '900',
    color:'#687864'
}
class EventList extends Component {
    static defaultProps = {
        events:[]
    }
    render() {
        return (
            <div>
            {this.props.events.map((event) => (
                <div key={event.id}>
                <h4>{event.date} {event.time}</h4>
                <Link to={`/updateEvent/${event.id}`} className="link">
                    <Card key={event.id} style={eventCard}>
                        <CardText style={cardTextStyle}>
                            <span style={titleStyle}>Description </span>{event.description}<br />
                            <span style={titleStyle}>Location  </span> {event.location}<br />
                            <span style={titleStyle}>Theme  </span> {event.theme}<br />
                        </CardText>
                    </Card>
                </Link>
            </div>
            ))}
        </div>
        )
    }
}
export default Authorize(EventList)
