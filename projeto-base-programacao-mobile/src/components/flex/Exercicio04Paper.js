import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Exercicio04Paper() {
  return (
    <View style={styles.container}>
      <Text> 3 Buttons</Text>
      <View style={styles.rowContainer}>
        <Button
          icon="camera"
          mode="contained"
          style={styles.botao}
          onPress={() => console.log('Pressed')}>
          BTN 1
        </Button>
        <Button
          style={styles.botao}
          icon="camera"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          BTN 2
        </Button>
        <Button
          icon="camera"
          mode="contained"
          style={styles.botao}
          onPress={() => console.log('Pressed')}>
          BTN 3
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  botao: {
    flex: 1,
    marginHorizontal: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
