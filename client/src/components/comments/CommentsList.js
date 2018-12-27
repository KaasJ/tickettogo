import React from 'react'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
// import Button from 'material-ui/Button'


const renderComments = (comment) => {
    return (
      <Card key={comment.id} className="event-card" >
        <CardContent>
          <Typography variant="headline" component="h2">
            Comment {comment.text}
          </Typography>
          <Typography color="textSecondary">
            Author: {comment.user.firstName} {comment.user.lastName}
          </Typography>
      
        </CardContent>

      </Card >)
}

export default function CommentsList(props) {
  if (!props.comments || !props.comments.length) return <h1>We didn't find any comments, sorry!</h1>
  
  return( 
    <div> {props.comments.map(comment => renderComments(comment))  } </div>
    
   )
}