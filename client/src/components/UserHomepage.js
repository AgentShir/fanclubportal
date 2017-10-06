import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { getUserPortalInfo, resetUserHomepage } from '../actions/app'
import EventList from './EventList'
import { Card, CardText, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { Tabs, Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign:'center',
    backgroundColor: '#E8D5D8'
}
const cardHeaderStyle = {
    textAlign: 'center',
    backgroundColor: '#196E8F'
}
const titleStyle = {
    fontSize: '50px'
}
const tabStyle = {
    backgroundColor: '#E78A78'
}
const inkBarStyle = {
    backgroundColor: 'black'
}
const tab = {
    color: 'black'
}

class UserHomepage extends Component {
    componentWillMount() {
        let portalId = localStorage.getItem('portalId')
        if (portalId !== 'null') {
            getUserPortalInfo(portalId)
        }
    }
    componentWillUnmount() {
        this.setState({})
        resetUserHomepage()
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
                {localStorage.getItem('userId') !== 'null'
                    ? <div>
                        <Card style={cardStyle} className="headerCard">
                            <CardHeader style={cardHeaderStyle} className="mainHeader"
                                title={"Welcome " + localStorage.getItem('username')}
                                titleStyle={titleStyle}
                            />
                        </Card>
                        <Tabs
                            tabItemContainerStyle={tabStyle}
                            inkBarStyle={inkBarStyle} >
                            <Tab label="home" buttonStyle={tab}>
                                <Card>
                                    <CardText>
                                        {localStorage.getItem('portalId') === 'null'
                                            ? <div>
                                                <h3>You can create your own fan portal. </h3>
                                                <FlatButton label="Create Portal" type="submit" onClick={this.addPortal} />
                                            </div>
                                            : <div>
                                                <h3> Update your Portal</h3>
                                                <FlatButton label="Update Portal" type="submit" onClick={this.updatePortal} />
                                            </div>
                                        }
                                    </CardText>
                                </Card>
                            </Tab>
                            {localStorage.getItem('portalId') !== 'null' &&
                                <Tab label={this.props.userPortalInfo.fanClubName + " Upcoming Events"} buttonStyle={tab}>
                                    <Card >
                                        <CardText>
                                            <FlatButton label="Add Event" type="submit" onClick={this.addEvent} />
                                            <EventList events={this.props.userPortalEvents} />
                                        </CardText>
                                    </Card>
                                </Tab>}
                            <Tab label="Portals I'm following" buttonStyle={tab}>
                                <Card>
                                    <CardText>
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
    const { userPortalInfo, userPortalEvents } = appState.app
    return {
        userPortalInfo,
        userPortalEvents
    }
}

export default connect(mapStateToProps)(Authorize(UserHomepage))
