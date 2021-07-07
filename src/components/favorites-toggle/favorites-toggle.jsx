import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUserFavorites } from '../../actions/actions';

import './favorites-toggle.scss'

const baseURL = 'https://chickens-api.herokuapp.com';

const filledInStarIcon = '\u2605';
const outlineStarIcon = '\u2606';

// Props: breed is from parent, rest from redux connect()
function FavoritesToggle({ breed, userFavorites, userToken, setUserFavorites })  {
  const [isHovered, setIsHovered] = useState(false)

  // is this breed in the users favorites array? true or false
  const isAFavoriteBreed = (userFavorites.map(favoriteBreed => favoriteBreed._id).indexOf(breed._id)) > -1 ? true : false;

  // two state, grey or gold. if is a favorite then it starts gold and highlights grey and vice versa
  const favoriteStarColorClass = () => {
    if ((isHovered &&  isAFavoriteBreed) || (!isHovered && !isAFavoriteBreed)) return 'toggle-Star__grey';
    if ((isHovered && !isAFavoriteBreed) || (!isHovered &&  isAFavoriteBreed)) return 'toggle-Star__gold';

    // (isAFavoriteBreed ? 1 :0) ^ (isHighlighted ? 1 : 0)
  }
  
  let isFavoriteIcon = isAFavoriteBreed ? filledInStarIcon : outlineStarIcon;

  let axiosConfig = {
    url: `${baseURL}/users/favorites/${breed._id}`,
    headers:  {Authorization: `Bearer ${userToken}`}
  }

  // https://stackoverflow.com/questions/44575727/react-js-toggle-adding-a-class-on-hover
  const toggleHover = () => setIsHovered(() => !isHovered);

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
        setUserFavorites(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  if (!userFavorites) return <span> ?? </span>
  return (
    <span 
      className={`toggle-star ${favoriteStarColorClass()}`}
      id={`${breed.breed}-toggle-star`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      // onMouseOver={onHover}
      // onMouseOut={onNotHover}
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

FavoritesToggle.propTypes = {
  breed: PropTypes.object.isRequired,
  userToken: PropTypes.string.isRequired,
  userFavorites: PropTypes.array.isRequired,
  setUserFavorites: PropTypes.func.isRequired
};