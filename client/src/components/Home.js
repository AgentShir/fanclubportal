import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPortalCategories } from '../actions/app'
import { Card, CardActions, CardText, CardTitle, CardHeader, CardMedia } from 'material-ui/Card'

class Home extends Component {
  componentWillMount() {
    getPortalCategories()
  }

  render() {
    return (
      <div className="portalContainer">
        <h1>Explore</h1>
        <div className="cards" >
          {this.props.portalCategories.map((category) => (
              <Card key={category.id} className="categoryCard">
              <Link key={category.id} to={`/category/${category.id}`} className="link">
                <CardMedia>
                  <img src="http://via.placeholder.com/350x150" />
                </CardMedia>
                <CardTitle title={category.category} />
                </Link>
              </Card>
          ))}
        </div>
      </div>
    )
  }
}

const stateToProps = function (appState) {
  const { portalCategories } = appState.app
  return {
    portalCategories
  }
}

export default connect(stateToProps)(Home)