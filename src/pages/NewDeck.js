import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateDeck } from "../store/actions/decks";

const AddCard = ({
  navigation,
  route: {
    params: { decksTotal },
  },
}) => {
  const dispatch = useDispatch();
  const deckIds = useSelector(({ decks }) => Object.keys(decks));
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (deckIds.length !== decksTotal) {
      navigation.navigate("Deck Detail", { deckId: deckIds[deckIds.length - 1] });
    }
  }, [decksTotal, deckIds]);

  const handleSubmit = () => {
    dispatch(handleCreateDeck(title));
  };
  return (
    <View style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Card.Title title="New Deck" style={styles.text} />
        <Card.Content>
          <TextInput
            style={styles.input}
            placeholder="Deck title"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
        </Card.Content>
        <Card.Actions>
          <Button block light onPress={handleSubmit}>
            <Text>Create Deck</Text>
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
  },
  input: {
    fontSize: 16,
    borderBottomColor: "rgb(64,64,64)",
    borderBottomWidth: 0.8,
    marginVertical: 15,
    color: "black",
  },
  text: { color: "black" },
});
export default AddCard;
