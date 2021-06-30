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
  breeds
})

export default breedsApp;