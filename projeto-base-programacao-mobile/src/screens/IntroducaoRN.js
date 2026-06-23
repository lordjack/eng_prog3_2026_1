import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AssetExample from '../components/AssetExample';
import Pessoa from '../components/Pessoa';
import Carro from '../components/Carro';
import Exercicio01 from '../components/flex/Exercicio01';
import Exercicio02 from '../components/flex/Exercicio02';
import Exercicio03Paper from '../components/flex/Exercicio03Paper';
import Exercicio04Paper from '../components/flex/Exercicio04Paper';
export default function IntroducaoRN() {
  function Hello({ nome, msg }) {
    return (
      <View>
        <Text>{msg}</Text>
        <Text>Meu nome é {nome} </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>Exercicio Estilos</Text>
      <View>
        <Exercicio01 />
      </View>
      <Exercicio02 />
      <View>
        <Exercicio03Paper />
      </View>
      <View>
        <Exercicio04Paper />
      </View>
      <Hello nome="Jackson Five" msg="Bem vindo!" />
      <Pessoa nome="Jackson" idade={38} />
      <Text>-----------</Text>
      <Carro
        nome="Camaro"
        ano="2024"
        modelo="2.4"
        potencia="250cv"
        fabricante="Levorim"
        tamanho="18"
      />
      <Text>-----------</Text>
      <Carro
        nome="New Fiesta"
        ano="2014"
        modelo="1.6"
        potencia="130cv"
        fabricante="Continental"
        tamanho="15"
      />
      <Text>-----------</Text>
      <Carro
        nome="Toyota Prius"
        ano="2019"
        modelo="1.8"
        potencia="160cv"
        fabricante="Pirelli"
        tamanho="17"
      />
    </ScrollView>
  );
}
