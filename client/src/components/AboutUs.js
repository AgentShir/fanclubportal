import React, { Component } from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import logo from '../images/aboutus.png';
import team from '../images/team.png';
import thanks from '../images/acknowledge.png';

const cardStyle = {
    maxWidth: '90%',
    margin: '50px auto',
    backgroundColor: '#FFFFFF'
}

class AboutUs extends Component {
    render(){
        return(
          <div className="portalContainer">
            <Card style={cardStyle}>
              <CardHeader>
                <div className="imageAlign">
                  <img src={logo} alt="About Us" className="aboutUs" />
                </div>
                    <div className="textWrap">
                      <div className="textInner">
                        <p>Fan Portals was born out of Shireen's desperate search for other US Soccer fans.</p>
                        <p>She was visiting Los Angeles for a wedding, but didn't know where the local fans met up to watch</p>
                        <p>the match. Fan Portals started out as a way to connect sports fans, but evolved to be a portal</p>
                        <p>for ALL kinds of fans.</p>
                      </div>
                    </div>
                      <div className="imageAlign">
                        <img src={team} alt="Meet the Team" className="team" />
                      </div>
                      <div className="textWrap">
                        <div className="textInner">
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
                      </div>
                      </div>
                      <div className="imageAlign">
                        <img src={thanks} alt="Acknowledgements" className="thanks"/>
                      </div>
                        <div className="textWrap">
                          <div className="textInner">
                            <p><a href="http://sweeney.vegas/" rel="noopener noreferrer" target="_blank">Sweeney.Vegas</a></p>
                            <p><a href="http://jacobson.vegas/" rel="noopener noreferrer" target="_blank">Jacobson.Vegas</a></p>
                            <p><a href="http://logomakr.com" rel="noopener noreferrer" target="_blank">Logomakr.com</a></p>
                          </div>
                        </div>
                </CardHeader>
            </Card>
          </div>
        )
    }
}
export default AboutUs
