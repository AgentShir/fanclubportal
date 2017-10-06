import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import placeholder from '../images/square_logo.png'
import SearchResults from './SearchResults'
import { getPortalCategories, searchPortals, resetHome } from '../actions/app'
import { Card, CardTitle, CardMedia, CardText } from 'material-ui/Card'
import SearchBar from 'material-ui-search-bar'
import explore from '../images/explore.png'

const searchStyle = {
  margin: '50px auto',
  maxWidth: '1000px'
}
const errorMessageStyle = {
  fontSize: '20px'
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  componentWillMount() {
    getPortalCategories()
  }
  componentWillUnmount(){
    this.setState({})
    resetHome()
  }
  handleSearch = (e) => {
    this.setState({ search: e })
  }
  requestSearch = () => {
    searchPortals(this.state.search)
    this.setState({search:''})
  }
  render() {
    return (
      <div className="portalContainer">
        <SearchBar
          value={this.state.search}
          onChange={(e) => this.handleSearch(e)}
          onRequestSearch={() => this.requestSearch()}
          style={searchStyle}
        />
        {this.props.updateStatus === 'success'
          ?<div>
            <h1>{this.props.searchMessage}</h1>
            <SearchResults portals={this.props.searchResults} />
            </div>
          : <CardText color={'red'} style={errorMessageStyle}>
            {this.props.errorMessage}
          </CardText>
          }
        <img src={explore} alt='Explore' className="explore"/>
        <div className="cards" >
          {this.props.portalCategories.map((category) => (
            <Card key={category.id} className="categoryCard">
              <Link key={category.id} to={`/category/${category.id}`} className="link">
                <CardMedia>
                  {category.logoName !== null
                    ? <img src={require('../images/categories/' + category.logoName)} alt="category" />
                    : <img src={placeholder} alt="category" />}
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
  const { portalCategories, searchResults, updateStatus, searchMessage } = appState.app
  return {
    portalCategories,
    searchResults,
    updateStatus,
    searchMessage
  }
}

export default connect(stateToProps)(Home)
