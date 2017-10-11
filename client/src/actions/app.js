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

export function removeEvent(eventId) {
  axios.delete('/api/event/' + eventId)
    .then(function (resp){
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
export function getMonthEvents(userId){
  axios.get('/api/event/getMonthEvents/' + userId)
  .then(function(resp){
    store.dispatch({
      type:action.GET_MONTH_EVENTS,
      monthEvents:resp.data.monthEvents
    })
  })
  .catch(function(err){
    console.log('err', err)
  })
}
export function goingToEvent(eventId, followId){
  axios.post('/api/event/goingToEvent/' + eventId,{
    followId:followId
  })
  .then(function(resp){
    store.dispatch({
      type:action.EVENT_RSVP_STATUS,
      status:resp.data.status
    })
  })
  .catch(function(err){
    store.dispatch({
      type:action.EVENT_RSVP_STATUS,
      status:err.response.data.status
    })
  })
}
export function notGoingToEvent(eventId, followId){
  axios.put('/api/event/notGoingToEvent/' + eventId,{
    followId:followId
  })
  .then(function(resp){
    store.dispatch({
      type:action.EVENT_RSVP_STATUS,
      status:resp.data.status
    })
  })
  .catch(function(err){
    store.dispatch({
      type:action.EVENT_RSVP_STATUS,
      status:err.response.data.status
    })
  })
}
/*--------------PORTAL ACTIONS-------------------------------------------------*/

export function postPortals(fanPortal) {
    axios.post('/api/portal', {
      userId:localStorage.userId,
      categoryId:fanPortal.category,
      fanClubName: fanPortal.fanClubName,
      fanClubLocation: fanPortal.fanClubLocation,
      logo: fanPortal.logo,
      description: fanPortal.description
    })
      .then(function (resp){
        localStorage.setItem('portalId', resp.data.portalId)
        store.dispatch({
          type:action.GET_PORTAL_ID,
          portalId: resp.data.portalId,
          updateStatus:resp.data.status
        })
    })
      .catch(function (err) {
        store.dispatch({
          type: action.PORTAL_FAILURE,
          message: err.response.data.message,
          updateStatus:err.response.data.status
        })
      })
}
export function getPortalInfo(portalId,userId){
  axios.get('/api/portal/'+portalId +'/user/' + userId)
  .then(function(resp){
    store.dispatch({
      type:action.PORTAL_INFO,
      portalInfo: resp.data.portalInfo,
      portalEvents: resp.data.events,
      gotInfo:resp.data.status
    })
  })
  .catch(function(err){
    store.dispatch({
      type:action.PORTAL_FAILURE,
      gotInfo: err.response.data.status,
      message: err.response.data.message
    })
  })
}
export function getUserPortalInfo(portalId,userId){
  axios.get('/api/portal/'+portalId + '/user/' + userId )
  .then(function(resp){
    store.dispatch({
      type:action.USER_PORTAL_INFO,
      portalInfo: resp.data.portalInfo,
      portalEvents: resp.data.events
    })
  })
  .catch(function(err){
    console.log('Error ', err)
  })
}
export function updatePortal(portalId, portalInfo){
  let lastUpdate = Date.now()
  let momentDate = moment(lastUpdate).format('YYYY-MM-DD')
  axios.put('/api/portal/'+ portalId, {
    userId:localStorage.userId,
    categoryId:portalInfo.category,
    fanClubName: portalInfo.fanClubName,
    fanClubLocation: portalInfo.fanClubLocation,
    logo: portalInfo.logo,
    description: portalInfo.description,
    lastUpdate:momentDate
  })
  .then(function(resp){
      store.dispatch({
        type:action.UPDATE_PORTAL,
        updateStatus: resp.data.status
      })
    })
    .catch(function(err){
      store.dispatch({
        type:action.PORTAL_FAILURE,
        updateStatus: err.response.data.status,
        message: err.response.data.message
      })
    })
  }

export function updateComplete(){
  store.dispatch({
    type:action.UPDATE_STATUS,
    status:'done'
  })
}

export function getPortalCategories(){
  axios.get('/api/portal/categories')
  .then(function(resp){
    store.dispatch({
      type:action.GET_PORTAL_CATEGORIES,
      portalCategories:resp.data
    })
  })
  .catch(function(err){
    console.log('err ', err)
  })
}

export function getPortalsByCategory(categoryId){
  axios.get('/api/portal/categories/' + categoryId)
  .then(function(resp){
    store.dispatch({
      type:action.GET_PORTALS,
      portals:resp.data
    })
  })
  .catch(function(err){
    console.log(' error ', err)
  })
}

export function searchPortals(searchTerm){
  axios.get('/api/portal/search/' + searchTerm)
  .then(function(resp){
    store.dispatch({
      type:action.SEARCH_RESULTS,
      status:resp.data.status,
      message:resp.data.message,
      searchResults: resp.data.searchResults
    })
  })
  .catch(function(err){
    store.dispatch({
      type:action.SEARCH_RESULTS,
      status:err.resp.data.status,
      message:err.resp.data.message
    })
  })
}
export function followPortal(portalId, userId) {
  axios.post('/api/portal/follow/', {
    portalId: portalId,
    userId: userId,
  })
    .then(function (resp) {
      store.dispatch({
        type: action.FOLLOW_PORTAL,
        followStatus: resp.data.status,
        followMessage: resp.data.message
      })
    })
    .catch(function (err) {
      store.dispatch({
        type: action.FOLLOW_PORTAL,
        followStatus: err.response.data.status,
        followMessage:err.response.data.message
      })
    })
}
export function unFollowPortal(portalId, userId){
  axios.put('/api/portal/unfollow', {
    portalId:portalId,
    userId:userId
  })
  .then(function (resp) {
    store.dispatch({
      type: action.UNFOLLOW_PORTAL,
      unFollowStatus: resp.data.status,
      unFollowMessage: resp.data.message
    })
  })
  .catch(function (err) {
    store.dispatch({
      type: action.UNFOLLOW_PORTAL,
      unFollowStatus: err.response.data.status,
      unFollowMessage:err.response.data.message
    })
  })
}

export function getFollowingPortals(userId){
  console.log(userId)
  axios.get('/api/portal/followingPortals/' + userId)
  .then(function(resp){
    store.dispatch({
      type:action.GET_FOLLOWING_PORTALS,
      followingPortals:resp.data.followingPortals
    })
  })
  .catch(function(err){
    console.log('err', err)
  })
}
/*--------------------------RESET ACTIONS------------------------------- */

export function resetHome(){
  store.dispatch({
    type:action.RESET_HOME
  })
}
export function resetPortalView(){
  store.dispatch({
    type:action.RESET_PORTALVIEW
  })
}
export function resetCategory(){
  store.dispatch({
    type:action.RESET_CATEGORY
  })
}
export function resetDashboard(){
  store.dispatch({
    type:action.RESET_DASHBOARD
  })
}
export function resetRegister(){
  store.dispatch({
    type:action.RESET_REGISTER
  })
}
export function resetPortalForm(){
  store.dispatch({
    type:action.RESET_PORTAL_FORM
  })
}
export function resetEventForm(){
  store.dispatch({
    type:action.RESET_EVENT_FORM
  })
}