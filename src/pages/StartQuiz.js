import React, { useState } from "react";
import { ScrollView, SafeAreaView, View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, IconButton, Colors } from "react-native-paper";
import { useSelector } from "react-redux";

const StartQuiz = ({ navigation, route: { params } }) => {
  const { deckId } = params;
  const deck = useSelector(({ decks }) => decks[deckId]);

  const questions = deck.questions;
  const [quiz, setQuiz] = useState({
    index: 0,
    correct: 0,
    incorrect: 0,
    total: questions.length,
    showAnswer: false,
  });

  const { showAnswer, index } = quiz;
  const answerQuestion = (field) => {
    setQuiz(() => ({
      ...quiz,
      [field]: quiz[field] + 1,
      showAnswer: false,
      index: index + 1,
    }));
    if (index + 1 === quiz.total) {
      navigation.navigate("Quiz Result", { ...quiz, deckId });
      setQuiz({
        index: 0,
        correct: 0,
        incorrect: 0,
        total: questions.length,
        showAnswer: false,
      });
    }
  };

  return questions[index] ? (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: "100%" }}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.question}>{questions[index].question}</Title>
              <Paragraph style={styles.text}>{showAnswer ? questions[index].answer : ""}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <IconButton
                icon="close-outline"
                color={Colors.red400}
                size={40}
                onPress={() => answerQuestion("incorrect")}
              />
              <IconButton
                icon="eye-check-outline"
                color={Colors.blue300}
                size={40}
                onPress={() => setQuiz({ ...quiz, showAnswer: !showAnswer })}
              />
              <IconButton
                icon="check-outline"
                color={Colors.green400}
                size={40}
                onPress={() => answerQuestion("correct")}
              />
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : null;
};

// for some reason on the simulator web the background was black and the font white, so I created
// theses rules to fix it. the curious thing is that on the iphone is working fine.
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
  },
  text: {
    alignSelf: "center",
  },
  question: {
    color: "black",
    fontSize: 20,
    marginVertical: 100,
  },
  actions: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
export default StartQuiz;
