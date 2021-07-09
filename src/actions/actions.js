export const SET_BREEDS = 'SET_BREEDS';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';
export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_FAVORITES = 'SET_USER_FAVORITES';
export const USER_LOGOUT = 'USER_LOGOUT';

export function setBreeds(value) {
  return { type: SET_BREEDS, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setSortOrder(value) {
  return {type: SET_SORT_ORDER, value}
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function setToken(value) {
  return { type: SET_TOKEN, value };
}

export function setUserFavorites(value) {
  return { type: SET_USER_FAVORITES, value};
}

export function userLogout() {
  return { type: USER_LOGOUT }
}