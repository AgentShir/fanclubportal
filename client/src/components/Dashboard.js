import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { getUserPortalInfo, resetDashboard, getFollowingPortals, getMonthEvents } from '../actions/app'
import EventList from './EventList'
import FollowingPortalList from './FollowingPortalList'
import UpcomingEvents from './UpcomingEvents'
import { Card, CardText, CardHeader } from 'material-ui/Card'
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress'
import CreateIcon from 'material-ui/svg-icons/content/create'
import RaisedButton from 'material-ui/RaisedButton'
import ExploreIcon from 'material-ui/svg-icons/action/explore'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign: 'center',
    backgroundColor:'#FFFFFF'
}
const cardHeaderStyle = {
    textAlign: 'center',
    fontFamily: 'Libre Franklin, sans-serif',
    color:'#85C0EA'
}
const titleStyle = {
    whiteSpace: 'normal',
    fontSize: '50px'
}
const tabStyle = {
    whiteSpace: 'normal',
    backgroundColor: '#EEEEF1'
}
const inkBarStyle = {
    backgroundColor: '#85C0EA'
}
const tab = {
    color: 'black'
}

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};
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
        console.log(' hi')
        this.setState({ tabIndex: this.props.match.params.tabId })
        if (portalId !== 'null') {
            getUserPortalInfo(portalId, userId)
        } else {
            getFollowingPortals(userId)
            getMonthEvents(userId)
            this.setState({ showProgress: false })
        }
    }
    componentWillReceiveProps(props) {
        if (localStorage.getItem('portalId') !== 'null' && props.userPortalInfo.fanClubName === undefined) {
            this.setState({ showProgress: true })
        } else {
            this.setState({ showProgress: false })
        }

        if(props.eventRsvpStatus === 'success'){
            let userId = localStorage.getItem('userId')
            getMonthEvents(userId)
            this.setState({ showProgress: true, tabIndex:2 })
        }
    }
    componentWillUnmount() {
        this.setState({})
        resetDashboard()
    }
    addEvent = (e) => {
        e.preventDefault()
        this.props.history.push(`/${localStorage.portalId}/addEvent`)
    }
    updatePortal = (e) => {
        e.preventDefault()
        this.props.history.push(`/updatePortal/${localStorage.portalId}`)
    }
    addPortal = (e) => {
        e.preventDefault()
        this.props.history.push(`/addPortal`)
    }
    explore = (e) => {
        e.preventDefault()
        this.props.history.push('/')
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
                                <Card>
                                    <CardText>
                                        {localStorage.getItem('portalId') === 'null'
                                            ? <div style={{display:'inline-block'}}>
                                                {/* <h3>You can create your own fan portal. </h3> */}
                                                <RaisedButton
                                                    label="Create Portal"
                                                    style={styles.button}
                                                    type="submit"
                                                    onClick={this.addPortal}
                                                    icon={<CreateIcon />}
                                                />
                                            </div>
                                            : <div style={{display:'inline-block'}}>
                                                {/* <h3> Update your Portal</h3> */}
                                                <RaisedButton
                                                    label="Update Portal"
                                                    style={styles.button}
                                                    type="submit"
                                                    onClick={this.updatePortal}
                                                    icon={<CreateIcon />}
                                                />
                                            </div>
                                        }
                                        <RaisedButton
                                            label="Explore"
                                            style={styles.button}
                                            type="submit"
                                            onClick={this.explore}
                                            icon={<ExploreIcon />}
                                        />
                                        {this.props.followingPortals.length > 0 &&
                                        <div className='portalContainer'><h3>Portals I'm following</h3>
                                        <FollowingPortalList portals={this.props.followingPortals} />
                                       </div>}
                                    </CardText>
                                </Card>
                            </Tab>
                            {localStorage.getItem('portalId') !== 'null' &&
                                <Tab label={this.props.userPortalInfo.fanClubName + " Upcoming Events"} buttonStyle={tab}>
                                    <Card>
                                        <CardText>
                                            <RaisedButton label="Add Event" type="submit" onClick={this.addEvent} />
                                            <EventList events={this.props.userPortalEvents} />
                                        </CardText>
                                    </Card>
                                </Tab>}
                            {this.props.followingPortals.length > 0 &&
                            <Tab label="Happening This Month" buttonStyle={tab}>
                                <Card>
                                    <CardText>
                                        <UpcomingEvents events={this.props.monthEvents} />
                                    </CardText>
                                </Card>
                            </Tab>}
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
    const { userPortalInfo, userPortalEvents, followingPortals, monthEvents, eventRsvpStatus } = appState.app
    console.log(appState.app)
    return {
        userPortalInfo,
        userPortalEvents,
        followingPortals,
        monthEvents,
        eventRsvpStatus
    }
}

export default connect(mapStateToProps)(Authorize(Dashboard))
