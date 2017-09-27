import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { postPortals } from '../actions/app'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { getPortalInfo} from '../actions/app'


const cardStyle = {
    maxWidth: '1000px',
    margin: '50px auto',
}
const buttonStyle = {
    textAlign: 'right'
}
const errorMessageStyle = {
    fontSize: '20px'
  }
class CreatePortal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fanClubName: '',
            fanClubLocation: '',
            teamName: '',
            teamLocation: '',
            logo: '',
            description: '',
            portalInfo:{}
        }
    }

    componentWillMount(){
      if (localStorage.getItem(portalId) !== 'null'){
        getPortalInfo(localStorage.getItem(portalId))
      } else {
          this.setState({portalInfo:{}})
      }
    }
    componentWillReceiveProps(props) {
        if (props.errorMessage.length > 0) {
            this.setState({ expanded: true })
        } else {
            this.setState({ expanded: false })
            this.props.history.push('/portal/'+ props.portalId)
        }
    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        postPortals(this.state)
        this.setState({ fanClubName: '', fanClubLocation: '', teamName: '', teamLocation: '', logo: '', description: '' })
    }

    render() {
        return (
            <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardTitle title="Fan Club Portal" />
                <CardText expandable={true} color={'red'} style={errorMessageStyle}>
                    {this.props.errorMessage}
                </CardText>
                <form onSubmit={this.handleSubmit}>
                    <CardText>
                        <TextField
                            hintText="Fan Club Name"
                            floatingLabelText="Fan Club Name"
                            name="fanClubName"
                            autoComplete="off"
                            fullWidth={true} required={true}
                            onChange={this.handleChange}
                        /><br />
                        <TextField
                            hintText="Fan Club Location"
                            floatingLabelText="Fan Club Location"
                            name="fanClubLocation"
                            autoComplete="off"
                            fullWidth={true} required={true}
                            onChange={this.handleChange}
                        /><br />
                        <TextField
                            hintText="Team Name"
                            floatingLabelText="Team Name"
                            name="teamName"
                            autoComplete="off"
                            fullWidth={true} required={true}
                            onChange={this.handleChange}
                        /><br />
                        <TextField
                            hintText="Team Location"
                            floatingLabelText="Team Location"
                            name="teamLocation"
                            autoComplete="off"
                            fullWidth={true} required={true}
                            onChange={this.handleChange}
                        /><br />
                        <TextField
                            hintText="Team Logo URL"
                            floatingLabelText="Enter a URL for the Team Logo"
                            name="logo"
                            autoComplete="off"
                            fullWidth={true} required={false}
                            onChange={this.handleChange}
                            type='URL'
                        /><br />
                        <TextField
                            hintText="Description"
                            floatingLabelText="Description"
                            name="description"
                            autoComplete="off"
                            fullWidth={true} required={false}
                            onChange={this.handleChange}
                        /><br />

                    </CardText>
                    <CardActions style={buttonStyle}>
                        <FlatButton label="Submit" type="Submit" />
                    </CardActions>
                </form>
            </Card>
        )
    }
}
function mapStateToProps(appState) {
    const { errorMessage, portalId } = appState.app
    return {
        errorMessage,
        // portalInfo:Object.assign({},portalInfo)
        portalId
    }
}
export default connect(mapStateToProps)(Authorize(CreatePortal))
