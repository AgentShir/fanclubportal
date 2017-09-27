import React, { Component } from 'react'
import Header from './Header'

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* Rendering of the page below */}
        {this.props.children}
      </div>
    )
  }
}

export default Layout