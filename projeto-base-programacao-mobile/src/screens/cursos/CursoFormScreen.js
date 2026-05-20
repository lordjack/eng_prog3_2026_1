// ================================================
// TELA: FORMULÁRIO DE CURSO (Criar / Editar)
// ================================================

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { criarCurso, atualizarCurso } from '../../services/cursoService';

export default function CursoFormScreen({ navigation, route }) {
    const editando = route.params?.curso;

    const [nome, setNome] = useState('');
    const [requisito, setRequisito] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('');
    const [valor, setValor] = useState('');
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (editando) {
            setNome(editando.nome || '');
            setRequisito(editando.requisito || '');
            setCargaHoraria(String(editando.cargaHoraria || ''));
            setValor(String(editando.valor || ''));
        }
    }, [editando]);

    async function salvar() {
        if (!nome.trim()) { Alert.alert('Atenção', 'O nome é obrigatório.'); return; }
        setSalvando(true);
        try {
            const dados = {
                nome,
                requisito,
                cargaHoraria: parseFloat(cargaHoraria) || 0,
                valor: parseFloat(valor) || 0,
            };
            if (editando) { await atualizarCurso(editando.id, dados); }
            else { await criarCurso(dados); }
            navigation.goBack();
        } catch { Alert.alert('Erro', 'Não foi possível salvar.'); }
        finally { setSalvando(false); }
    }

    if (salvando) return <Loading />;

    return (
        <View style={styles.container}>
            <Header titulo={editando ? 'Editar Curso' : 'Novo Curso'} mostrarVoltar />
            <ScrollView contentContainerStyle={styles.form}>
                <TextInput label="Nome do curso *" value={nome} onChangeText={setNome}
                    mode="outlined" style={styles.input} />
                <TextInput label="Requisito (pré-requisito)" value={requisito}
                    onChangeText={setRequisito} mode="outlined" style={styles.input} />
                <TextInput label="Carga horária (horas)" value={cargaHoraria}
                    onChangeText={setCargaHoraria} mode="outlined" keyboardType="numeric"
                    style={styles.input} />
                <TextInput label="Valor (R$)" value={valor} onChangeText={setValor}
                    mode="outlined" keyboardType="numeric" style={styles.input} />
                <HelperText type="info">Use ponto para decimais. Ex: 1500.00</HelperText>
                <Button mode="contained" onPress={salvar} style={styles.btn} buttonColor="#6200ee">
                    {editando ? 'Salvar alterações' : 'Cadastrar curso'}
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
