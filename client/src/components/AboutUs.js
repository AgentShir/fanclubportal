import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card';

const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
}

class AboutUs extends Component {
    render(){
        return(
          <div className="wrapper">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle title="About Us" />
                    <CardText>
                      <p>Fan Club Portals was born out of a sports fan's desperation.</p>
                      <p>The sports fan needed to know what the chant was while she was in the middle of a supporters section at a soccer match.</p>
                      <p>The sports fan needed to know where to find a bar to watch the match at in Hawaii.</p>
                      <p>The sports fan needed to know where she could find the other Packers fans.</p>
                      <p>The sports fan needed to know if there would be a tailgate and a march to the match.</p>
                      <p>Fan Club Portals is a way for the fans to find other fans and build their fandom together!</p>
                    </CardText>
                    <CardTitle title="Meet the Team">
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
                    </CardTitle>
                </CardHeader>
            </Card>
          </div>
        )
    }
}
export default AboutUs
