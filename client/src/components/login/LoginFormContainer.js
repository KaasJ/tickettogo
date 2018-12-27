import * as React from 'react'
import {connect} from 'react-redux'
import {login} from '../../actions/users'
import LoginForm from './LoginForm'
import {Redirect} from 'react-router-dom'

class LoginFormContainer extends React.Component {
	state = {
		email: '',
		password: ''
	}



	onSubmit = (event) => {
		event.preventDefault()
		this.props.login(this.state)
		this.setState({
			firstName: '',
			lastName: '',
			email:'',
			password:'',
			confirmPassword:''
		})
	}

	onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


	render() {
		if (this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<div>
				<h1>Login</h1>
				<LoginForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state}  />
        { this.props.error && 
          <span style={{color:'red'}}>{this.props.error}</span> }
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
    error: state.login.error
	}
}

export default connect(mapStateToProps, {login})(LoginFormContainer)
