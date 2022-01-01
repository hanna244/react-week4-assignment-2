import { TYPE_ADD_RESTAURANT } from '../actions/restaurant';

export const initialState = {
  lastId: -1,
  restaurants: [],
};

const restaurantReducer = (state = initialState, action = {}) => {
  if (action.type === TYPE_ADD_RESTAURANT) {
    const newId = state.lastId + 1;
    const newRestaurant = { id: newId, ...action.payload };
    return {
      ...state,
      lastId: newId,
      restaurants: [...state.restaurants, newRestaurant],
    };
  }

  return state;
};

export default restaurantReducer;