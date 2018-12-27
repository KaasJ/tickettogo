import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import LoginFormContainer from './components/login/LoginFormContainer'
import SignupFormContainer from './components/signup/SignupFormContainer'
import EventsListContainer from './components/events/EventsListContainer'
import TicketDetailsContainer from './components/tickets/TicketDetailsContainer'
import NavBar from './components/layout/NavBar'
import EventDetailsContainer from './components/events/EventDetailsContainer'
import TicketsContainer from './components/tickets/TicketsContainer';
import './App.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavBar />
          </nav>
          <main>
            <Route exact path="/login" component={LoginFormContainer} />
            <Route exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/events/:id" component={EventDetailsContainer} />
            <Route exact path="/tickets" component={TicketsContainer} />
            <Route exact path="/" component={EventsListContainer} />
            <Route exact path="/events/:eventid/tickets/:ticketid" component={TicketDetailsContainer}/>
          </main>
        </div>
      </Router>
    )
  }
}
export default App
