
export const SET_BREEDS = 'SET_BREEDS';
export const SET_FILTER = 'SET_FILTER';

export function setBreeds(value) {
  return { type: SET_BREEDS, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}
