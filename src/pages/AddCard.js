import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { handleAddCard } from "../store/actions/decks";

const AddCard = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const { deckId } = params;
  const [card, changeState] = useState({ question: "", answer: "" });
  const { question, answer } = card;

  const onChangeCard = (field, value) => {
    changeState(() => ({
      ...card,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(handleAddCard(deckId, card));
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Card.Title title="New Card" style={styles.text} />
        <Card.Content>
          <TextInput
            style={styles.input}
            placeholder="What is the title of your card?"
            onChangeText={(text) => onChangeCard("question", text)}
            value={question}
          />
          <TextInput
            style={styles.input}
            placeholder="What is the answerof your card?"
            onChangeText={(text) => onChangeCard("answer", text)}
            value={answer}
          />
        </Card.Content>

        <Card.Actions>
          <Button block light onPress={handleSubmit}>
            <Text>Add Card</Text>
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
  cardActions: {
    marginVertical: 10,
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
