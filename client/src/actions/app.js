import store from '../store'
import axios from 'axios'
// example actions
import { loginUser } from '../lib/actions/auth'
import { MY_ACTION, REGISTRATION_FAILURE } from './actionValues'

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
