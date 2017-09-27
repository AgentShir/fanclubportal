import store from '../store'
import axios from 'axios'
import moment from 'moment'


// example actions
import { loginUser } from '../lib/actions/auth'
import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE, ADD_PORTAL_FAILURE, GET_PORTAL_ID,PORTAL_INFO } from './actionValues'


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
  axios.post('/api/event/' + portalId, {
    description: newEvent.description,
    location: newEvent.location,
    theme: newEvent.theme,
    date: momentDate,
    time: momentTime
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
      portalInfo: resp.data
    })
  })
  .catch(function(err){
    console.log('error ', err)
  })
}

export function updateFanPortal(portalId){
  axios.update('/api/portal/'+portalId)
  .then(function(resp){
    console.log('actionUpdatePortal', resp)
    })
    .catch(function(err){
      console.log('error', err)
    })
  }
