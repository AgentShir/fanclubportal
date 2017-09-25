import store from '../store'
import axios from 'axios'
import moment from 'moment'


// example actions
import { loginUser } from '../lib/actions/auth'
import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE, ADD_PORTAL_FAILURE } from './actionValues'


export function getFoo() {
  fetch('/api/foo')
    .then(resp => resp.json())
    .then(resp => {
      store.dispatch({
        type: MY_ACTION,
        payload: resp.foo
      })
    })
}

export function postRegister(regInfo) {
  return dispatch => {
    axios.post('/api/register', {
      fname: regInfo.fname,
      lname: regInfo.lname,
      username: regInfo.username,
      email: regInfo.email,
      password: regInfo.password
    })
      .then(function (res) {
        dispatch(loginUser({ username: regInfo.username, password: regInfo.password }))
      })
      .catch(function (err) {
        store.dispatch({
          type: REGISTRATION_FAILURE,
          message: err.response.data.message
        })
      })
  }
}

export function postEvent(newEvent, portalId) {
  let momentDate = moment(newEvent.date).format('YYYY-MM-DD')
  let momentTime = moment(newEvent.time).format('HH:mm:SS')

  axios.post('/api/' + portalId + '/addEvent', {
    description: newEvent.description,
    location: newEvent.location,
    theme: newEvent.theme,
    date: momentDate,
    time: momentTime
  })
    .then(function (resp) {
      console.log(' reponse', resp)
    })
    .catch(function (err) {
      store.dispatch({
        type: POST_EVENT_FAILURE,
        message: err.response.data.message
      })
    })
}

export function postPortals(fanPortal) {
  console.log('in action ', fanPortal)
    axios.post('/api/addPortals', {
      teamName: fanPortal.teamName,
      fanClubName: fanPortal.fanClubName,
      teamLocation: fanPortal.teamLocation,
      fanClubLocation: fanPortal.fanClubLocation,
      description: fanPortal.description
    })
      .then(function (resp){
      console.log("action add portal",resp)
    })
      .catch(function (err) {
        store.dispatch({
          type: ADD_PORTAL_FAILURE,
          message: err.response.data.message
        })
      })
}
