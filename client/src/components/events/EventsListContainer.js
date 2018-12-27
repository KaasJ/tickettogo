import React from 'react'
import {loadEvents} from '../../actions/events'
import {connect} from 'react-redux'
import EventsList from './EventsList'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import EventFormContainer from './EventFormContainer'
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import './EventListContainer.css'
import ticketImg from '../../images/ticket.png'

class EventsContainer extends React.Component {

  state = {
    createEventButton: true,
    createEventForm: false,
    eventMinIndex: 0,
    eventMaxIndex: 8
  }

componentWillMount() {
    if (this.props.events === null || this.props.events.length < 2) {
      this.props.loadEvents(0,9)
    }
 }

eventFormHandler = () => {
  this.setState({
    createEventButton: !this.state.createEventButton,
    createEventForm: !this.state.createEventForm
   })
}

eventDetailsHandler = (id) => {
 this.props.history.push(`/events/${id}`)
}

previousEventsHandler = (id) => {
  this.setState({
    eventMinIndex: this.state.eventMinIndex-9,
    eventMaxIndex: this.state.eventMaxIndex-9
   })
 }

nextEventsHandler = () => {
  let skip = 9
  let take = 18
  this.props.loadEvents(skip,take)
  this.setState({
    eventMinIndex: this.state.eventMinIndex+9,
    eventMaxIndex: this.state.eventMaxIndex+9
   })
  skip += 9
  take += 9
}

render() {
    const {events, authenticated, totalEvents} = this.props
    
return ( <div>
      <Paper className="outer-paper">
        <div>
          <img src={ticketImg} alt0='logo' style={{ height: '80px', width: '150px', float: 'right', marginRight: 50}} />  
          <h1 style={{marginTop: 40}}>Welcome to Ticket-To-Go: Find your event tickets! </h1>
         
          <h2>We got {totalEvents} upcoming event(s) </h2>
          </div>
      </Paper>
      
      <Paper className="outer-paper">
      {
        authenticated && 
        this.state.createEventButton && 
        <Button
        style={{color:'white', backgroundColor: 'black'}}
        color="primary"
        variant="raised"
        onClick={this.eventFormHandler}
        className="create-button">
        Add a new event
        </Button> 
      }
      { 
        this.state.createEventForm && 
        <EventFormContainer eventFormHandler={this.eventFormHandler} /> 
      }
      <div>        
      <EventsList events={events} eventDetailsHandler={this.eventDetailsHandler} eventMinIndex={this.state.eventMinIndex} eventMaxIndex={this.state.eventMaxIndex} />
      </div>
      {totalEvents > 9 && <Button
        style={{color:'white', backgroundColor: 'black', margin: 10}}
        color="primary"
        variant="raised"
        onClick={this.nextEventsHandler}
        >
        Next events
      </Button> } 
      {this.state.eventMinIndex > 8 && <Button
        style={{color:'white', backgroundColor: 'black'}}
        color="primary"
        variant="raised"
        onClick={this.previousEventsHandler}>
        Previous events
      </Button> } 
    </Paper>
    </div>)
}
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  events: state.events === null || !Object.values(state.events).length ? null : Object.values(state.events).sort((a,b) => a.endDateInDays - b.endDateInDays),
  totalEvents: state.totalEvents && state.totalEvents.count
})

export default withRouter(connect(mapStateToProps, {loadEvents})(EventsContainer))
