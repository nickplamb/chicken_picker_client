import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import FavoritesToggle from '../favorites-toggle/favorites-toggle';
import Frankie from 'url:../../../assets/breed_photos/frankie2.jpeg';
import { breedImages } from '../breed-images'

// Styling
import './breed-card.scss';

export default function BreedCard({ breed }) {
  const breedNameConverted = breed.breed.replace(/\s+/g, '').toLowerCase();
  const breedImage = breedImages[breedNameConverted] ? breedImages[breedNameConverted] : Frankie;
  
  return (
    <Card>
      <Card.Img variant="top" src={ breedImage } />
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
        <FavoritesToggle breed={breed} />
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
};