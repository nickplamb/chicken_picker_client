import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './favorites-toggle.scss'

const baseURL = 'https://chickens-api.herokuapp.com';

export function FavoritesToggle({ breed, isFavorite, token })  {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isFavoriteIcon, setIsFavoriteIcon] = useState(isFavorite ? '\u2605' : '\u2606');
  
  let axiosConfig = {
    url: `${baseURL}/users/favorites/`
  }

  const onHover = e => {
    const star = e.target;
    if (!favorite) star.style.color = 'yellow';
  }

  const onNotHover = e => {
    const star = e.target;
    if (!favorite) star.style.color = 'grey';
  }
  
  const onClick = e => {
    setFavorite(() => !favorite)
  }

  useEffect(() => {
    const star = document.getElementById(`${breed.breed}-toggle-star`);
    favorite ? setIsFavoriteIcon('\u2605') : setIsFavoriteIcon('\u2606')
    star.style.color = (favorite ? 'yellow' : 'grey');

  }, [favorite])


  return (
    <span 
      className="toggle-star"
      id={`${breed.breed}-toggle-star`}
      onMouseOver={onHover}
      onMouseOut={onNotHover}
      onClick={onClick}
    >
      {isFavoriteIcon}
    </span>
  )
}

FavoritesToggle.propTypes = {
  breed: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired
};