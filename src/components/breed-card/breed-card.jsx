import React from 'react';
import PropTypes from 'prop-types';

export class BreedCard extends React.Component {
  render(){
    const { breed, onBreedClick } = this.props;
    return (
      <div className="breed-card" onClick={() => {onBreedClick(breed); }} >
        <h3>{breed.breed}</h3>
        <p>
          Egg Color: {breed.eggColor}<br />
          Egg Size: {breed.eggSize}
        </p>
      </div>
    )
  }
}

BreedCard.propTypes = {
  breed: PropTypes.shape({
    breed: PropTypes.string.isRequired,
    eggColor: PropTypes.string.isRequired,
    eggSize: PropTypes.string.isRequired
  }).isRequired,
  onBreedClick: PropTypes.func.isRequired
};

// <div key={breed._id.$oid}>{breed.breed}</div>