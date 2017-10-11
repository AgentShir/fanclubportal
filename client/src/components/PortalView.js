import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPortalInfo, resetPortalView, followPortal, unFollowPortal } from '../actions/app'
import placeholder from '../images/logo_dk_blue.png'
import { Card, CardText, CardHeader, CardMedia, CardActions } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign: 'center',
    backgroundColor: '#FFFFFF'

}
const h2Style={
    color:'black'
}
const cardHeaderStyle = {
    textAlign: 'center'
}
const titleStyle = {
    fontSize: '50px',
    whiteSpace: 'normal',
    fontFamily: 'Libre Franklin, sans-serif',
    color:'#85C0EA'
}
const errorMessageStyle = {
    fontSize: '20px'
}
const buttonStyle = {
    textAlign: 'center',
    padding:'20px'
}
class PortalView extends Component {
    state = {
        expanded: false,
        following:false
    }
    componentWillMount() {
        let portalId = this.props.match.params.portalId
        let userId = localStorage.getItem('userId')
        getPortalInfo(portalId, userId)
    }

    componentWillUnmount() {
        this.setState({})
        resetPortalView()
    }

    componentWillReceiveProps(props) {
        let portalId = Number(props.match.params.portalId)
        if (portalId !== props.portalInfo.id) {
            this.setState({})
            let userId = localStorage.getItem('userId')
            getPortalInfo(portalId, userId)
        }
        if (props.gotInfo === 'fail') {
            this.setState({ expanded: true })
        }else if(props.gotInfo === 'success'){
            if(props.portalInfo.alreadyFollow !== null){
                this.setState({following:props.portalInfo.alreadyFollow})
            }
        }
        if(props.followStatus === 'success'){
            this.setState({following:true})
        }
        if(props.unFollowStatus === 'success'){
            this.setState({following:false})
        }
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    }
    followPortal = (e) => {
        e.preventDefault()
        if(!this.props.isAuthenticated){
            this.props.history.push('/login')
        }else{
            console.log(portalId, userId)
            let portalId = this.props.match.params.portalId
            let userId = localStorage.getItem('userId')
            followPortal(portalId,userId)
        }
    }
    unFollowPortal = (e) => {
        e.preventDefault()
        let portalId = this.props.match.params.portalId
        let userId = localStorage.getItem('userId')
        unFollowPortal(portalId,userId)
    }
    render() {
        return (
            <div className="portalContainer">
                {this.props.gotInfo !== ''
                    ? <div>
                        {this.props.gotInfo === 'fail'
                            ? <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                                <CardText expandable={true} color={'red'} style={errorMessageStyle}>
                                    {this.props.errorMessage}
                                </CardText>
                            </Card>
                            : <div>< Card style={cardStyle} className="headerCard">
                                <CardHeader style={cardHeaderStyle} className="mainHeader"
                                    title={this.props.portalInfo.fanClubName}
                                    titleStyle={titleStyle}
                                />
                            </Card>
                                <div className="portalViewCards">
                                    <div className='leftSide'>
                                        <Card className="leftCard card">
                                            <CardMedia>
                                                {this.props.portalInfo.logo
                                                    ? <img src={this.props.portalInfo.logo} alt="Logo" />
                                                    : <img src={placeholder} alt="logo" />
                                                }
                                            </CardMedia>
                                            {this.state.following === false
                                                ? <CardActions style={buttonStyle}>
                                                    <RaisedButton label="Follow" type="submit" onClick={this.followPortal} />
                                                </CardActions>
                                                : <CardActions style={buttonStyle}>
                                                    <RaisedButton label="Un-Follow" type="submit" onClick={this.unFollowPortal} />
                                                </CardActions>
                                            }
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
                                                <h2 style={h2Style}>Description</h2>
                                                <p>{this.props.portalInfo.description}</p>
                                            </CardText>
                                        </Card>
                                        <Card className="bottomRightCard card">
                                            <CardText>
                                                <h2 style={h2Style}>Upcoming Events</h2>
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
                        }
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
    const { portalInfo, portalEvents, gotInfo, errorMessage, followStatus, followMessage, unFollowStatus, unFollowMessage } = appState.app
    const { isAuthenticated} = appState.auth
    return {
        portalInfo,
        portalEvents,
        gotInfo,
        errorMessage,
        isAuthenticated,
        followStatus,
        followMessage,
        unFollowStatus,
        unFollowMessage
    }
}

export default connect(mapStateToProps)(PortalView)
