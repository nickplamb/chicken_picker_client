import { combineReducers } from "redux";

import { 
  SET_BREEDS, 
  SET_FILTER,
  SET_SORT_ORDER,
  SET_USER, 
  SET_TOKEN, 
  SET_USER_FAVORITES,
  USER_LOGOUT
} from "../actions/actions";

function visibilityFilter (state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    case USER_LOGOUT:
      return '';
    default:
      return state;
  }
}

function sortOrder (state='', action) {
  switch (action.type) {
    case SET_SORT_ORDER:
      return action.value;
    case USER_LOGOUT:
      return '';
    default:
      return state;
  }
}

function breeds(state = [], action) {
  switch (action.type) {
    case SET_BREEDS:
      return action.value;
    case USER_LOGOUT:
      return [];
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
      case SET_USER:
        return {
          ...state,
          username: action.value.username,
          userEmail: action.value.userEmail
        };
      case SET_TOKEN:
        return {
          ...state,
          token: action.value
        };
      case SET_USER_FAVORITES:
        return {
          ...state,
          favorites: action.value
        };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    // case SET_USERNAME:
    //   return {
    //     ...state,
    //     username: action.value
    //   };
    // case SET_USER_EMAIL:
    //   return {
    //     ...state,
    //     email: action.value
    //   };
    // case SET_USER_TOKEN:
    //   return {
    //     ...state,
    //     token: action.value
    //   };
  }
}

// custom combined reducer
// function breedsApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     breeds: breeds(state.breeds, action)
//   }
// }

// using combinedReducers function
const breedsApp = combineReducers({
  visibilityFilter,
  sortOrder,
  breeds,
  user
})

// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
// const breedsApp = (state, action) => {
//   if (action.type === USER_LOGOUT) {
//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// }

export default breedsApp;