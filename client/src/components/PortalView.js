import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPortalInfo } from '../actions/app'
import placeholder from '../images/square_logo.png'
import { Card, CardText, CardHeader, CardMedia } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign:'center'

}
const cardHeaderStyle = {
    textAlign: 'center'
}
const titleStyle = {
    fontSize: '50px'
}

class PortalView extends Component {
    componentWillMount() {
        let portalId = this.props.match.params.portalId
        getPortalInfo(portalId)
    }
    componentWillReceiveProps(props){
        let portalId =Number(props.match.params.portalId)
        if(portalId !== props.portalInfo.id){
          getPortalInfo(portalId)
        }
    }
    render() {
        return (
            <div className="portalContainer">
                {this.props.portalInfo.fanClubName
                    ? <div>
                        < Card style={cardStyle} className="headerCard">
                            <CardHeader style={cardHeaderStyle} className="mainHeader"
                                title={this.props.portalInfo.fanClubName}
                                titleStyle={titleStyle}
                            />
                        </Card>
                        <div className="cards">
                            <div className='leftSide'>
                                <Card className="leftCard card">
                                    <CardMedia>
                                        {this.props.portalInfo.logo
                                        ?<img src={this.props.portalInfo.logo} alt="Logo" />
                                        :<img src={placeholder} alt="logo"/>
                                        }
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
                                                    titleStyle={{ fontSize: '20px' }}
                                                    title={event.description}
                                                />
                                                <CardText>
                                                    <span style={{ fontWeight: '900' }}>Date </span>{event.date} {event.time}<br />
                                                    <span style={{ fontWeight: '900' }}>Location  </span> {event.location}<br />
                                                    <span style={{ fontWeight: '900' }}>Theme  </span> {event.theme}<br />
                                                </CardText>
                                            </Card>
                                        ))}
                                    </CardText>
                                </Card>
                            </div>
                        </div>
                    </div>
                    : <Card style={cardStyle} className="headerCard">
                        <CircularProgress size={80} thickness={5} />
                    </Card>
                }
            </div>
        )
    }
}

function mapStateToProps(appState) {
    const { portalInfo, portalEvents } = appState.app
    return {
        portalInfo,
        portalEvents
    }
}

export default connect(mapStateToProps)(PortalView)
