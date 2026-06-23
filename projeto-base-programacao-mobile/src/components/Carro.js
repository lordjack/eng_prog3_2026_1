import { StyleSheet, Text, View } from 'react-native';
import Motor from './Motor';
import Pneus from './Pneus';

export default function Carro({ nome, ano, modelo, potencia, fabricante,tamanho }) {
  return (
    <View>
      <Text>Carro</Text>
      <Text>Nome: {nome}</Text>
      <Text>Ano: {ano} </Text>
      <View>
        <Motor modelo={modelo} potencia={potencia} />
        <Pneus fabricante={fabricante} tamanho={tamanho} />
      </View>
    </View>
  );
}
