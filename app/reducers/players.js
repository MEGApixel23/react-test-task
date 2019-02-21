export default function (state = [], action) {
  switch (action.type) {
    case 'DELETE_PLAYER_BY_INDEX':
      const index = action.payload;

      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
