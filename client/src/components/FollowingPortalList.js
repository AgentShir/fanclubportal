import React, { Component } from 'react'
import { Authorize } from '../lib/auth'
import { Link } from 'react-router-dom'
import placeholder from '../images/logo_dk_blue.png'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign: 'center'

}
const overlayContainer = {
    background: 'transparent !important',
    textShadow: '2px 2px gray'
}
const overlayContent = {
    background: 'transparent !important'
}
class FollowingPortalList extends Component {
    static defaultProps = {
        portals: []
    }
    render() {
        return (
            <div>
                {this.props.portals
                    ? <div className="cards" >
                        {this.props.portals.map((portal) => (
                            <Card key={portal.portalId} className="categoryCard">
                                <Link key={portal.portalId} to={`/portal/${portal.portalId}`} className="link">
                                    <CardMedia
                                        overlay={<CardTitle title={portal.fanClubName} />}
                                        overlayContainerStyle={overlayContainer}
                                        overlayContentStyle={overlayContent}
                                    >
                                        {portal.logo
                                            ? <img src={portal.logo} alt="logo" />
                                            : <img src={placeholder} alt="logo" />}
                                    </CardMedia>
                                </Link>
                            </Card>
                        ))}
                    </div>
                    : <Card style={cardStyle} className="headerCard">
                        <CircularProgress size={80} thickness={5} />
                    </Card>
                }
            </div>
        )
    }
}
export default Authorize(FollowingPortalList)