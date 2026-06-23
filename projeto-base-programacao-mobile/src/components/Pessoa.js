import { StyleSheet, Text, View } from 'react-native';

export default function Pessoa({ nome, idade }) {
  let resultado = 0;
  if (idade >= 18) {
    resultado = 'De maior';
  } else {
    resultado = 'De menor';
  }

  return (
    <View>
      <Text>Pessoa</Text>
      <Text>Nome: {nome}</Text>
      <Text>Idade: {idade} </Text>
      <Text>Pode dirigir ou não: {resultado} </Text>
    </View>
  );
}
