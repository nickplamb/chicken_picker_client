import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap'

import { BreedCard } from '../breed-card/breed-card';
import { FavoritesToggle } from '../favorites-toggle/favorites-toggle';

export function MultiBreedView({ breeds, token, favoriteBreeds }) {
  const [favoritesArray, setFavoritesArray] = useState(favoriteBreeds)

  const onFavoritesToggle = newFavoritesArray => setFavoritesArray(newFavoritesArray) //https://stackoverflow.com/questions/28595437/passing-ajax-results-as-props-to-child-component

  return(
    breeds.map(breed => {
      const isFavorite = (favoritesArray.map(favoriteBreed => favoriteBreed._id).indexOf(breed._id) > -1) ? true : false;

      const favoritesToggle = (
        <FavoritesToggle 
          breed={ breed } 
          token={ token } 
          isFavorite={ isFavorite } 
          favoritesArray={ favoritesArray } 
          onFavoritesToggle={ onFavoritesToggle } 
        />
      )

      return (
        <Col sm={10} md={6} lg={4} xl={3} className="mt-2" key={ breed._id }>
          <BreedCard 
            breed={ breed } 
            favoritesToggle={ favoritesToggle }
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