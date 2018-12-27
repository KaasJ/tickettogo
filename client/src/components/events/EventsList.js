import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const renderEvents = (event, props) => {
  return (
    <Card className='main' key={event.id}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {event.name}
          </Typography>
          <Typography component="p">
            <div>
              Event description {event.description}
              {
              event.image &&
              <img
                className='media'
                src={event.image}
                style={{ float: 'right', height: 200, width: 200 }}
                title="Event image"
              />
              }
            </div>
          </Typography>
          <Typography component="p">
            From {event.startDate} until {event.endDate}
          </Typography>

        </CardContent>

      </CardActionArea>

      <CardActions>
        <Button
          size="small"
          color="secondary"
          onClick={() => props.eventDetailsHandler(event.id)}>
          View Event Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default function EventsList(props) {
  if (props.events === null) return <h1>Sorry! We didnt find any events and/or tickets</h1>

  return (
    <div> {props.events.filter((event, index) => index >= props.eventMinIndex && index <= props.eventMaxIndex).map((event) => renderEvents(event, props))} </div>
  )
}




