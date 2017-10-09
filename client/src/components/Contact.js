import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import contact from '../images/contact.png'

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
    backgroundColor: '#FFFFFF'
}

const cardText = {
  textAlign: 'center'
}

const i = {
  padding: '3px'
}

class Contact extends Component {
    render(){
        return(
          <Card style={cardStyle}>
            <CardHeader>
              <div className="imageAlign">
                <img src={contact} alt='Contact Us' className="contactUs"/>
              </div>
              <div className="imageAlign">
                  <CardTitle subtitle="Use the icons to contact us!" />
                </div>
              <div className="imageAlign">
                <CardText style={cardText}>
                  <a href="mailto:fanclubportals@gmail.com?Subject=Greetings" rel="noopener noreferrer" target="_blank"><i className="fa fa-envelope fa-4x" style={i}/></a>
                  <a href="https://www.facebook.com/fanportals/" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook-square fa-4x" style={i} aria-label="Fan Club Portals on Facebook"></i></a>
                  <a href="http://starwarsrebels.wikia.com/wiki/Star_Wars_Rebels_Wiki" rel="noopener noreferrer" target="_blank"><i className="fa fa-rebel fa-4x" style={i} aria-label="Star Wars Rebels Wiki"></i></a>
                  <a href="https://github.com/AgentShir/fanclubportals" rel="noopener noreferrer" target="_blank"><i className="fa fa-github fa-4x"  style={i} aria-label="View our repository on GitHub"></i></a>
                  <a href="https://twitter.com/fanportals" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter fa-4x" style={i}></i></a>
                  <a href="https://www.instagram.com/fanportals/" rel="noopener noreferrer" target="_blank"><i className="fa fa-instagram fa-4x" style={i}></i></a>
                  <a href="http://www.501st.com/" rel="noopener noreferrer" target="_blank"><i className="fa fa-empire fa-4x" style={i} aria-label="501st Legion"></i></a>
                </CardText>
                </div>
            </CardHeader>
          </Card>
        )
    }
}
export default Contact
