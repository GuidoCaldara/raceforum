import Flatpickr from 'react-flatpickr'
import { Component } from 'react'

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }


  render() {
    let x = new Date()
    let minDefaultDate = x.toISOString().substring(0, 10)
    let maxDefaultDate = (new Date(date.setDate(date.getDate()+100))).toISOString().substring(0, 10)

    const { date } = this.state;
    return (
      <Flatpickr 
       />
    )
  }
}


export default Calendar;
