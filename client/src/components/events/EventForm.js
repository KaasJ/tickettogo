import * as React from 'react'
import Button from 'material-ui/Button'



export default function EventForm(props) {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <label>Name:
            <input type='text' value={props.values.name} name='name' onChange={props.onChange}/>
        </label>
        <label>Start date:
            <input type='date' value={props.values.startDate} name='startDate' onChange={props.onChange}/>
        </label>
        <label>End date:
            <input type='date' value={props.values.endDate} name='endDate' onChange={props.onChange}/>
        </label>
        <label>Description:
            <input type='text' value={props.values.description} name='description' onChange={props.onChange}/>
        </label>
        <label> Image:
            <input type='text' value={props.values.image} name='image' onChange={props.onChange}/>
        </label>
        <Button
          color="primary"
          variant="raised"
          className="add-button"
          type='submit'
          style={{ color: 'white', backgroundColor: 'black' }}>
          Submit event</Button>
      </form>
    </div>


  )
}




