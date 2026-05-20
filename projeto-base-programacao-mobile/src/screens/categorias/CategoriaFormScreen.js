// ================================================
// TELA: FORMULÁRIO DE CATEGORIA (Criar / Editar)
// ================================================

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { criarCategoria, atualizarCategoria } from '../../services/categoriaService';

export default function CategoriaFormScreen({ navigation, route }) {
    const editando = route.params?.categoria;
    const [nome, setNome] = useState('');
    const [nivel, setNivel] = useState('');
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (editando) { setNome(editando.nome || ''); setNivel(editando.nivel || ''); }
    }, [editando]);

    async function salvar() {
        if (!nome.trim()) { Alert.alert('Atenção', 'O nome é obrigatório.'); return; }
        setSalvando(true);
        try {
            const dados = { nome, nivel };
            if (editando) { await atualizarCategoria(editando.id, dados); }
            else { await criarCategoria(dados); }
            navigation.goBack();
        } catch { Alert.alert('Erro', 'Não foi possível salvar.'); }
        finally { setSalvando(false); }
    }

    if (salvando) return <Loading />;

    return (
        <View style={styles.container}>
            <Header titulo={editando ? 'Editar Categoria' : 'Nova Categoria'} mostrarVoltar />
            <ScrollView contentContainerStyle={styles.form}>
                <TextInput label="Nome da categoria *" value={nome} onChangeText={setNome}
                    mode="outlined" style={styles.input} />
                <TextInput label="Nível (ex: Básico, Intermediário, Avançado)" value={nivel}
                    onChangeText={setNivel} mode="outlined" style={styles.input} />
                <Button mode="contained" onPress={salvar} style={styles.btn} buttonColor="#6200ee">
                    {editando ? 'Salvar alterações' : 'Cadastrar categoria'}
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    form: { padding: 16 },
    input: { marginBottom: 12, backgroundColor: '#fff' },
    btn: { marginTop: 8 },
});
