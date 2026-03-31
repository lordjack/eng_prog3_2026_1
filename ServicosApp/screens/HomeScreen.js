/**
 * screens/HomeScreen.js
 * ============================================================
 * Tela inicial — Menu com dois botões de navegação.
 * ============================================================
 */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Gestão de Serviços</Text>
      <Text style={estilos.subtitulo}>Escolha uma opção abaixo</Text>

      {/*
        navigation.navigate('NomeDaTela') redireciona para outra tela
        definida no App.js (Stack.Navigator)
      */}
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate("ListaServicos")}
      >
        <Text style={estilos.textoBotao}>Ver Serviços</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[estilos.botao, estilos.botaoVerde]}
        onPress={() => navigation.navigate("CadastrarServico")}
      >
        <Text style={estilos.textoBotao}>Cadastrar Serviço</Text>
      </TouchableOpacity>
    </View>
  );
}

// StyleSheet.create() organiza estilos — similar ao CSS
const estilos = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a1a2e",
  },
  subtitulo: {
    fontSize: 15,
    color: "#666",
    marginBottom: 40,
  },
  botao: {
    backgroundColor: "#1a1a2e",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  botaoVerde: {
    backgroundColor: "#2e7d32",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
