// ================================================
// TELA: FORMULÁRIO DE PROFESSOR (Criar / Editar)
// ================================================

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { criarProfessor, atualizarProfessor } from '../../services/professorService';

export default function ProfessorFormScreen({ navigation, route }) {
    const editando = route.params?.professor;

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [titulacao, setTitulacao] = useState('');
    const [formacao, setFormacao] = useState('');
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (editando) {
            setNome(editando.nome || '');
            setEmail(editando.email || '');
            setTitulacao(editando.titulacao || '');
            setFormacao(editando.formacao || '');
        }
    }, [editando]);

    async function salvar() {
        if (!nome.trim()) {
            Alert.alert('Atenção', 'O nome é obrigatório.');
            return;
        }
        setSalvando(true);
        try {
            const dados = { nome, email, titulacao, formacao };
            if (editando) {
                await atualizarProfessor(editando.id, dados);
            } else {
                await criarProfessor(dados);
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar.');
        } finally {
            setSalvando(false);
        }
    }

    if (salvando) return <Loading />;

    return (
        <View style={styles.container}>
            <Header titulo={editando ? 'Editar Professor' : 'Novo Professor'} mostrarVoltar />
            <ScrollView contentContainerStyle={styles.form}>
                <TextInput label="Nome *" value={nome} onChangeText={setNome}
                    mode="outlined" style={styles.input} />
                <TextInput label="E-mail" value={email} onChangeText={setEmail}
                    mode="outlined" keyboardType="email-address" style={styles.input} />
                <TextInput label="Titulação (ex: Mestre, Doutor)" value={titulacao}
                    onChangeText={setTitulacao} mode="outlined" style={styles.input} />
                <TextInput label="Formação" value={formacao} onChangeText={setFormacao}
                    mode="outlined" style={styles.input} />
                <Button mode="contained" onPress={salvar} style={styles.btn} buttonColor="#6200ee">
                    {editando ? 'Salvar alterações' : 'Cadastrar professor'}
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
