import { StyleSheet, Text, View } from 'react-native';

export default function Exercicio02() {
  return (
    <View style={styles.container}>
      <Text>Flex-End</Text>
      <View style={[styles.secaoRow, styles.flexEnd]}>
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

      <Text>Space-Between</Text>
      <View style={[styles.secaoRow, styles.spaceBetween]}>
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
  secaoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  bloco: {
    width: 40,
    height: 40,
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
