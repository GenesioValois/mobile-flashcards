import { getDecks, saveCardToDeck, saveDeck } from "../../api";
export const SET_DECKS = "SET_DECKS";
export const ADD_CARD = "ADD_CARD";
export const ADD_DECK = "ADD_DECK";

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

export const handleCreateDeck = (title) => (dispatch) => {
  return saveDeck(title).then((deck) => {
    dispatch(createDeck(deck));
  });
};

export function createDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}
