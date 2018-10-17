import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from "prop-types"

class RangeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    let selector = `#review_${this.props.field}`
    document.querySelector(selector).value = nextValue
  }

  render() {
    const { rating } = this.state;
    return (
      <div>
        <p className="">{this.props.label}</p>
        <StarRatingComponent
          name= {this.props.field}
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var object = document.getElementById('objects_data').dataset
  ReactDOM.render(
    <RangeForm field={object.field} label={object.label}/>, document.querySelector(`.${object.field}`)
  )
})
