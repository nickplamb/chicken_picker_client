import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { split } from 'lodash';
import { Col } from 'react-bootstrap';

import BreedCard from '../breed-card/breed-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import SortOrderInput from '../list-sort-input/list-sort-input';

import './multi-breed-view.scss';

// Props: Breeds passed from parent, visibilityFilter from store
function MultiBreedView({ breedsToDisplay, visibilityFilter, sortOrder }) {
  let filteredBreeds = breedsToDisplay;

  if (!breedsToDisplay) return <div className="main-view" />;
  
  
  // converts the purpose of certain breeds to duel-purpose for egg and meet and exhibition for exhibition and show.
  function convertPurposeString(breed) {
    let purposeArray = split(breed.purpose, ', ').sort();
    
    if (purposeArray.indexOf('meat') > -1 && purposeArray.indexOf('eggs') > -1 ) return 'dual-purpose';
    if (purposeArray.indexOf('show') > -1 || purposeArray.indexOf('exhibition') > -1) return 'exhibition';
    return purposeArray;
  }
  
  // takes two elements passed by array.sort() and uses the sort order to decide which sort order to use.
  function sortCompare(a, b) {
    let breedA = a.breed.toUpperCase();
    let breedB = b.breed.toUpperCase();

    switch (sortOrder) {
      case 'nameUp':
        if (breedA < breedB) return -1;
        if (breedA > breedB) return 1;
        return 0;
      case 'nameDown':
        if (breedA > breedB) return -1;
        if (breedA < breedB) return 1;
        return 0;
      case 'class':
        let aClass = a.apaClass.name.toUpperCase();
        let bClass = b.apaClass.name.toUpperCase();
        
        if (aClass < bClass) return -1;
        if (aClass > bClass) return 1;
        return 0;
      case 'purpose':
        if (convertPurposeString(a) < convertPurposeString(b)) return -1;
        if (convertPurposeString(a) > convertPurposeString(b)) return 1;
        return 0;
      default:
        break;
    }
  }

  // filter the breeds list by the state.visibilityFilter value
  if (visibilityFilter !== '') {
    filteredBreeds = breedsToDisplay.filter(breed => breed.breed.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  // then sort the filtered breeds by the state.sortOrder value
  if (sortOrder !== '') {
    filteredBreeds.sort((a, b) => sortCompare(a, b))
  }


  return(
    <>
      <Col xs={12} lg={10} className="filter-wrapper" >
        <VisibilityFilterInput visibilityFilter={ visibilityFilter } />
      </Col>
      <Col xs={12} lg={2} className="sort-wrapper">
        <SortOrderInput/>
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
  return { 
    visibilityFilter: state.visibilityFilter,
    sortOrder: state.sortOrder
  }
};

export default connect(mapStateToProps)(MultiBreedView);

MultiBreedView.propTypes = {
  breedsToDisplay: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};