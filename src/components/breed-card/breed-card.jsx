import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { split } from 'lodash';
import FavoritesToggle from '../favorites-toggle/favorites-toggle';
import missing_image from 'url:../../../assets/missing_image.jpg';
import { breedImages } from '../breed-images'

// Styling
import './breed-card.scss';

export default function BreedCard({ breed }) {

  const purposeArray = split(breed.purpose, ', ');
  const isDualPurpose =  (purposeArray) => {
    return (purposeArray.indexOf('meat') > -1 && purposeArray.indexOf('eggs') > -1 );
  }
  
  const breedsPurpose = isDualPurpose(purposeArray) ? [...purposeArray, "Dual-purpose"] : purposeArray;

  const breedNameConverted = breed.breed.replace(/\s+/g, '').toLowerCase();
  const breedImage = breedImages[breedNameConverted] ? breedImages[breedNameConverted] : missing_image;
  
  return (
    <Card>
      <Card.Img variant="top" src={ breedImage } />
      <Card.Body>
        <Card.Title>{breed.breed}</Card.Title>
        <Card.Text as="div">
          <p>
            Egg color: {breed.eggColor}
          </p>
          {breed.purpose && 
            <p>
              Purpose: <br/>
              {breedsPurpose.map((purpose, index, array) => {
                const correctedPurpose = (purpose === 'show' ? 'exhibition' : purpose)
                return (
                  <Link to={`/purpose/${correctedPurpose}`} key={correctedPurpose}>
                    {purpose}
                    {index < array.length - 1 && array.length > 1 ? ", ": ""}
                  </Link>
                )
              })}
            </p>
          }
          <p>
            APA class: <br/>
            <Link to={`/apaclass/${breed.apaClass.name}`}>
              {breed.apaClass.name}
            </Link>
          </p>
        </Card.Text>
        <div className='breed-card__actions'>
          <Link to={`/breeds/${breed.breed}`}>
            <Button >Open</Button> {/* variant="link" */}
          </Link>
          <FavoritesToggle breed={breed} />
        </div>
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