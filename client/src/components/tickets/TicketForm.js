import * as React from 'react'
import Button from 'material-ui/Button'

export default function TicketForm(props) {
  return (
  <div>
    <form onSubmit={props.onSubmit}>
    <label>Price:</label><input type='int' value={props.values.price} name='price' onChange={props.onChange}></input>
    <label>Description</label><input type='text' value={props.values.description} name='description' onChange={props.onChange}></input>
    <label>Picture of ticket:</label><input type='text' value={props.values.image} name='image' onChange={props.onChange}></input>
    <Button 
     color="primary"
     variant="raised"
     className="add-button"
     type='submit' 
     style={{color:'white', backgroundColor: 'black'}}>
    Submit</Button>
    </form>
  </div>

    
  )
}
