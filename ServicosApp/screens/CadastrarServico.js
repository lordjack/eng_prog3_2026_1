/**
 * screens/CadastrarServico.js
 * ============================================================
 * Tela de cadastro — formulário para inserir um novo serviço.
 *
 * Conceitos abordados nesta tela:
 *   - Controlar cada campo do formulário com useState
 *   - Picker → combobox de clientes e prestadores
 *   - Envio de dados via POST usando cadastrarServico()
 *   - Alert → feedback nativo para sucesso/erro
 * ============================================================
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import {
  getClientes,
  getPrestadores,
  cadastrarServico,
  atualizarServico,
} from "../api/api";

// Formata um objeto Date para "YYYY-MM-DD HH:MM:SS" (padrão MySQL)
function formatarDataMysql(data) {
  const p = (n) => n.toString().padStart(2, "0");
  return `${data.getFullYear()}-${p(data.getMonth() + 1)}-${p(data.getDate())} ${p(data.getHours())}:${p(data.getMinutes())}:${p(data.getSeconds())}`;
}

export default function CadastrarServico({ navigation, route }) {
  // servico preenchido = modo edição | undefined = modo cadastro
  const servicoEdicao = route.params?.servico ?? null;
  const modoEdicao = servicoEdicao !== null;

  // ── Estado do formulário ──
  const [idCliente, setIdCliente] = useState("");
  const [idPrestador, setIdPrestador] = useState("");
  const [vCustoMaterial, setVCustoMaterial] = useState("");
  const [vCustoMaoDeObra, setVCustoMaoDeObra] = useState("");
  const [dtInicio, setDtInicio] = useState("");
  const [dtFim, setDtFim] = useState("");

  // ── Estado auxiliar ──
  const [clientes, setClientes] = useState([]);
  const [prestadores, setPrestadores] = useState([]);
  const [prestadoresDisponiveis, setPrestadoresDisponiveis] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState(false);

  // Carrega clientes e prestadores em paralelo ao abrir a tela
  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);
    setErroCarregamento(false);
    try {
      // Clientes é obrigatório — se falhar, mostra tela de erro
      const dadosClientes = await getClientes();
      setClientes(dadosClientes);
      if (dadosClientes.length > 0) {
        setIdCliente(
          modoEdicao && servicoEdicao.idCliente != null
            ? servicoEdicao.idCliente.toString()
            : dadosClientes[0].idCliente.toString(),
        );
      }
      // Pré-preenche dtInicio com a data/hora atual (ou valor existente na edição)
      setDtInicio(
        modoEdicao
          ? (servicoEdicao.dtInicio ?? formatarDataMysql(new Date()))
          : formatarDataMysql(new Date()),
      );
      setDtFim(modoEdicao ? (servicoEdicao.dtFim ?? "") : "");
      setVCustoMaterial(
        modoEdicao ? (servicoEdicao.vCustoMaterial?.toString() ?? "") : "",
      );
      setVCustoMaoDeObra(
        modoEdicao ? (servicoEdicao.vCustoMaoDeObra?.toString() ?? "") : "",
      );
    } catch {
      setErroCarregamento(true);
      setCarregando(false);
      return;
    }

    try {
      // Prestadores é opcional — se o endpoint não existir, usa TextInput
      const dadosPrestadores = await getPrestadores();
      if (Array.isArray(dadosPrestadores) && dadosPrestadores.length > 0) {
        setPrestadores(dadosPrestadores);
        setIdPrestador(
          modoEdicao
            ? (servicoEdicao.idPrestador?.toString() ??
                dadosPrestadores[0].idPrestador.toString())
            : dadosPrestadores[0].idPrestador.toString(),
        );
        setPrestadoresDisponiveis(true);
      } else {
        setPrestadoresDisponiveis(false);
      }
    } catch {
      // prestadores.php não existe ou retornou erro — usa campo manual
      setPrestadoresDisponiveis(false);
    } finally {
      setCarregando(false);
    }
  }

  async function handleSalvar() {
    if (!idCliente) {
      Alert.alert("Atenção", "Selecione um cliente.");
      return;
    }
    if (!idPrestador) {
      Alert.alert("Atenção", "Selecione um prestador.");
      return;
    }
    if (!dtInicio) {
      Alert.alert("Atenção", "Informe a data de início.");
      return;
    }
    if (!dtFim) {
      Alert.alert("Atenção", "Informe a data de término.");
      return;
    }

    setEnviando(true);

    try {
      const agora = formatarDataMysql(new Date());

      if (modoEdicao) {
        // ── Modo edição: envia PUT com o idServico ──
        const dadosAtualizados = {
          idServico: servicoEdicao.idServico,
          idCliente: parseInt(idCliente),
          idPrestador: idPrestador.toString(),
          vCustoMaterial: parseFloat(vCustoMaterial) || 0,
          vCustoMaoDeObra: parseFloat(vCustoMaoDeObra) || 0,
          dtRequisicao: servicoEdicao.dtRequisicao ?? agora,
          dtInicio: dtInicio,
          dtFim: dtFim,
        };
        const resultado = await atualizarServico(dadosAtualizados);
        const deuCerto =
          resultado.sucesso === true ||
          resultado.sucesso === 1 ||
          resultado.sucesso === "1" ||
          resultado.sucesso === "true";
        if (deuCerto) {
          Alert.alert(
            "Sucesso!",
            `Serviço #${servicoEdicao.idServico} atualizado!`,
            [{ text: "OK", onPress: () => navigation.goBack() }],
          );
        } else {
          Alert.alert("Erro", resultado.mensagem);
        }
      } else {
        // ── Modo cadastro: envia POST ──
        const novoServico = {
          idCliente: parseInt(idCliente),
          idPrestador: idPrestador.toString(),
          vCustoMaterial: parseFloat(vCustoMaterial) || 0,
          vCustoMaoDeObra: parseFloat(vCustoMaoDeObra) || 0,
          dtRequisicao: agora,
          dtInicio: dtInicio,
          dtFim: dtFim,
        };
        const resultado = await cadastrarServico(novoServico);
        const deuCerto =
          resultado.sucesso === true ||
          resultado.sucesso === 1 ||
          resultado.sucesso === "1" ||
          resultado.sucesso === "true";
        if (deuCerto) {
          Alert.alert(
            "Sucesso!",
            `Serviço cadastrado com ID: ${resultado.idServico}`,
            [
              {
                text: "Ver lista",
                onPress: () => navigation.navigate("ListaServicos"),
              },
              { text: "Cadastrar outro", style: "cancel" },
            ],
          );
          setVCustoMaterial("");
          setVCustoMaoDeObra("");
          setDtInicio(formatarDataMysql(new Date()));
          setDtFim("");
        } else {
          Alert.alert("Erro", resultado.mensagem);
        }
      }
    } catch {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <View style={estilos.centralize}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={{ marginTop: 12 }}>Carregando dados...</Text>
      </View>
    );
  }

  if (erroCarregamento) {
    return (
      <View style={estilos.centralize}>
        <Text style={estilos.textoErro}>
          Não foi possível conectar ao servidor.{"\n"}
          Verifique o BASE_URL em api/api.js
        </Text>
        <TouchableOpacity style={estilos.botao} onPress={carregarDados}>
          <Text style={estilos.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={estilos.container} keyboardShouldPersistTaps="handled">
      <Text style={estilos.secaoTitulo}>
        {modoEdicao
          ? `Editando Serviço #${servicoEdicao.idServico}`
          : "Dados do Serviço"}
      </Text>

      {/* ── Campo: Cliente (Picker/combobox) ── */}
      <Text style={estilos.rotulo}>Cliente *</Text>
      <View style={estilos.pickerContainer}>
        {/*
          Picker renderiza um combobox nativo.
          selectedValue → item selecionado | onValueChange → callback ao trocar
        */}
        <Picker
          selectedValue={idCliente}
          onValueChange={(valor) => setIdCliente(valor)}
        >
          {clientes.map((c) => (
            <Picker.Item
              key={c.idCliente}
              label={c.nmCliente}
              value={c.idCliente.toString()}
            />
          ))}
        </Picker>
      </View>

      {/* ── Campo: Prestador (Picker se disponível, TextInput se não) ── */}
      <Text style={estilos.rotulo}>Prestador *</Text>
      {prestadoresDisponiveis ? (
        <View style={estilos.pickerContainer}>
          <Picker
            selectedValue={idPrestador}
            onValueChange={(valor) => setIdPrestador(valor)}
          >
            {prestadores.map((p) => (
              <Picker.Item
                key={p.idPrestador}
                label={p.nmPrestador}
                value={p.idPrestador.toString()}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <TextInput
          style={estilos.input}
          placeholder="Ex.: P001"
          value={idPrestador}
          onChangeText={setIdPrestador}
        />
      )}

      {/* ── Campo: Data de Início ── */}
      <Text style={estilos.rotulo}>Data de Início *</Text>
      <TextInput
        style={estilos.input}
        placeholder="AAAA-MM-DD HH:MM:SS"
        value={dtInicio}
        onChangeText={setDtInicio}
      />

      {/* ── Campo: Data de Término ── */}
      <Text style={estilos.rotulo}>Data de Término *</Text>
      <TextInput
        style={estilos.input}
        placeholder="AAAA-MM-DD HH:MM:SS"
        value={dtFim}
        onChangeText={setDtFim}
      />

      {/* ── Campo: Custo Material ── */}
      <Text style={estilos.rotulo}>Custo de Material (R$)</Text>
      <TextInput
        style={estilos.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={vCustoMaterial}
        onChangeText={setVCustoMaterial}
      />

      {/* ── Campo: Mão de Obra ── */}
      <Text style={estilos.rotulo}>Custo Mão de Obra (R$)</Text>
      <TextInput
        style={estilos.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={vCustoMaoDeObra}
        onChangeText={setVCustoMaoDeObra}
      />

      {/* ── Botão de envio ── */}
      <TouchableOpacity
        style={[estilos.botao, enviando && estilos.botaoDesabilitado]}
        onPress={handleSalvar}
        disabled={enviando}
      >
        {enviando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={estilos.textoBotao}>Salvar Serviço</Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  centralize: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 20,
    marginTop: 8,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  botao: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  botaoDesabilitado: {
    backgroundColor: "#888",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textoErro: {
    color: "#c62828",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
  },
});
