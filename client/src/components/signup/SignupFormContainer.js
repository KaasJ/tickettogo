import * as React from 'react'
import {connect} from 'react-redux'
import {signUp} from '../../actions/users'
import SignupForm from './SignupForm'
import {Redirect} from 'react-router-dom'

class SignupFormContainer extends React.Component {

state = {
	firstName: '',
	lastName: '',
	email:'',
	password:'',
	confirmPassword:''
}

	onSubmit = (event) => {
		event.preventDefault()
		this.props.signUp(this.state)
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
		if (this.props.signup.success) return (<Redirect to="/login" /> ) 
		return (
			<div>
				<h1>Sign up</h1>
				<SignupForm onSubmit={this.onSubmit} onChange={this.onChange} values={this.state}/>
				<p style={{color:'red'}}>{ this.props.signup.error }</p>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps,{signUp})(SignupFormContainer)
