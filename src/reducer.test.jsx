import reducer from './reducer';
import { addRestaurant } from './actions';

it('updates title of task', () => {
  const newRestaurant = {
    id: 1, name: '마녀주방', category: '한식', address: '서울시 강남구',
  };

  const newState = reducer(undefined, addRestaurant(newRestaurant));

  expect(newState).toEqual({
    restaurants: [
      {
        id: 1, name: '마녀주방', category: '한식', address: '서울시 강남구',
      },
    ],
  });
});
