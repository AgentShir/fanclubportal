import store from '../store'
import axios from 'axios'
import moment from 'moment'


// example actions
import { loginUser } from '../lib/actions/auth'
// import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE, ADD_PORTAL_FAILURE, GET_PORTAL_ID,PORTAL_INFO, UPDATE_PORTAL, UPDATE_STATUS, UPDATE_EVENT, GET_EVENT_INFO} from './actionValues'

import * as action from './actionValues'


export function getFoo() {
  fetch('/api/foo')
    .then(resp => resp.json())
    .then(resp => {
      store.dispatch({
        type: action.MY_ACTION,
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
          type: action.REGISTRATION_FAILURE,
          message: err.response.data.message
        })
      })
  }
}

/*--------------EVENT ACTIONS-------------------------------------------------*/


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
      store.dispatch({
        type: action.UPDATE_EVENT,
        updateStatus: resp.data.status
      })
    })
    .catch(function (err) {
      store.dispatch({
        type: action.POST_EVENT_FAILURE,
        message: err.response.data.message,
        updateStatus:err.response.data.status
      })
    })
}

export function getEventInfo(eventId) {
  const portalId = localStorage.portalId
  axios.get('/api/event/' + eventId + '/' + portalId)
  .then(function(resp){
    store.dispatch({
      type:action.EVENT_INFO,
      eventInfo: resp.data
    })
  })
  .catch(function (err) {
  })
}

export function updateEvent(eventId,portalId, eventInfo) {
  let momentDate = moment(eventInfo.date).format('YYYY-MM-DD')
  // let momentTime = moment(eventInfo.time).format('HH:MM:00')
  let hr = moment(eventInfo.time).hour();
  let min = moment(eventInfo.time).minute();
  let time = hr +':'+min+':00'
  axios.put('/api/event/' + eventId, {
    portalId: portalId,
    description: eventInfo.description,
    location: eventInfo.location,
    theme: eventInfo.theme,
    date: momentDate,
    time: time
  })
    .then(function (resp) {
      store.dispatch({
        type: action.UPDATE_EVENT,
        updateStatus: resp.data.status
      })
    })
    .catch(function (err) {
      store.dispatch({
        type: action.POST_EVENT_FAILURE,
        message: err.response.data.message,
        updateStatus:err.response.data.status
      })
    })
}


/*--------------PORTAL ACTIONS-------------------------------------------------*/

export function postPortals(fanPortal) {
    axios.post('/api/portal', {
      userId:localStorage.userId,
      category:fanPortal.category,
      fanClubName: fanPortal.fanClubName,
      fanClubLocation: fanPortal.fanClubLocation,
      logo: fanPortal.logo,
      description: fanPortal.description
    })
      .then(function (resp){
        store.dispatch({
          type:action.GET_PORTAL_ID,
          portalId: resp.data.portalId
        })
    })
      .catch(function (err) {
        store.dispatch({
          type: action.ADD_PORTAL_FAILURE,
          message: err.response.data.message
        })
      })
}
export function getPortalInfo(portalId){
  axios.get('/api/portal/'+portalId)
  .then(function(resp){
    store.dispatch({
      type:action.PORTAL_INFO,
      portalInfo: resp.data.portalInfo,
      portalEvents: resp.data.events
    })
  })
  .catch(function(err){
    console.log('Error ', err)
  })
}

export function updatePortal(portalId, portalInfo){
  axios.put('/api/portal/'+ portalId, {
    userId:localStorage.userId,
    category:portalInfo.category,
    fanClubName: portalInfo.fanClubName,
    fanClubLocation: portalInfo.fanClubLocation,
    logo: portalInfo.logo,
    description: portalInfo.description
  })
  .then(function(resp){
      store.dispatch({
        type:action.UPDATE_PORTAL,
        updateStatus: resp.data.status
      })
    })
    .catch(function(err){
    })
  }

export function updateComplete(){
  store.dispatch({
    type:action.UPDATE_STATUS,
    status:'done'
  })
}
