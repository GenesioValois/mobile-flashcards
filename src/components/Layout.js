import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import DeckList from "../pages/DeckList";
import DeckDetail from "../pages/DeckDetail";
import AddCard from "../pages/AddCard";
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
        <Stack.Screen name="Add Card" component={AddCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
