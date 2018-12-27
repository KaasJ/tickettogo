import { combineReducers } from 'redux';
import events from './events'
import login from './login'
import currentUser from './currentUser'
import signup from './signup'
import totalEvents from './totalEvents'
import tickets from './tickets'



export default combineReducers({
  events,
  login,
  currentUser,
  signup,
  totalEvents,
  tickets
})
