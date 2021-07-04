import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { Col } from 'react-bootstrap'

import { BreedCard } from '../breed-card/breed-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { FavoritesToggle } from '../favorites-toggle/favorites-toggle';



function MultiBreedView({ breeds, user, visibilityFilter }) {
  let filteredBreeds = breeds;

  if (visibilityFilter !== ''){
    filteredBreeds = breeds.filter(breed => breed.breed.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!breeds) return <div className="main-view" />;

  return(
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={ visibilityFilter } />
      </Col>
      {filteredBreeds.map(breed => {
        // const isFavorite = (favoritesArray.map(favoriteBreed => favoriteBreed._id).indexOf(breed._id) > -1) ? true : false;

        return (
          <Col sm={10} md={6} lg={4} xl={3} className="mt-2" key={ breed._id }>
            <BreedCard breed={ breed } />
          </Col>
        )
      })}
    </>
  )
}

const mapStateToProps = state => {
  const { visibilityFilter, user } = state;
  return { visibilityFilter, user }
};

export default connect(mapStateToProps)(MultiBreedView);

// MultiBreedView.propTypes = {
//   breeds: PropTypes.array.isRequired,
//   token: PropTypes.string.isRequired,
//   favoriteBreeds: PropTypes.array.isRequired
// };