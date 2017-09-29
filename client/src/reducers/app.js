// if you so choose, you may name your actions and import them here
// for reducing typing errors

// import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE, ADD_PORTAL_FAILURE,GET_PORTAL_ID, PORTAL_INFO, UPDATE_PORTAL, UPDATE_STATUS, UPDATE_EVENT} from '../actions/actionValues'

import * as reduce from '../actions/actionValues'

const initialState = {
  foo: 'bar',
  open: false,
  errorMessage: '',
  portalId:null,
  portalInfo: {},
  portalEvents:[],
  updateStatus:'',
  eventInfo: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case reduce.MY_ACTION:

      return {...state, foo: action.payload}
    case reduce.ADD_PORTAL_FAILURE:
      return {
        ...state,
        errorMessage:action.message
      }
    case reduce.REGISTRATION_FAILURE:
      return{
        ...state,
        errorMessage:action.message
      }
    case reduce.POST_EVENT_FAILURE:
    return{
      ...state,
      errorMessage:action.message,
      updateStatus:action.updateStatus
    }
    case reduce.GET_PORTAL_ID:
    return{
      ...state,
      portalId:action.portalId
    }
    case reduce.PORTAL_INFO:
    return{
      ...state,
      portalInfo:action.portalInfo,
      portalEvents:action.portalEvents
    }
    case reduce.UPDATE_PORTAL:
    return{
      ...state,
      updateStatus:action.updateStatus
    }
    case reduce.UPDATE_STATUS:
      return{
        ...state,
        updateStatus:action.status
      }
    case reduce.EVENT_INFO:
    return{
      ...state,
      eventInfo:action.eventInfo
    }

    case reduce.UPDATE_EVENT:
    return{
      ...state,
      updateStatus:action.updateStatus
    }

    case reduce.REMOVE_EVENT:
    return{
      ...state,
      removeEvent:action.removeEvent
    }

    default:
      return state
  }
}
