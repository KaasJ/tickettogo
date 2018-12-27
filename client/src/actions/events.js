import * as request from 'superagent'
import { isExpired } from '../jwt'

export const EVENTS_FETCHED_SUCCESS = 'EVENTS_FETCHED_SUCCESS'
export const EVENT_FETCHED_SUCCESS = 'EVENT_FETCHED_SUCCESS'
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS'
export const TICKET_CREATE_SUCCESS = 'TICKET_CREATE_SUCCESS'
export const COMMENT_CREATE_SUCCESS = 'COMMENT_CREATE_SUCCESS'
export const TOTAL_EVENTS_SUCCESS = 'TOTAL_EVENTS_SUCCESS'
export const UPDATE_TICKET_SUCCESS = 'UPDATE_TICKET_SUCCESS'
export const USER_LOGOUT = 'USER_LOGOUT'

const baseUrl = 'http://localhost:4000'

const eventsFetchedSuccess = (events) => ({
  type: EVENTS_FETCHED_SUCCESS,
  events
})

const eventFetchedSuccess = (event) => ({
  type: EVENT_FETCHED_SUCCESS,
  event
})


const eventCreateSuccess = (event) => ({
  type: EVENT_CREATE_SUCCESS,
  event
})

const ticketCreateSuccess = (event) => ({
  type: TICKET_CREATE_SUCCESS,
  event
})

const commentCreateSuccess = (event) => ({
  type: COMMENT_CREATE_SUCCESS,
  event
})

const totalEventsSuccess = (count) => ({
  type: TOTAL_EVENTS_SUCCESS,
  count
})

const updateTicketSuccess = (event) => ({
  type: UPDATE_TICKET_SUCCESS,
  event
})

const logout = () => ({
  type: USER_LOGOUT
})

export const loadEvents = (skip, take) => (dispatch) => {
  request(`${baseUrl}/events`)
    .query(`take=${take}`)
    .query(`skip=${skip}`)
    .then(response => {
      dispatch(eventsFetchedSuccess(response.body.events))
      dispatch(totalEventsSuccess(response.body.count))
    })
    .catch(err => console.error(err))
}

export const loadEvent = (eventId) => (dispatch) => {

  request(`${baseUrl}/events/${eventId}`)
    .then(response => {
      dispatch(eventFetchedSuccess(response.body))
    })
    .catch(err => console.error(err))
}

export const createEvent = (data) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(eventCreateSuccess(response.body))
    })
    .catch(err => console.error(err))
}

export const createEventTicket = (data, eventid) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/events/${eventid}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(ticketCreateSuccess(response.body))
    })
    .catch(err => console.error(err))
}

export const createComment = (data, eventId, ticketId) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(commentCreateSuccess(response.body))
    })
    .catch(err => console.error(err))
}

export const updateTicket = (data, eventId, ticketId) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())
  request
    .put(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(updateTicketSuccess(response.body))
    })
    .catch(err => console.error(err))
}


