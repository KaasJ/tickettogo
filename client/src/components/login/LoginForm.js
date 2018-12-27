import * as React from 'react'
import './LoginForm.css'

export default function LoginForm(props) {
		return (
      <div className="login-form">
  			<form onSubmit={props.onSubmit}>
  				<label> Email
            <input type="email" name="email" value={props.values.email} onChange={props.onChange} />
          </label>
  				<label> Password
            <input type="password" name="password" value={props.values.password} onChange={props.onChange } />
          </label>
  				<button type="submit">Login</button>
  			</form>
		  </div>)
	}

