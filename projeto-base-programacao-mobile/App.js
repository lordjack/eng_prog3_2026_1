import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroducaoRN from './src/screens/IntroducaoRN';
import HomeScreen from './src/screens/HomeScreen';
import AlunoListScreen from './src/screens/AlunoListScreen';
import AlunoFormScreen from './src/screens/AlunoFormScreen';
import APIListScreen from './src/screens/APIListScreen';
import ClienteAPIListScreen from './src/screens/ClienteApi/ClienteAPIListScreen';
import ClienteAPIFormScreen from './src/screens/ClienteApi/ClienteAPIFormScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="IntroducaoRN" component={IntroducaoRN} />
      <Stack.Screen
        name="AlunoListScreen"
        component={AlunoListScreen}
        options={{ title: 'Listagem de Produtos' }}
      />
      <Stack.Screen
        name="AlunoFormScreen"
        component={AlunoFormScreen}
        options={{ title: 'Formulário Aluno' }}
      />
      <Stack.Screen
        name="APIListScreen"
        component={APIListScreen}
        options={{ title: 'Listagem de Dados' }}
      />
      <Stack.Screen
        name="ClienteAPIListScreen"
        component={ClienteAPIListScreen}
        options={{ title: 'Listagem de Dados Cliente' }}
      />
      <Stack.Screen
        name="ClienteAPIFormScreen"
        component={ClienteAPIFormScreen}
        options={{ title: 'Formulário Cliente' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
