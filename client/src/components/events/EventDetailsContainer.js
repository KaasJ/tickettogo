import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import TicketFormContainer from '../tickets/TicketFormContainer'
import TicketsList from '../tickets/TicketsList'
import { loadEvent } from '../../actions/events'
import { withRouter } from 'react-router'



class EventDetailsContainer extends React.Component {

  state = {
    createTicketButton: true,
    createTicketForm: false
  }


  componentDidMount() {
    if (this.props.events === null) {
      this.props.loadEvent(Number(this.props.match.params.id))
    }
  }

  ticketFormHandler = () => {
    this.setState({
      createTicketButton: !this.state.createTicketButton,
      createTicketForm: !this.state.createTicketForm
    })
  }

  ticketDetailsHandler = (ticketId) => {
    this.props.history.push(`/events/${this.props.eventNumber}/tickets/${ticketId}`)
  }




  render() {
    const { event, authenticated } = this.props



    if (!event) return (<h1>Something went wrong. No event.</h1>)

    return (
      <div>
        <Paper className="outer-paper">

          <div>
            {
              event.image && <img src={event.image} alt={event.id} style={{ height: '100px', width: '300px', float: 'right' }} />
            }
            <h1>Event name: {event.name}. Find the available tickets below</h1>
            <h2>From:{event.startDate} until: {event.endDate}</h2>

            <h2>Description {event.description}</h2>


          </div>
        </Paper>
        <Paper className="outer-paper">
          {
            authenticated &&
            this.state.createTicketButton &&
            <Button
              style={{ color: 'white', backgroundColor: 'black' }}
              color="primary"
              variant="raised"
              onClick={this.ticketFormHandler}
              className="create-button">
              Create new ticket
          </Button>}
          {
            this.state.createTicketForm && <TicketFormContainer ticketFormHandler={this.ticketFormHandler} eventNumber={this.props.eventNumber} />
          }
          <div>
            <TicketsList event={event} ticketDetailsHandler={this.ticketDetailsHandler} />
          </div>

        </Paper>
      </div>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  event: state.events !== null && Object.values(state.events).length && state.events[Number(props.match.params.id)],
  events: state.events === null || !Object.values(state.events).length ? null : Object.values(state.events),
  eventNumber: Number(props.match.params.id),
})

export default withRouter(connect(mapStateToProps, { loadEvent })(EventDetailsContainer))