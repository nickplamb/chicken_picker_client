import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { FavoritesToggle } from '../favorites-toggle/favorites-toggle';
const Frankie = require('url:../../../assets/frankie2.jpeg');

// Styling
import './breed-card.scss';

export function BreedCard({ breed, isFavorite, token }) {

  return (
    <Card>
      <Card.Img variant="top" src={Frankie} />
      <Card.Body>
        <Card.Title>{breed.breed}</Card.Title>
        <Card.Text as="div">
          <p>
            Egg color: {breed.eggColor}
          </p>
          <p>
            Purpose: {breed.purpose}
          </p>
        </Card.Text>
        <Link to={`/breeds/${breed.breed}`}>
          <Button >Open</Button> {/* variant="link" */}
        </Link>
        <FavoritesToggle breed={ breed } token={ token } isFavorite={ isFavorite }/>
      </Card.Body>
    </Card>
  )
}

BreedCard.propTypes = {
  breed: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    eggColor: PropTypes.string.isRequired,
    eggSize: PropTypes.string
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired
};