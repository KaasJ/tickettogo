import React from 'react'
import {connect} from 'react-redux'
import {createComment} from '../../actions/events'
import CommentForm from './CommentForm'

class CommentFormContainer extends React.Component {
  state = {
    text: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    const {ticketId, eventId} = this.props
    event.preventDefault()
    this.setState({
      text: '',
    })
    this.props.createComment(this.state, eventId, ticketId)
    this.props.commentFormHandler()
    
  }

  render() {
    return (<CommentForm
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      values={this.state}
    />)
  }
}


const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
})

export default connect(mapStateToProps, {createComment})(CommentFormContainer)