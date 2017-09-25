import store from '../store'
// example actions

import {MY_ACTION} from './actionValues'
import axios from 'axios'
import { FAN_PORTAL_FAILURE } from './actionValues'

export function getFoo() {
  fetch('/api/foo')
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp)
    store.dispatch({
      type: MY_ACTION,
      payload: resp.foo
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
          type: FAN_PORTAL_FAILURE,
          message: err.response.data.message
        })
      })
  }
