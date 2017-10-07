import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import logo from '../images/aboutus.png';
import team from '../images/team.png';
import thanks from '../images/acknowledge.png';

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
    backgroundColor: '#E8D5D8'
}

const cardText = {
  maxWidth: '100%',
  overflow: 'hidden',
  wordWrap: 'break-word'
}

class AboutUs extends Component {
    render(){
        return(
          <div className="portalContainer">
            <Card style={cardStyle}>
              <CardHeader>
                <CardMedia>
                  <img src={logo} alt="About Us"/>
                </CardMedia>
                    <CardText style={cardText}>
                      Fan Portals was born out of Shireen's desparate search for other US Soccer fans.  She was visiting Los Angeles for a wedding, but didn't know where the local fans met up.  Fan Portals started out as a way to connect sports fans, but evolved to be a portal for ALL fans.
                    </CardText>
                      <CardMedia>
                        <img src={team} alt="Meet the Team" style={{height: '30%', width: '20%'}}/>
                      </CardMedia>
                      <CardText>
                        <p>About Diana</p>
                          <ul>
                            <li>AKA: Master of the Visual Daggers </li>
                            <li>Fan of: Arrested Development, Archer, and food... mainly bacon. </li>
                          </ul>
                        <p>About Phil</p>
                          <ul>
                            <li>AKA: The Man, The Myth, The Legend</li>
                            <li>Fan of: Sci fi adventurer</li>
                          </ul>
                        <p>About Shireen</p>
                          <ul>
                            <li>AKA: The Snack Queen</li>
                            <li>Fan of: Doctor Who, Harry Potter, Ryan Gosling, bullet journaling, La La Land, and FOOD.</li>
                          </ul>
                      </CardText>
                      <CardMedia>
                        <img src={thanks} alt="Acknowledgements" />
                      </CardMedia>
                      <CardText>
                        <p><a href="http://sweeney.vegas/" rel="noopener noreferrer" target="_blank">Sweeney.Vegas</a></p>
                        <p><a href="http://jacobson.vegas/" rel="noopener noreferrer" target="_blank">Jacobson.Vegas</a></p>
                        <p><a href="http://logomakr.com" rel="noopener noreferrer" target="_blank">Logomakr.com</a></p>
                      </CardText>
                </CardHeader>
            </Card>
          </div>
        )
    }
}
export default AboutUs
