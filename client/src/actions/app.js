import store from '../store'
import axios from 'axios'
// example actions

import {MY_ACTION, REGISTER} from './actionValues'

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

export function postRegister(regInfo) {
  axios.post('/api/register', {
    fname: regInfo.fname,
    lname: regInfo.lname,
    username: regInfo.username,
    email: regInfo.email,
    password: regInfo.password
  })
  .then(function(res){
    console.log('from the register', res)
  })
  .catch(function(err){
    console.log('does NOT WORK', err)
  })
}
