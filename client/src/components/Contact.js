import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 600,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

class Contact extends Component {
    render(){
        return(
          <div>
            <h1>Contact</h1>
              <Paper style={style} zDepth={2} />
          </div>
        )
    }
}
export default Contact
