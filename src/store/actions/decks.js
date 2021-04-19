import { getDecks, saveCardToDeck } from "../../api";
export const SET_DECKS = "SET_DECKS";
export const ADD_CARD = "ADD_CARD";

export const handleSetDecks = () => (dispatch) => {
  return getDecks().then((decks) => {
    dispatch(setDecks(decks));
  });
};

export const setDecks = (decks) => ({ type: SET_DECKS, decks });

export const handleAddCard = (deckId, card) => (dispatch) => {
  return saveCardToDeck(deckId, card).then(() => {
    dispatch(addCard(deckId, card));
  });
};

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}
