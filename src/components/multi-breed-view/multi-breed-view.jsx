import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap'

import { BreedCard } from '../breed-card/breed-card';

export function MultiBreedView({ breeds, token, favoriteBreeds }) {

  // console.log(breeds.map(breed => breed.apaClass.name).filter((v, i, s) => s.indexOf(v)===i))
  return(
    breeds.map(breed => 
      (
        <Col sm={10} md={6} lg={4} xl={3} className="mt-2" key={ breed._id }>
          <BreedCard 
            breed={ breed } 
            token={ token } 
            isFavorite={ (favoriteBreeds.indexOf(breed) > -1) ? true : false}
          />
        </Col>
      )
    )
  )
}

MultiBreedView.propTypes = {
  breeds: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  favoriteBreeds: PropTypes.array.isRequired
};