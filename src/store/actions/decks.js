import { getDecks } from "../../api";
export const SET_DECKS = "SET_DECKS";

export const handleSetDecks = () => (dispatch) => {
  return getDecks().then((decks) => {
    dispatch(setDecks(decks));
  });
};

export const setDecks = (decks) => ({ type: SET_DECKS, decks });
