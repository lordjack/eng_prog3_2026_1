/**
 * screens/ListaServicos.js
 * ============================================================
 * Tela de listagem — busca, edita e exclui serviços.
 * ============================================================
 */
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getServicos, excluirServico } from "../api/api";

export default function ListaServicos({ navigation }) {
  const [servicos, setServicos] = useState([]);
  const [servicosFiltrados, setServicosFiltrados] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Recarrega a lista sempre que a tela recebe foco
  // (ex.: ao voltar da tela de cadastro/edição)
  useFocusEffect(
    useCallback(() => {
      carregarServicos();
    }, []),
  );

  async function carregarServicos() {
    try {
      setCarregando(true);
      setErro(null);
      setBusca("");
      const dados = await getServicos();
      setServicos(dados);
      setServicosFiltrados(dados);
    } catch {
      setErro(
        "Não foi possível conectar ao servidor.\nVerifique o BASE_URL em api/api.js",
      );
    } finally {
      setCarregando(false);
    }
  }

  // Filtra em tempo real pelo nome do cliente ou ID do serviço
  function handleBusca(texto) {
    setBusca(texto);
    if (!texto.trim()) {
      setServicosFiltrados(servicos);
      return;
    }
    const lower = texto.toLowerCase();
    setServicosFiltrados(
      servicos.filter(
        (s) =>
          s.nmCliente?.toLowerCase().includes(lower) ||
          s.idServico?.toString().includes(lower) ||
          s.nmPrestador?.toLowerCase().includes(lower),
      ),
    );
  }

  function handleEditar(servico) {
    // Navega para CadastrarServico passando o serviço como parâmetro
    navigation.navigate("CadastrarServico", { servico });
  }

  function handleExcluir(servico) {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja excluir o Serviço #${servico.idServico}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const resultado = await excluirServico(servico.idServico);
              const deuCerto =
                resultado.sucesso === true ||
                resultado.sucesso === 1 ||
                resultado.sucesso === "1" ||
                resultado.sucesso === "true";
              if (deuCerto) {
                // Remove localmente sem precisar recarregar tudo
                const atualizados = servicos.filter(
                  (s) => s.idServico !== servico.idServico,
                );
                setServicos(atualizados);
                setServicosFiltrados(
                  atualizados.filter((s) => {
                    if (!busca.trim()) return true;
                    const lower = busca.toLowerCase();
                    return (
                      s.nmCliente?.toLowerCase().includes(lower) ||
                      s.idServico?.toString().includes(lower) ||
                      s.nmPrestador?.toLowerCase().includes(lower)
                    );
                  }),
                );
              } else {
                Alert.alert(
                  "Erro",
                  resultado.mensagem ?? "Não foi possível excluir.",
                );
              }
            } catch {
              Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            }
          },
        },
      ],
    );
  }

  function renderItem({ item }) {
    return (
      <View style={estilos.card}>
        <Text style={estilos.cardTitulo}>Serviço #{item.idServico}</Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Cliente: </Text>
          {item.nmCliente}
        </Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Endereço: </Text>
          {item.nmEndereco}
        </Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Requisição: </Text>
          {item.dtRequisicao}
        </Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Início: </Text>
          {item.dtInicio || "—"}
        </Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Término: </Text>
          {item.dtFim || "—"}
        </Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Custo Material: </Text>
          R$ {parseFloat(item.vCustoMaterial).toFixed(2)}
        </Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Mão de Obra: </Text>
          R$ {parseFloat(item.vCustoMaoDeObra).toFixed(2)}
        </Text>
        <Text style={estilos.cardLinha}>
          <Text style={estilos.rotulo}>Prestador: </Text>
          {item.nmPrestador || "—"}
        </Text>

        {/* ── Botões de ação ── */}
        <View style={estilos.acoes}>
          <TouchableOpacity
            style={[estilos.botaoAcao, estilos.botaoEditar]}
            onPress={() => handleEditar(item)}
          >
            <Text style={estilos.textoBotaoAcao}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.botaoAcao, estilos.botaoExcluir]}
            onPress={() => handleExcluir(item)}
          >
            <Text style={estilos.textoBotaoAcao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (carregando) {
    return (
      <View style={estilos.centralize}>
        <ActivityIndicator size="large" color="#1a1a2e" />
        <Text style={{ marginTop: 12 }}>Carregando serviços...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={estilos.centralize}>
        <Text style={estilos.textoErro}>{erro}</Text>
        <TouchableOpacity
          style={estilos.botaoRecarregar}
          onPress={carregarServicos}
        >
          <Text style={{ color: "#fff" }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      {/* ── Barra de busca ── */}
      <TextInput
        style={estilos.campoBusca}
        placeholder="Buscar por cliente, prestador ou nº..."
        value={busca}
        onChangeText={handleBusca}
        clearButtonMode="while-editing"
      />

      {/* ── Cabeçalho ── */}
      <View style={estilos.header}>
        <Text style={estilos.contador}>
          {servicosFiltrados.length} serviço(s)
        </Text>
        <TouchableOpacity onPress={carregarServicos}>
          <Text style={estilos.linkAtualizar}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={servicosFiltrados}
        keyExtractor={(item) => item.idServico.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={estilos.textoVazio}>Nenhum serviço encontrado.</Text>
        }
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  centralize: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  campoBusca: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  contador: {
    fontSize: 14,
    color: "#666",
  },
  linkAtualizar: {
    color: "#1a1a2e",
    fontWeight: "bold",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  cardLinha: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
  rotulo: {
    fontWeight: "bold",
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 8,
  },
  botaoAcao: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  botaoEditar: {
    backgroundColor: "#1565c0",
  },
  botaoExcluir: {
    backgroundColor: "#c62828",
  },
  textoBotaoAcao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  textoErro: {
    color: "#c00",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  textoVazio: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 15,
  },
  botaoRecarregar: {
    backgroundColor: "#1a1a2e",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
