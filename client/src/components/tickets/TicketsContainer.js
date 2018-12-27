import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TicketsListAll from '../tickets/TicketsListAll'
import { loadTickets } from '../../actions/tickets'
import { loadEvents } from '../../actions/events'
import { withRouter } from 'react-router'



class TicketsContainer extends React.Component {

  
  componentDidMount() {
    if (this.props.tickets === null) {
      this.props.loadTickets()
      this.props.loadEvents()
    }
  }


  ticketDetailsHandler = (ticketId) => {
    const eventNumber = this.props.events.find(event => event.tickets.find(ticket => ticket.id === ticketId)).id
    this.props.history.push(`/events/${eventNumber}/tickets/${ticketId}`)
  }


  render() {
    const { tickets} = this.props
    if (!tickets) return (<h1>Something went wrong. No tickets.</h1>)
    return (
      <div>
        <Paper className="outer-paper">
          <div>
            <h1>We found {tickets.length} tickets. You will find all the available tickets below</h1>
          </div>
        </Paper>
        <Paper className="outer-paper">
    
       
          <div>
            <TicketsListAll tickets={tickets} ticketDetailsHandler={this.ticketDetailsHandler} />
          </div>

        </Paper>
      </div>)
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  tickets: state.tickets === null ? null : state.tickets,
  events: state.events === null || !Object.values(state.events).length ? null : Object.values(state.events)
})

export default withRouter(connect(mapStateToProps, {loadEvents, loadTickets })(TicketsContainer))