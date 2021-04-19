import React from "react";
import { ScrollView, SafeAreaView, View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
const myIcon = () => <Icon name="folder" size={30} />;

const DeckList = ({ navigation }) => {
  const { decks, deckIds } = useSelector((state) => ({
    decks: state.decks,
    deckIds: Object.keys(state.decks),
  }));

  const openDeck = (deckId) => {
    navigation.navigate("Deck Detail", { deckId });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: "100%" }}>
          {deckIds.map((deckId) => {
            return (
              <Card key={deckId} style={styles.card} onPress={() => openDeck(deckId)}>
                <Card.Title title={decks[deckId].title} left={myIcon} style={styles.text} />
                <Card.Content>
                  <Title style={styles.text}>Questinos</Title>
                  <Paragraph style={styles.text}>
                    This deck contains {decks[deckId].questions.length} question cards
                  </Paragraph>
                </Card.Content>
              </Card>
            );
          })}
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
  text: { color: "black" },
});
export default DeckList;
