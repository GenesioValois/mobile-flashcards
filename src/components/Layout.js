import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import DeckList from "../pages/DeckList";
import DeckDetail from "../pages/DeckDetail";
import AddCard from "../pages/AddCard";
import StartQuiz from "../pages/StartQuiz";
import QuizResult from "../pages/QuizResult";
import NewDeck from "../pages/NewDeck";
import { handleSetDecks } from "../store/actions/decks";

const Stack = createStackNavigator();

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleSetDecks());
  });

  return (
    <NavigationContainer>
      <Stack.Navigator style={{ flex: 1 }}>
        <Stack.Screen name="Home" component={DeckList} />
        <Stack.Screen name="Deck Detail" component={DeckDetail} />
        <Stack.Screen name="New Deck" component={NewDeck} />
        <Stack.Screen name="Add Card" component={AddCard} />
        <Stack.Screen name="Start Quiz" component={StartQuiz} />
        <Stack.Screen name="Quiz Result" component={QuizResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
