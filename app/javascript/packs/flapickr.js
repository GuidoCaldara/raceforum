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
    const { date } = this.state;
    return (
      <Flatpickr 
       />
    )
  }
}


export default Calendar;
