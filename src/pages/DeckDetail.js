import React from "react";
import { ScrollView, SafeAreaView, View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
const myIcon = () => <Icon name="folder" size={30} />;

const DeckDetail = ({ route: { params } }) => {
  const { deckId } = params;
  const { deck } = useSelector(({ decks }) => ({
    deck: decks[deckId],
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: "100%" }}>
          <Card style={styles.card}>
            <Card.Title title={deck.title} left={myIcon} style={styles.text} />
            <Card.Content>
              <Title style={styles.text}>Questinos</Title>
              <Paragraph style={styles.text}>
                This deck contains {deck.questions.length} question cards
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Start quiz</Button>
              <Button>Add question</Button>
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

  cardActions: {
    marginVertical: 10,
  },
  text: { color: "black" },
});
export default DeckDetail;
