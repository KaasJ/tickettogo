import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import CommentFormContainer from '../comments/CommentFormContainer'
import CommentList from '../comments/CommentsList'
import { loadEvent } from '../../actions/events'
import { userId } from '../../jwt'
import TicketFormEditContainer from './TicketFormEditContainer';



const riskColorPicker = (riskPercentage) => {
  let color = 'green'
  if (riskPercentage > 20) {
    color = 'yellow'
  }
  if (riskPercentage > 50) {
    color = 'red'
  }
  return color
}



class TicketDetailsContainer extends React.Component {

  state = {
    createCommentButton: true,
    createCommentForm: false,
    editTicketForm: false,
    editTicketFormButton: true
  }


  componentWillMount() {
    if (this.props.events === null) {
      this.props.loadEvent(Number(this.props.match.params.eventid))
    }
  }

  commentFormHandler = () => {
    this.setState({
      createCommentButton: !this.state.createCommentButton,
      createCommentForm: !this.state.createCommentForm
    })
  }

  editTicketFormHandler = () => {
    this.setState({
      editTicketForm: !this.state.editTicketForm,
      editTicketFormButton: !this.state.editTicketFormButton,
    })
  }

  render() {
    const { comments, eventId, events, ticket, userid, ticketId, authenticated } = this.props




    if (events === null) {
      return <h1>Loading...</h1>
    }


    return (
      <div>
        <Paper className="outer-paper">
          <h1>Ticket description: {ticket.description}</h1>
          {
            ticket.image && <img src={ticket.image} alt={ticket.id} style={{ height: '100px', width: '400px', float: 'right' }} />
          }
          <h2>Price: {ticket.price}</h2>
          <h2>Owner: {ticket.user.firstName} {ticket.user.lastName}</h2>
          <Button style={{ color: riskColorPicker(ticket.riskPercentage) }}>Ticket Fraud Risk: {ticket.riskPercentage}</Button>

        </Paper>

        <Paper className="outer-paper">
          {userid === ticket.user.id && this.state.editTicketFormButton &&
            <Button
              style={{ color: 'white', backgroundColor: 'black' }}
              color="primary"
              variant="raised"
              onClick={this.editTicketFormHandler}
              className="create-button">
              Edit your ticket
          </Button>
          }
          {
            this.state.editTicketForm && <TicketFormEditContainer editTicketFormHandler={this.editTicketFormHandler} eventId={eventId} ticketId={ticketId} />

          }
          {
            this.state.createCommentButton &&
            authenticated &&
            <Button
              style={{ color: 'white', backgroundColor: 'black' }}
              color="primary"
              variant="raised"
              onClick={this.commentFormHandler}
              className="create-button">
              Add a new comment
      </Button>
          }
          {
            this.state.createCommentForm && <CommentFormContainer commentFormHandler={this.commentFormHandler} eventId={eventId} ticketId={ticketId} />
          }
          <div>
            <CommentList comments={comments} />
          </div>

        </Paper>
      </div>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userid: state.currentUser && userId(state.currentUser.jwt),
  events: state.events === null || !Object.values(state.events).length ? null : Object.values(state.events),
  ticket: state.events !== null && Object.values(state.events).length && state.events[Number(props.match.params.eventid)] && state.events[Number(props.match.params.eventid)].tickets && state.events[Number(props.match.params.eventid)].tickets.find(ticket => ticket.id === Number(props.match.params.ticketid)),
  comments: state.events && state.events[Number(props.match.params.eventid)].tickets.length && state.events[Number(props.match.params.eventid)].tickets.find(ticket => ticket.id === Number(props.match.params.ticketid)) && state.events[Number(props.match.params.eventid)].tickets.find(ticket => ticket.id === Number(props.match.params.ticketid)).comments,
  eventId: Number(props.match.params.eventid),
  ticketId: Number(props.match.params.ticketid)

})

export default connect(mapStateToProps, { loadEvent })(TicketDetailsContainer)