import React from 'react';
import PropTypes from 'prop-types';

// Styling
import './breed-view.scss';

export class BreedView extends React.Component {

  render() {
    const { breed, onBackClick } = this.props;

    return (
      <div className="breed-view">
        <div className="breed-image">
          <img src="#" alt="a photo of a chicken"/>
        </div>
        <div className="breed-name">
          <span className="label">Breed: </span>
          <span className="value">{breed.breed}</span>
        </div>
        <div className="breed-class">
          <span className="label">APA Class: </span>
          <span className="value">{breed.apaClass.name}</span>
        </div>
        <button onClick={() => onBackClick(null)} >Back</button>
      </div>
    );
  }
}

BreedView.propTypes = {
  breed: PropTypes.shape({
    breed: PropTypes.string.isRequired,
    eggColor: PropTypes.string.isRequired,
    eggSize: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};