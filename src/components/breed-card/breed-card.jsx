import React from 'react';

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

// <div key={breed._id.$oid}>{breed.breed}</div>