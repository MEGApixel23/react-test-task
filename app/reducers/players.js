import { sortingFn } from './../utils';

export default function (state = [], action) {
  switch (action.type) {
    case 'DELETE_PLAYER_BY_INDEX':
      const index = action.payload;

      return [...state.slice(0, index), ...state.slice(index + 1)];
    case 'ADD_PLAYER':
      return [
        ...state,
        {
          ...action.payload,
          score: parseInt(action.payload.score)
        }
      ].sort(sortingFn);
    default:
      return state;
  }
}
