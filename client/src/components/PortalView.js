import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPortalInfo } from '../actions/app'
import { Card, CardText, CardHeader, CardMedia } from 'material-ui/Card'

const cardStyle = {
    maxWidth: '1000px',
    margin: '30px auto',

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
                    <Card className="leftCard card">
                        <CardMedia>
                             <img src={this.props.portalInfo.logo} alt="Logo" style={{width:'90px'}} />
                        </CardMedia>
                        <CardHeader className="leftCardHeader"
                            title={this.props.portalInfo.fanClubLocation}
                            subtitle={<p>Founded:   {this.props.portalInfo.createDate}
                                <br/>  Last update:  {this.props.portalInfo.lastUpdate}</p>}
                        />
                    </Card>
                    <div className="rightSideCards">
                        <Card className="rightCard card">
                            <CardText>
                                <h4> Description </h4>
                                <p>{this.props.portalInfo.description}</p>
                            </CardText>
                        </Card>
                        <Card className="bottomRightCard card">
                            <CardText>
                                <h4> Upcoming Events</h4>
                            </CardText>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    const { portalInfo } = appState.app
    //If there's no fan portal logo use place holder
    if(portalInfo.logo === ''){
        portalInfo.logo = "http://via.placeholder.com/100x100"
    }
    return {
        portalInfo
    }
}

export default connect(mapStateToProps)(PortalView)