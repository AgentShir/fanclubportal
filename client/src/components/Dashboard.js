import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { getUserPortalInfo, resetDashboard, getFollowingPortals } from '../actions/app'
import EventList from './EventList'
import FollowingPortalList from './FollowingPortalList'
import { Card, CardText, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign: 'center',
    backgroundColor:'#E78A78'
}
const tabCard ={
    backgroundColor:'#CECED8'
}
const cardHeaderStyle = {
    textAlign: 'center',
    backgroundColor: '#196E8F',
}
const titleStyle = {
    whiteSpace: 'normal',
    fontSize: '50px',
    color:'#000000'
}
const tabStyle = {
    whiteSpace: 'normal',
    backgroundColor: '#EEEEF1'
}
const inkBarStyle = {
    backgroundColor: 'black'
}
const tab = {
    color: 'black'
}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0,
            showProgress: true
        }
    }
    componentWillMount() {
        let portalId = localStorage.getItem('portalId')
        let userId = localStorage.getItem('userId')
        this.setState({ tabIndex: this.props.match.params.tabId })
        if (portalId !== 'null') {
            getUserPortalInfo(portalId, userId)
            getFollowingPortals(userId)
        }
    }
    componentWillReceiveProps(props) {
        if (localStorage.getItem('portalId') !== null && props.userPortalInfo.fanClubName === undefined) {
            this.setState({ showProgress: true })
        } else {
            this.setState({ showProgress: false })
        }
    }
    componentWillUnmount() {
        this.setState({})
        resetDashboard()
    }
    addEvent = (e) => {
        this.props.history.push(`/${localStorage.portalId}/addEvent`)
    }
    updatePortal = (e) => {
        this.props.history.push(`/updatePortal/${localStorage.portalId}`)
    }
    addPortal = (e) => {
        this.props.history.push(`/addPortal`)
    }

    render() {
        return (
            <div className="portalContainer">
                {this.state.showProgress === false
                    ? <div>
                        <Card style={cardStyle} className="headerCard">
                            <CardHeader style={cardHeaderStyle} className="mainHeader"
                                title={"Welcome " + localStorage.getItem('username')}
                                titleStyle={titleStyle}
                            />
                        </Card>
                        <Tabs
                            tabItemContainerStyle={tabStyle}
                            inkBarStyle={inkBarStyle}
                            initialSelectedIndex={Number(this.state.tabIndex)} >
                            <Tab label="home" buttonStyle={tab}>
                                <Card style={tabCard}>
                                    <CardText>
                                        {localStorage.getItem('portalId') === 'null'
                                            ? <div>
                                                <h3>You can create your own fan portal. </h3>
                                                <FlatButton label="Create Portal" type="submit" onClick={this.addPortal} hoverColor='#31708E'/>
                                            </div>
                                            : <div>
                                                <h3> Update your Portal</h3>
                                                <FlatButton label="Update Portal" type="submit" onClick={this.updatePortal} hoverColor='#31708E' />
                                            </div>
                                        }
                                    </CardText>
                                </Card>
                            </Tab>
                            {localStorage.getItem('portalId') !== 'null' &&
                                <Tab label={this.props.userPortalInfo.fanClubName + " Upcoming Events"} buttonStyle={tab}>
                                    <Card style={tabCard}>
                                        <CardText>
                                            <FlatButton label="Add Event" type="submit" onClick={this.addEvent} hoverColor='#31708E' />
                                            <EventList events={this.props.userPortalEvents} />
                                        </CardText>
                                    </Card>
                                </Tab>}
                            <Tab label="Portals I'm following" buttonStyle={tab}>
                                <Card style={tabCard}>
                                    <CardText>
                                        <FollowingPortalList portals={this.props.followingPortals} />
                                    </CardText>
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                    : <Card style={cardStyle} className="headerCard">
                        <CircularProgress size={80} thickness={5} />
                    </Card>
                }
            </div>
        )
    }
}

const mapStateToProps = function (appState) {
    const { userPortalInfo, userPortalEvents, followingPortals } = appState.app
    return {
        userPortalInfo,
        userPortalEvents,
        followingPortals
    }
}

export default connect(mapStateToProps)(Authorize(Dashboard))
