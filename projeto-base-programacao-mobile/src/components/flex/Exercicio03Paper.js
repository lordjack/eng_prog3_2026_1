import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Exercicio03Paper() {
  return (
    <View style={styles.container}>
      <Text> 3 Cards</Text>
      <View style={styles.rowContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Card 1</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Card 2</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Card 3</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
  },
});
