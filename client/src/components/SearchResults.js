import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import placeholder from '../images/square_logo.png'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'

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
                                overlay={<CardTitle title={portal.fanClubName} style={{ background: 'transparent' }} />}
                                overlayContainerStyle={{ background: 'transparent' }}
                                overlayContentStyle={{ background: 'transparent' }}
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
