import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText, CardTitle, CardHeader, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'


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
    render() {
        return (
            <div className="portalContainer">
                <Card style={cardStyle} className="headerCard">
                    <CardHeader style={cardHeaderStyle}
                        title="fan club name"
                        titleStyle={titleStyle}
                    />
                </Card>
                <div className="cards">
                    <Card className="leftCard card">
                        <CardMedia>
                            <img src="http://via.placeholder.com/100x100" alt="Logo" />
                        </CardMedia>
                        <CardText>
                            <h1> left col </h1>
                        </CardText>
                    </Card>
                    <div className="rightSideCards">
                        <Card className="rightCard card">
                            <CardText>
                                <h1> right col </h1>
                            </CardText>
                        </Card>
                        <Card className="bottomRightCard card">
                            <CardText>
                                <h1> bottom right col </h1>
                            </CardText>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    const { isAuthenticated, errorMessage, isFetching } = appState.auth
    return {
        isAuthenticated,
        isFetching,
        errorMessage
    }
}

export default connect(mapStateToProps)(PortalView)