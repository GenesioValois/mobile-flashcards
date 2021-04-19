import { SET_DECKS, ADD_CARD } from "../actions/decks";

export default function deckReducer(state = [], action) {
  switch (action.type) {
    case SET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat([card]),
        },
      };
    default:
      return state;
  }
}
