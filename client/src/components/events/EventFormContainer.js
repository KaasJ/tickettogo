import React from 'react'
import {connect} from 'react-redux'
import {createEvent} from '../../actions/events'
import EventForm from './EventForm'

class EventFormContainer extends React.Component {
  state = {
    name: '',
    description: '',
    endDate: '',
    startDate: '',
    image: ''
    
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createEvent(this.state)
    this.setState({
      name: '',
      description: '',
      endDate: '',
      startDate: '',
      image: ''
    })
    this.props.eventFormHandler()
    
  }

  render() {
    return (<EventForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      values={this.state}
    />)
  }
}

export default connect(null, {createEvent})(EventFormContainer)