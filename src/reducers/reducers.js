import { combineReducers } from "redux";

import { SET_BREEDS, SET_FILTER } from "../actions/actions";

function visibilityFilter (state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function breeds(state = [], action) {
  switch (action.type) {
    case SET_BREEDS:
      return action.value;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
      case SET_USER:
        return action.value;
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
  breeds,
  user
})

export default breedsApp;