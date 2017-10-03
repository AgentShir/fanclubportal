import React, { Component } from 'react'
import { Authorize } from '../lib/auth'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'

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
                    <Card key={event.id}>
                        <CardText>
                            <span style={{ fontWeight: '900' }}>Description </span>{event.description}<br />
                            <span style={{ fontWeight: '900' }}>Location  </span> {event.location}<br />
                            <span style={{ fontWeight: '900' }}>Theme  </span> {event.theme}<br />
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
