import * as React from 'react'
import Button from 'material-ui/Button'

export default function CommentForm(props) {
  return (
  <div>
    <form onSubmit={props.onSubmit}>
    <label>
      Comment:
      <input type='text' value={props.values.text} name='text' onChange={props.onChange}></input> </label>
    <Button 
     color="primary"
     variant="raised"
     className="add-button"
     type='submit' 
     style={{color:'white', backgroundColor: 'black'}}>
    Add a comment</Button>
    </form>
  </div>

    
  )
}
