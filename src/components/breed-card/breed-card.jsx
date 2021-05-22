import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Frankie = require('url:../../../assets/frankie2.jpeg');

// Styling
import './breed-card.scss';

export class BreedCard extends React.Component {

  render(){
    const { breed, onBreedClick } = this.props;

    return (
      <Card md="auto">
        <Card.Img variant="top" src={Frankie} />
        <Card.Body>
          <Card.Title>{breed.breed}</Card.Title>
          <Card.Text>
            Egg color: {breed.eggColor}
          </Card.Text>
          <Button onClick={() => {onBreedClick(breed)}}>Open</Button>
        </Card.Body>
      </Card>
    )
  }
}

BreedCard.propTypes = {
  breed: PropTypes.shape({
    breed: PropTypes.string.isRequired,
    eggColor: PropTypes.string.isRequired,
    eggSize: PropTypes.string
  }).isRequired,
  onBreedClick: PropTypes.func.isRequired
};