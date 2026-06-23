import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('IntroducaoRN')}>
        Introdução RN
      </Button>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('AlunoListScreen')}>
        Aluno
      </Button>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('APIListScreen')}>
        API Listagem
      </Button>
        <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('ClienteAPIListScreen')}>
        Cliente API Listagem
      </Button>
    </View>
  );
}
