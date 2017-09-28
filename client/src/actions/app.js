import store from '../store'
import axios from 'axios'
import moment from 'moment'


// example actions
import { loginUser } from '../lib/actions/auth'
import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE, ADD_PORTAL_FAILURE, GET_PORTAL_ID,PORTAL_INFO, UPDATE_PORTAL, UPDATE_STATUS, UPDATE_EVENT} from './actionValues'


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
  // let momentTime = moment(newEvent.time).format('HH:MM:00')
  let hr = moment(newEvent.time).hour();
  let min = moment(newEvent.time).minute();
  let time = hr +':'+min+':00'
  axios.post('/api/event/' + portalId, {
    description: newEvent.description,
    location: newEvent.location,
    theme: newEvent.theme,
    date: momentDate,
    time: time
  })
    .then(function (resp) {
    })
    .catch(function (err) {
      store.dispatch({
        type: POST_EVENT_FAILURE,
        message: err.response.data.message
      })
    })
}

export function updateEvent() {

}


/*--------------PORTAL ACTIONS-------------------------------------------------*/

export function postPortals(fanPortal) {
    axios.post('/api/portal', {
      userId:localStorage.userId,
      teamName: fanPortal.teamName,
      fanClubName: fanPortal.fanClubName,
      teamLocation: fanPortal.teamLocation,
      fanClubLocation: fanPortal.fanClubLocation,
      logo: fanPortal.logo,
      description: fanPortal.description
    })
      .then(function (resp){
        store.dispatch({
          type:GET_PORTAL_ID,
          portalId: resp.data.portalId
        })
    })
      .catch(function (err) {
        store.dispatch({
          type: ADD_PORTAL_FAILURE,
          message: err.response.data.message
        })
      })
}
export function getPortalInfo(portalId){
  axios.get('/api/portal/'+portalId)
  .then(function(resp){
    store.dispatch({
      type:PORTAL_INFO,
      portalInfo: resp.data.portalInfo,
      portalEvents: resp.data.events
    })
  })
  .catch(function(err){
  })
}

export function updatePortal(portalId, portalInfo){
  axios.put('/api/portal/'+ portalId, {
    userId:localStorage.userId,
    teamName: portalInfo.teamName,
    fanClubName: portalInfo.fanClubName,
    teamLocation: portalInfo.teamLocation,
    fanClubLocation: portalInfo.fanClubLocation,
    logo: portalInfo.logo,
    description: portalInfo.description
  })
  .then(function(resp){
      store.dispatch({
        type:UPDATE_PORTAL,
        updateStatus: resp.data.status
      })
    })
    .catch(function(err){
    })
  }

export function updateComplete(){
  console.log('aciton ')
  store.dispatch({
    type:UPDATE_STATUS,
    status:'done'
  })
}
