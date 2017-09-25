import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postPortals} from '../actions/app'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'




const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
}
const buttonStyle = {
    textAlign: 'right'
}

class CreatePortal extends Component {
    constructor(props) {
    super(props)
    this.state = {
      fanClubName: '',
      fanClubLocation: '',
      teamName: '',
      teamLocation: '',
      description: ''
  }
}

componentWillReceiveProps(props) {
if (props.errorMessage.length > 0) {
  this.setState({ expanded: true })
    } else {
      this.setState({ expanded: false })
        this.props.history.push('/')
    }
  }

  handleChange = (e) => {
    console.log('in handleChange', e.target.value)
    	this.setState({
    		  [e.target.name]: e.target.value
  	})
  }
  handleSubmit = (e) => {
          e.preventDefault()
          postPortals(this.state)
          this.setState({fanClubName: '',fanClubLocation: '',teamName: '', teamLocation: '', description: '',})
      }


    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <Card style={cardStyle}>
                <CardTitle title= "Fan Club Portal" />
                <CardText>
                    <TextField
                        hintText="Fan Club Name"
                        floatingLabelText="Fan Club Name"
                        name="fanClubName"
                        onChange={this.handleChange}
                        fullWidth={true} required={true}
                    /><br />
                    <TextField
                        hintText="Fan Club Location"
                        floatingLabelText="Fan Club Location"
                        name="fanClubLocation"
                        onChange={this.handleChange}
                        fullWidth={true} required={true}
                    /><br />
                    <TextField
                        hintText="Team Name"
                        floatingLabelText="Team Name"
                        name="teamName"
                        onChange={this.handleChange}
                        fullWidth={true} required={true}
                    /><br />
                    <TextField
                        hintText="Team Location"
                        floatingLabelText="Team Location"
                        name="teamLocation"
                        onChange={this.handleChange}
                        fullWidth={true} required={true}
                    /><br />
                    <TextField
                        hintText="Description"
                        floatingLabelText="Description"
                        name="description"
                        onChange={this.handleChange}
                        fullWidth={true}
                    /><br />

                </CardText>
                <CardActions style={buttonStyle}>
                    <FlatButton label="Submit" type="Submit" />
                </CardActions>
            </Card>
          </form>

        )
    }
}
    function mapStateToProps(appState) {
    const { errorMessage} = appState.app
    return {
        errorMessage
    }
}
export default connect(mapStateToProps)(CreatePortal)
