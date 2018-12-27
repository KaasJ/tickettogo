import React from 'react'
import {connect} from 'react-redux'
import {createEventTicket} from '../../actions/events'
import TicketForm from './TicketForm'

class TicketFormContainer extends React.Component {
  state = {
    description: '',
    price: '',
    image: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createEventTicket(this.state, this.props.eventNumber)
    this.setState({
      description: '',
      price: '',
      image: ''
    })
    
    this.props.ticketFormHandler()
    
  }

  render() {
    return (<TicketForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      values={this.state}
    />)
  }
}


const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  events: state.events === null ?
  null : Object.values(state.events)
})

export default connect(mapStateToProps, {createEventTicket})(TicketFormContainer)