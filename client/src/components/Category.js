import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import placeholder from '../images/logo_dk_blue.png'
import { getPortalsByCategory, resetCategory } from '../actions/app'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const cardStyle = {
    maxWidth: '1000px',
    margin: '10px auto',
    textAlign: 'center'

}
const overlayContainer={
    background: 'transparent !important',
    textShadow:'2px 2px #002642'
}
const overlayContent={
    background:'transparent !important'
}
const h1Style={
    fontSize: '50px'
  }
class Category extends Component {
    componentWillMount() {
        let categoryId = this.props.match.params.categoryId
        getPortalsByCategory(categoryId)
    }
    componentWillUnmount() {
        resetCategory()
    }
    render() {
        return (
            <div className="portalContainer">
                {this.props.categoryName !== undefined
                    ? <div>
                        <h1 style={h1Style}>{this.props.categoryName}</h1>
                        <div className="cards" >
                            {this.props.portals.map((portal) => (
                                <Card key={portal.id} className="categoryCard">
                                    <Link key={portal.id} to={`/portal/${portal.id}`} className="link">
                                        <CardMedia
                                            overlay={<CardTitle title={portal.fanClubName}/>}
                                            overlayContainerStyle={overlayContainer}
                                            overlayContentStyle={overlayContent }
                                        >
                                            {portal.logo
                                                ? <img src={portal.logo} alt="logo" />
                                                : <img src={placeholder} alt="logo" />}
                                        </CardMedia>
                                    </Link>
                                </Card>
                            ))}
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

const stateToProps = function (appState) {
    const { portals } = appState.app
    var categoryName
    if (portals[0] !== undefined) {
        categoryName = portals[0].category
    }
    return {
        portals,
        categoryName
    }
}

export default connect(stateToProps)(Category)
