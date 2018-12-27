import {TOTAL_EVENTS_SUCCESS} from '../actions/events'

export default function (state = null, action) {
	switch (action.type) {
		case TOTAL_EVENTS_SUCCESS:
			return {
				count: action.count
			}
		default:
      return state
	}
}
