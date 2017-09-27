// if you so choose, you may name your actions and import them here
// for reducing typing errors

import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE, ADD_PORTAL_FAILURE,GET_PORTAL_ID, PORTAL_INFO} from '../actions/actionValues'


const initialState = {
  foo: 'bar',
  open: false,
  errorMessage: '',
  portalId:null,
  portalInfo: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:

      return {...state, foo: action.payload}
    case ADD_PORTAL_FAILURE:
      return {
        ...state,
        errorMessage:action.message
      }
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
    case GET_PORTAL_ID:
    return{
      ...state,
      portalId:action.portalId
    }
    case PORTAL_INFO:
    return{
      ...state,
      portalInfo:action.portalInfo
    }
    default:
      return state
  }
}
