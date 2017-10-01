import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../lib/auth'
import { postPortals, getPortalCategories } from '../actions/app'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { getPortalInfo, updatePortal, updateComplete } from '../actions/app'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'


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
            category: null,
            MenuItem: '',
            logo: '',
            description: ''
        }
    }

    componentWillMount() {
        if (localStorage.getItem('portalId') !== 'null') {
            getPortalInfo(localStorage.getItem('portalId'))
            getPortalCategories()

        } else {
            getPortalCategories()
        }
    }
    componentWillReceiveProps(props) {
        if (this.props.location.pathname === '/addPortal') {
            if (props.updateStatus === 'fail') {
                this.setState({ expanded: true })
            } else if (props.updateStatus === 'success') {
                this.setState({ expanded: false })
                this.props.history.push('/portal/' + props.portalId)
            }
            //if editing portal
        } else {
            this.setState({
                fanClubName: props.portalInfo.fanClubName,
                fanClubLocation: props.portalInfo.fanClubLocation,
                category: props.portalInfo.categoryId,
                logo: props.portalInfo.logo,
                description: props.portalInfo.description
            })
            if (props.updateStatus === "success") {
                this.setState({ expanded: false })
                this.props.history.push('/portal/' + localStorage.getItem('portalId'))
                updateComplete()
            } else if (props.updateStatus === "fail") {
                this.setState({ expanded: true })
            }
        }
    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    }

    handleSelect = (e, index, value) => {
        this.setState({ category: value })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.location.pathname === '/addPortal') {
            postPortals(this.state)
            this.setState({ fanClubName: '', fanClubLocation: '', category: '', logo: '', description: '' })
        } else {
            updatePortal(localStorage.getItem('portalId'), this.state)
        }
    }

    render() {
        return (
            <Card style={cardStyle} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardTitle title="Fan Portal" />
                <CardText expandable={true} color={'red'} style={errorMessageStyle}>
                    {this.props.errorMessage}
                </CardText>
                <form onSubmit={this.handleSubmit}>
                    <CardText>
                        <TextField
                            hintText="Name"
                            floatingLabelText="Name Your Fan Club"
                            name="fanClubName"
                            autoComplete="off"
                            fullWidth={true} required={true}
                            onChange={this.handleChange}
                            value={this.state.fanClubName}
                        /><br />
                        <TextField
                            hintText="Location"
                            floatingLabelText="Tell us your Location"
                            name="fanClubLocation"
                            autoComplete="off"
                            fullWidth={true} required={true}
                            onChange={this.handleChange}
                            value={this.state.fanClubLocation}
                        /><br />
                        <SelectField
                            onChange={this.handleSelect}
                            value={this.state.category}
                            floatingLabelText="Select a Category"
                            name="category"
                            fullWidth={true}
                        >
                            {this.props.portalCategories.map((category) => (
                                <MenuItem key={category.id} value={category.id} primaryText={category.category} />
                            ))}
                        </SelectField>
                        <br />
                        <TextField
                            hintText="Web address"
                            floatingLabelText="Enter a web address to display a photo"
                            name="logo"
                            autoComplete="off"
                            fullWidth={true} required={false}
                            onChange={this.handleChange}
                            type='URL'
                            value={this.state.logo}
                        /><br />
                        <TextField
                            hintText="Description"
                            floatingLabelText="Tell us about your portal"
                            name="description"
                            autoComplete="off"
                            fullWidth={true} required={false}
                            onChange={this.handleChange}
                            value={this.state.description}
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
    const { errorMessage, portalId, portalInfo, updateStatus, portalCategories } = appState.app
    return {
        errorMessage,
        portalId,
        portalInfo,
        updateStatus,
        portalCategories
    }
}
export default connect(mapStateToProps)(Authorize(CreatePortal))
