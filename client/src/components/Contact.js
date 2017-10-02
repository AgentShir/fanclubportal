import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
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
              <CardTitle title="Contact" />
                <CardTitle subtitle="Use the icons to contact us!" />
                <CardText style={cardText}>
                  <a href="mailto:fanclubportals@gmail.com?Subject=Greetings" rel="noopener noreferrer" target="_blank"><i className="fa fa-envelope fa-4x" style={i}/></a>
                  <a href="https://www.facebook.com/fanportals/" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook-square fa-4x" style={i} aria-label="Fan Club Portals on Facebook"></i></a>
                  <i className="fa fa-rebel fa-4x" aria-hidden="true" style={i}></i>
                  <a href="https://github.com/AgentShir/fanclubportals" rel="noopener noreferrer" target="_blank"><i className="fa fa-github fa-4x"  style={i} aria-label="View our repository on GitHub"></i></a>
                  <a href="https://twitter.com/fanportals" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter fa-4x" style={i}></i></a>
                  <a href="https://www.instagram.com/fanportals/" rel="noopener noreferrer" target="_blank"><i className="fa fa-instagram fa-4x" style={i}></i></a>
                  <i className="fa fa-empire fa-4x" aria-hidden="true" style={i}></i>
                </CardText>
            </CardHeader>
          </Card>
        )
    }
}
export default Contact
