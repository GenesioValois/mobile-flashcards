import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import DeckList from "../pages/DeckList";
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
