import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPortalInfo } from '../actions/app'
import { Card, CardText, CardHeader, CardMedia } from 'material-ui/Card'

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
const style = {
    marginLeft: 20,
};

class PortalView extends Component {
    componentWillMount() {
        let portalId = this.props.match.params.portalId
        getPortalInfo(portalId)
    }
    render() {
        return (
            <div className="portalContainer">
                <Card style={cardStyle} className="headerCard">
                    <CardHeader style={cardHeaderStyle} className="mainHeader"
                        title={this.props.portalInfo.fanClubName}
                        titleStyle={titleStyle}
                    />
                </Card>
                <div className="cards">
                    <div style={{ width: '28%' }} >
                    <Card className="leftCard card">
                        <CardMedia>
                            <img src={this.props.portalInfo.logo} alt="Logo" style={{ width: '90px' }} />
                        </CardMedia>
                        <CardHeader className="leftCardHeader"
                            title={this.props.portalInfo.fanClubLocation}
                            subtitle={<p>Founded:   {this.props.portalInfo.createDate}
                                <br />  Last update:  {this.props.portalInfo.lastUpdate}</p>}
                        />
                    </Card>
                    </div>
                    <div className="rightSideCards">
                        <Card className="rightCard card">
                            <CardText>
                                <h2> Description </h2>
                                <p>{this.props.portalInfo.description}</p>
                            </CardText>
                        </Card>
                        <Card className="bottomRightCard card">
                            <CardText>
                                <h2> Upcoming Events</h2>

                                {this.props.portalEvents.map((event) => (
                                    <Card key={event.id}>
                                        <CardHeader
                                            titleStyle={{fontSize:'20px'}}
                                            title={event.description}
                                        />
                                        <CardText>
                                            <span style={{fontWeight:'900'}}>Date </span>{event.date} {event.time}<br />
                                            <span style={{fontWeight:'900'}}>Location  </span> {event.location}<br />
                                            <span style={{fontWeight:'900'}}>Theme  </span> {event.theme}<br />
                                        </CardText>
                                    </Card>
                                ))}
                            </CardText>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    const { portalInfo, portalEvents } = appState.app
    //If there's no fan portal logo use place holder
    if (portalInfo.logo === '') {
        portalInfo.logo = "http://via.placeholder.com/100x100"
    }

    return {
        portalInfo,
        portalEvents
    }
}

export default connect(mapStateToProps)(PortalView)