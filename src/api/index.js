import AsyncStorage from "@react-native-async-storage/async-storage";

const generateUID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const STORAGE_KEY = "flashcards";

const initialData = () => {
  return {
    sxbjgrwdbhf58lxznh9q79: {
      id: "sxbjgrwdbhf58lxznh9q79",
      title: "Capital Cities",
      questions: [
        {
          question: "What is the capital city of Germany?",
          answer: "Berlin",
        },
        {
          question: "What is the capital city of France?",
          answer: "Paris",
        },
        {
          question: "What is the capital city of Belgium?",
          answer: "Br�ssel",
        },
        {
          question: "What is the capital city of Netherlands?",
          answer: "Amsterdam",
        },
        {
          question: "What is the capital city of Portugal?",
          answer: "Lisbon",
        },
      ],
    },
  };
};

export const getDecks = async () => {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    if (results && results !== "{}") {
      const data = JSON.parse(results);
      return data;
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData()));
      return initialData();
    }
  } catch (error) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData()));
    return initialData();
  }
};

export const saveDeck = async (title) => {
  const id = generateUID();
  const deck = {
    id: id,
    title: title,
    questions: [],
  };

  await AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [id]: deck,
    })
  );
  return deck;
};

export const saveCardToDeck = async (deckId, card) => {
  const results = await AsyncStorage.getItem(STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck,
      })
    );
    return card;
  }
};
