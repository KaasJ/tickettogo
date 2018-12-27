import { EVENTS_FETCHED_SUCCESS, EVENT_CREATE_SUCCESS, TICKET_CREATE_SUCCESS, COMMENT_CREATE_SUCCESS, EVENT_FETCHED_SUCCESS, UPDATE_TICKET_SUCCESS} from '../actions/events'


export default function (state = null, action) {
  switch (action.type) {
    case EVENTS_FETCHED_SUCCESS:
      return action.events.reduce((events, event) => {
      events[event.id] = event
      return events
      }, {...state})
    case EVENT_CREATE_SUCCESS:
      return {...state, 
      [action.event.id]: action.event}
    case EVENT_FETCHED_SUCCESS:
      return {...state, 
        [action.event.id]: action.event}
    case TICKET_CREATE_SUCCESS:
      return {...state, 
        [action.event.id]: action.event}
    case COMMENT_CREATE_SUCCESS:
        return {...state, 
          [action.event.id]: action.event}
    case UPDATE_TICKET_SUCCESS:
       return {...state, 
            [action.event.id]: action.event}
    default:
      return state
  }
}




