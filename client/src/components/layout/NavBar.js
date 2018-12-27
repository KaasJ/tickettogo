import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import AccountIcon from 'material-ui-icons/AccountBox'

const NavBar = (props) => {
  const { history, authenticated } = props


  return (
    <AppBar position="absolute" style={{ zIndex: 10, backgroundColor: '#757D75'}}>
      <Toolbar>
        <Typography variant="title" style={{ flex: 1, color:'white', fontSize: 25, margin:25}}>
          TICKETTOGO
        </Typography>
        <Button style={{color: 'white'}} onClick={() => history.push('/')}>All Events</Button>
        <Button style={{color: 'white'}} onClick={() => history.push('/tickets')}>All Tickets</Button>
        {
          authenticated && <Button style={{color: 'white'}}><AccountIcon /> My account </Button>
        }
        {
          !authenticated && <Button style={{color: 'white'}} onClick={() => history.push('/login')}>Login</Button>
        }
        {
          !authenticated && <Button style={{color: 'white'}} onClick={() => history.push('/signup')}>Sign up</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
})

export default withRouter(connect(mapStateToProps)(NavBar))
