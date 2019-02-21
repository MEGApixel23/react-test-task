import { createEmptyPlayer } from './../utils';

export default function (state = [], action) {
  switch (action.type) {
    case 'CHANGE_CURRENT_PLAYER_FIELD':
      const { field, payload } = action.payload;

      return {
        ...state,
        [field]: {
          ...state[field],
          ...payload
        }
      };
    case 'CLEAR_CURRENT_PLAYER':
      return createEmptyPlayer();
    default:
      return state;
  }
}
