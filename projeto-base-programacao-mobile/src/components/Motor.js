import { StyleSheet, Text, View } from 'react-native';

export default function Motor({ modelo, potencia }) {
  return (
    <View>
      <Text>Motor</Text>
      <Text>Modelo: {modelo}</Text>
      <Text>Potência: {potencia} </Text>
    </View>
  );
}
