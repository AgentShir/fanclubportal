import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import placeholder from '../images/logo_dk_blue.png'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'

const overlayContainer={
    background: 'transparent !important',
    textShadow:'2px 2px gray'
}
const overlayContent={
    background:'transparent !important'
}
class SearchResults extends Component {
    static defaultProps = {
        portals: []
    }
    render() {
        return (
            <div className="cards" >
                {this.props.portals.map((portal) => (
                    <Card key={portal.id} className="categoryCard">
                        <Link key={portal.id} to={`/portal/${portal.id}`} className="link">
                            <CardMedia
                                overlay={<CardTitle title={portal.fanClubName}  />}
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
        )
    }
}
export default SearchResults
