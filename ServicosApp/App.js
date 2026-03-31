/**
 * App.js
 * ============================================================
 * Ponto de entrada do aplicativo.
 *
 * Aqui configuramos o Stack Navigator — o sistema de navegação
 * que empilha telas (como um histórico de páginas do browser).
 *
 * Estrutura de telas:
 *   Home  →  ListaServicos
 *         →  CadastrarServico
 * ============================================================
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// native-stack é otimizado para a Nova Arquitetura do Android (Fabric/JSI)
// e evita o erro "java.lang.String cannot be cast to java.lang.Boolean"
// que ocorre com o @react-navigation/stack + newArchEnabled: true
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa cada tela que criamos
import HomeScreen from "./screens/HomeScreen";
import ListaServicos from "./screens/ListaServicos";
import CadastrarServico from "./screens/CadastrarServico";

// createNativeStackNavigator usa views nativas via react-native-screens
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    /*
      NavigationContainer é o componente raiz do React Navigation.
      Deve envolver TODAS as telas do app.
    */
    <NavigationContainer>
      {/*
        Stack.Navigator gerencia as telas em pilha.
        initialRouteName → tela exibida ao abrir o app
      */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#1a1a2e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Cada Stack.Screen define uma "rota" do app */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Menu Principal" }}
        />
        <Stack.Screen
          name="ListaServicos"
          component={ListaServicos}
          options={{ title: "Serviços Cadastrados" }}
        />
        <Stack.Screen
          name="CadastrarServico"
          component={CadastrarServico}
          options={({ route }) => ({
            title: route.params?.servico ? "Editar Serviço" : "Novo Serviço",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
