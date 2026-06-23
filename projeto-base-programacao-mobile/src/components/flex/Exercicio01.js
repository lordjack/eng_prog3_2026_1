import { StyleSheet, Text, View } from 'react-native';

export default function Exercicio01() {
  return (
    <View style={styles.container}>
      <Text>Coluna Vertical</Text>
      <View style={styles.secaoColumn}>
        <View style={styles.bloco}>
          <Text style={styles.blocoText}>1</Text>
        </View>
        <View style={styles.bloco}>
          <Text style={styles.blocoText}>2</Text>
        </View>
        <View style={styles.bloco}>
          <Text style={styles.blocoText}>3</Text>
        </View>
      </View>

      <Text>Coluna Horizontal</Text>
      <View style={styles.secaoRow}>
        <View style={styles.bloco}>
          <Text style={styles.blocoText}>1</Text>
        </View>
        <View style={styles.bloco}>
          <Text style={styles.blocoText}>2</Text>
        </View>
        <View style={styles.bloco}>
          <Text style={styles.blocoText}>3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  secaoColumn: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  secaoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bloco: {
    width: 80,
    height: 80,
    backgroundColor: '#3498db',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blocoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
