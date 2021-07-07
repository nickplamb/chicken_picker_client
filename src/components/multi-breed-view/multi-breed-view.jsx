import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { Col } from 'react-bootstrap'

import BreedCard from '../breed-card/breed-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

// Props: Breeds passed from parent, visibilityFilter from store
function MultiBreedView({ breedsToDisplay, visibilityFilter }) {
  let filteredBreeds = breedsToDisplay;

  if (visibilityFilter !== ''){
    filteredBreeds = breedsToDisplay.filter(breed => breed.breed.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!breedsToDisplay) return <div className="main-view" />;

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
  return { visibilityFilter: state.visibilityFilter }
};

export default connect(mapStateToProps)(MultiBreedView);

MultiBreedView.propTypes = {
  breedsToDisplay: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};