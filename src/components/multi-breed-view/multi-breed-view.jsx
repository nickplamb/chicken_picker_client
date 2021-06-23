import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap'

import { BreedCard } from '../breed-card/breed-card';

export function MultiBreedView({ breeds, token, favoriteBreeds }) {


  return(
    breeds.map(breed => {
      const isFavorite = (favoriteBreeds.map(favBreed => favBreed._id).indexOf(breed._id) > -1) ? true : false

        return (
          <Col sm={10} md={6} lg={4} xl={3} className="mt-2" key={ breed._id }>
            <BreedCard 
              breed={ breed } 
              token={ token } 
              isFavorite={ isFavorite }
            />
          </Col>
        )
    })
  )
}

MultiBreedView.propTypes = {
  breeds: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  favoriteBreeds: PropTypes.array.isRequired
};