// if you so choose, you may name your actions and import them here
// for reducing typing errors
<<<<<<< HEAD
import {MY_ACTION, FAN_PORTAL_FAILURE} from '../actions/actionValues'
=======
import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE } from '../actions/actionValues'
>>>>>>> master

const initialState = {
  foo: 'bar',
  open: false,
  errorMessage: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:
<<<<<<< HEAD
      return {...state, foo: action.payload}
    case FAN_PORTAL_FAILURE:
      return {
        ...state,
        errorMessage:action.message
      }
=======
      return { ...state, foo: action.payload }
    case REGISTRATION_FAILURE:
      return{
        ...state,
        errorMessage:action.message
      }
    case POST_EVENT_FAILURE:
    return{
      ...state,
      errorMessage:action.message
    }
>>>>>>> master
    default:
      return state
  }
}
