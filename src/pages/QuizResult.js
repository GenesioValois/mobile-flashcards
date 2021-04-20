import React, { useEffect } from "react";
import { ScrollView, SafeAreaView, View, StyleSheet } from "react-native";
import { Card, Paragraph, Button, Colors } from "react-native-paper";
import { clearLocalNotification } from "../notification";

const QuizResult = ({ navigation, route: { params } }) => {
  const { correct, total, deckId } = params;
  const result = ((correct / total) * 100).toFixed(1);
  const color = result > 70 ? Colors.green500 : result > 50 ? Colors.blue300 : Colors.red400;
  useEffect(() => {
    clearLocalNotification();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: "100%" }}>
          <Card style={styles.card}>
            <Card.Title title="Quiz Completed" />
            <Card.Content>
              <Paragraph style={[styles.text, { color }]}>
                You scored {result}%, {correct} of {total} answered correctly.
              </Paragraph>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button onPress={() => navigation.navigate("Start Quiz", { deckId })}>
                Restart Quiz
              </Button>
              <Button onPress={() => navigation.navigate("Deck Detail", { deckId })}>
                Back to Deck
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    fontSize: 16,
    marginVertical: 60,
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
export default QuizResult;
