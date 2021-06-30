import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { Col } from 'react-bootstrap'

import { BreedCard } from '../breed-card/breed-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { FavoritesToggle } from '../favorites-toggle/favorites-toggle';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter }
};

function MultiBreedView({ breeds, token, favoriteBreeds, visibilityFilter }) {
  const [favoritesArray, setFavoritesArray] = useState(favoriteBreeds)
  let filteredBreeds = breeds;

  if (visibilityFilter!== ''){
    filteredBreeds = breeds.filter(breed => breed.breed.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!breeds) return <div className="main-view" />;

  const onFavoritesToggle = newFavoritesArray => setFavoritesArray(newFavoritesArray) //https://stackoverflow.com/questions/28595437/passing-ajax-results-as-props-to-child-component

  return(
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={ visibilityFilter } />
      </Col>
      {filteredBreeds.map(breed => {
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
      })}
    </>
  )
}

export default connect(mapStateToProps)(MultiBreedView);

MultiBreedView.propTypes = {
  breeds: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  favoriteBreeds: PropTypes.array.isRequired
};