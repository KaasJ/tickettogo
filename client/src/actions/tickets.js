import * as request from 'superagent'


export const TICKETS_FETCHED_SUCCESS = 'TICKETS_FETCHED_SUCCESS'


const baseUrl = 'http://localhost:4000'

const ticketsFetchedSuccess = (tickets) => ({
  type: TICKETS_FETCHED_SUCCESS,
  tickets
})


export const loadTickets = () => (dispatch) => {
  request(`${baseUrl}/tickets`)
    .then(response => {
      dispatch(ticketsFetchedSuccess(response.body))
    })
    .catch(err => console.error(err))
}

