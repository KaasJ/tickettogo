import { TICKETS_FETCHED_SUCCESS} from '../actions/tickets'

export default function (state = null, action) {
  switch (action.type) {
    case TICKETS_FETCHED_SUCCESS:
      return [...action.tickets]
    default:
      return state
  }
}