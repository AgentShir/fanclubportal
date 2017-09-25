import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 800,
  width: 1000,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

class AboutUs extends Component {
    render(){
        return(
          <div>
            <h1>AboutUs</h1>
                <Paper style={style} zDepth={2} />
          </div>
        )
    }
}
export default AboutUs
