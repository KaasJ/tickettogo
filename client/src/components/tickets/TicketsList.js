import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const riskColorPicker = (riskPercentage) => {
  let color = 'green'
  if (riskPercentage > 20) {
    color = 'yellow'
  }
  if (riskPercentage > 50) {
    color = 'red'
  }
  return color
}

const renderTickets = (ticket, props) => {

  return (
    <Card className='main' key={ticket.id}>
      <CardActionArea>
        <CardContent>
          <Typography component="h2">
            Description: {ticket.description}
          </Typography>
          <Typography component="h2">
            <div>
              Seller Name: {ticket.user.firstName} {ticket.user.lastName}
              {ticket.image &&
              <img
              className='media'
              src={ticket.image}
              style={{ float: 'right', height: 200, width: 200 }}
              title="Ticket image"
              /> }
            </div>
          </Typography>
          <Typography component="h2">
            Price: {ticket.price}
          </Typography>
          <Button style={{ color: riskColorPicker(ticket.riskPercentage) }}>
            Risk percentage: {ticket.riskPercentage} %
          </Button>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={() => props.ticketDetailsHandler(ticket.id)}>
          View Ticket
      </Button>
      </CardActions>
    </Card>)
}

export default function TicketsList(props) {

  if (props.event === null || props.event.tickets === undefined || !props.event.tickets.length) return <h1>We didn't find any tickets, sorry!</h1>
  return (
    <div> {props.event.tickets.map(ticket => renderTickets(ticket, props))} </div>





  )
}


