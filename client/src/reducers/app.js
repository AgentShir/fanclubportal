// if you so choose, you may name your actions and import them here
// for reducing typing errors
import { MY_ACTION, REGISTRATION_FAILURE } from '../actions/actionValues'

const initialState = {
  foo: 'bar',
  open: false,
  errorMessage: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:
      return { ...state, foo: action.payload }
    case REGISTRATION_FAILURE:
      return{
        ...state,
        errorMessage:action.message
      }
    default:
      return state
  }
}