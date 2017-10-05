import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
}

class AboutUs extends Component {
    render(){
        return(
          <div className="portalContainer">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle title="About Us" />
                    <CardText>
                      <p>Fan Portals was born out of Shireen's desparate search for other US Soccer fans.</p>
                      <p>She was visiting Los Angeles for a wedding, but didn't know where the local fans met up.</p>
                      <p>Fan Portals started out as a way to connect sports fans, but evolved to be a portal for ALL fans.</p>
                    </CardText>
                    <CardTitle title="Meet the Team" />
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
                    <CardTitle title="Acknowledgements" />
                      <CardText>
                        <p><a href="http://sweeney.vegas/" rel="noopener noreferrer" target="_blank">Sweeney.Vegas</a></p>
                        <p><a href="http://jacobson.vegas/" rel="noopener noreferrer" target="_blank">Jacobson.Vegas</a></p>
                      </CardText>
                </CardHeader>
            </Card>
          </div>
        )
    }
}
export default AboutUs
