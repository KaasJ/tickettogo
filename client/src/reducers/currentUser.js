import {USER_LOGIN_SUCCESS } from '../actions/users'
import {USER_LOGOUT} from '../actions/events'


export default function (state = null, action) {
	switch (action.type) {
		case USER_LOGIN_SUCCESS:
			return action.payload
		case USER_LOGOUT:
      return null
		default:
      return state
	}
}
