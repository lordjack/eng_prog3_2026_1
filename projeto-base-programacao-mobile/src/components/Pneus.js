import { StyleSheet, Text, View } from 'react-native';

export default function Pneus({ fabricante, tamanho }) {
  return (
    <View>
      <Text>Pneus</Text>
      <Text>Fabricante: {fabricante}</Text>
      <Text>Tamanho: {tamanho} </Text>
    </View>
  );
}
