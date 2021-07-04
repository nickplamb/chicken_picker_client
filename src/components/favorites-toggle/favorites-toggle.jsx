import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUserFavorites } from '../../actions/actions';

import './favorites-toggle.scss'

const baseURL = 'https://chickens-api.herokuapp.com';

const filledInStarIcon = '\u2605';
const outlineStarIcon = '\u2606';

export function FavoritesToggle({ breed, userFavorites, userToken })  {
  const isAFavoriteBreed = userFavorites.map(favoriteBreed => favoriteBreed._id).indexOf(breed._id) > -1 ? true : false;

  // Check if the id of breed prop is in the array of favorite breeds
  const favoriteStarColorClass = (isHighlighted=false) => {
    if ((isHighlighted &&  isAFavoriteBreed) || (!isHighlighted && !isAFavoriteBreed)) return 'toggle-Star__grey';
    if ((isHighlighted && !isAFavoriteBreed) || (!isHighlighted &&  isAFavoriteBreed)) return 'toggle-Star__gold';

    // (isAFavoriteBreed ? 1 :0) ^ (isHighlighted ? 1 : 0)
  }
  
  let isFavoriteIcon = isAFavoriteBreed ? filledInStarIcon : outlineStarIcon;
  let favoriteColorClass = favoriteStarColorClass(false);// false for not highlighted.


  let axiosConfig = {
    url: `${baseURL}/users/favorites/${breed._id}`,
    headers:  {Authorization: `Bearer ${userToken}`}
  }

  const onHover = e => {
    // const star = e.target;
    if (!isAFavoriteBreed) favoriteStarColorClass(true); // is highlighted
  }

  const onNotHover = e => {
    // const star = e.target;
    if (!isAFavoriteBreed) favoriteStarColorClass(false); // is no longer highlighted
  }
  
  const onClick = e => {
    if (!isAFavoriteBreed) {
      axiosConfig.method = 'post';
      // onFavoritesToggle([...favoritesArray, breed]) 
    }

    if (isAFavoriteBreed) {
      axiosConfig.method = 'delete';
      // onFavoritesToggle(favoritesArray.filter(item => item._id !== breed._id))
    }

    axios(axiosConfig)
      .then(res => {
        setUserFavorites(res.data)
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <span 
      className={`toggle-star ${favoriteColorClass}`}
      id={`${breed.breed}-toggle-star`}
      onMouseOver={onHover}
      onMouseOut={onNotHover}
      onClick={onClick}
    >
      {isFavoriteIcon}
    </span>
  )
}

const mapStateToProps = state => {
  return { 
    userToken: state.user.token,
    userFavorites: state.user.favorites
  }
};

const actionCreators = {
  setUserFavorites
};

export default connect(mapStateToProps, actionCreators)(FavoritesToggle);

// FavoritesToggle.propTypes = {
//   breed: PropTypes.object.isRequired,
//   token: PropTypes.string.isRequired,
//   isFavorite: PropTypes.bool.isRequired
// };