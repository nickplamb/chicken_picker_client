import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
const Frankie = require('url:../../../assets/frankie2.jpeg');

// Styling
import './breed-card.scss';

export class BreedCard extends React.Component {

  render(){
    const { breed } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={Frankie} />
        <Card.Body>
          <Card.Title>{breed.breed}</Card.Title>
          <Card.Text>
            Egg color: {breed.eggColor}
          </Card.Text>
          <Link to={`/breeds/${breed.breed}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}

BreedCard.propTypes = {
  breed: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    eggColor: PropTypes.string.isRequired,
    eggSize: PropTypes.string
  }).isRequired,
};