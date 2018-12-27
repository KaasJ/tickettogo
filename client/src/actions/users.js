import * as request from 'superagent'


export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'


const baseUrl = 'http://localhost:4000'

const userLoginSuccess = (login) => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILED,
  payload: error || 'error'
})


const userSignupSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const userSignupFailed = (error) => ({
  type: USER_SIGNUP_FAILED,
  payload: error || 'error'
})



export const login = (data) => (dispatch) =>
	request
		.post(`${baseUrl}/logins`)
    .send(data)
    .then(result => dispatch(userLoginSuccess(result.body)))
    .catch(err => {
    	if (err.status === 400) {
    		dispatch(userLoginFailed(err.response.body.message))
    	}
    	else {
    		console.error(err)
    	}
    })

export const signUp = (data) => (dispatch) =>
	request
		.post(`${baseUrl}/users`)
		.send(data)
		.then(result => {
			dispatch(userSignupSuccess())
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch(userSignupFailed(err.response.body.message))
			}
			else {
				console.error(err)
			}
		})

