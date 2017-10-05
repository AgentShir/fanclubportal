// if you so choose, you may name your actions and import them here
// for reducing typing errors

// import { MY_ACTION, REGISTRATION_FAILURE, POST_EVENT_FAILURE, ADD_PORTAL_FAILURE,GET_PORTAL_ID, PORTAL_INFO, UPDATE_PORTAL, UPDATE_STATUS, UPDATE_EVENT} from '../actions/actionValues'

import * as reduce from '../actions/actionValues'

const initialState = {
  foo: 'bar',
  errorMessage: '',
  portalId:null,
  portalInfo: {},
  portalEvents:[],
  updateStatus:'',
  eventInfo: {},
  portalCategories:[],
  portals:[],
  userPortalInfo:{},
  userPortalEvens:[],
  searchResults:[],
  searchMessage:''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case reduce.MY_ACTION:

      return {...state, foo: action.payload}
    case reduce.PORTAL_FAILURE:
      return {
        ...state,
        errorMessage:action.message,
        updateStatus:action.updateStatus
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
      portalId:action.portalId,
      updateStatus:action.updateStatus
    }
    case reduce.PORTAL_INFO:
    return{
      ...state,
      portalInfo:action.portalInfo,
      portalEvents:action.portalEvents,
      updateStatus:action.updateStatus
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

    case reduce.GET_PORTAL_CATEGORIES:
    return{
      ...state,
      portalCategories:action.portalCategories
    }
    case reduce.GET_PORTALS:
    return{
      ...state,
      portals:action.portals
    }
    case reduce.USER_PORTAL_INFO:
    return{
      ...state,
      userPortalInfo:action.portalInfo,
      userPortalEvents:action.portalEvents
    }
    case reduce.SEARCH_RESULTS:
    return{
      ...state,
      searchResults:action.searchResults,
      updateStatus:action.status,
      searchMessage:action.message
    }

    case reduce.RESET_PORTALVIEW:
    return{
      ...state,
      portalInfo:{},
      portalEvents:[],
      updateStatus:'',
      errorMessage:''
    }
    case reduce.RESET_HOME:
    return{
      ...state,
      searchResults:[],
      searchMessage:'',
      updateStatus:''
    }
    case reduce.RESET_CATEGORY:
    return{
      ...state,
      portals:[]
    }
    case reduce.RESET_USERHOMEPAGE:
    return{
      ...state,
      userPortalInfo:{},
      userPortalEvents:[]
    }
    case reduce.RESET_REGISTER:
    return{
      ...state,
      errorMessage:''
    }
    case reduce.RESET_PORTAL_FORM:
    return{
      ...state,
      errorMessage:'',
      portalId:null,
      portalInfo:{},
      updateStatus:'',
      portalCategories:[]
    }
    case reduce.RESET_EVENT_FORM:
    return{
      ...state,
      errorMessage:'',
      eventInfo:{},
      updateStatus:''
    }
    default:
      return state
  }
}
