import { SET_DECKS } from "../actions/decks";

export default function deckReducer(state = [], action) {
  switch (action.type) {
    case SET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    default:
      return state;
  }
}
