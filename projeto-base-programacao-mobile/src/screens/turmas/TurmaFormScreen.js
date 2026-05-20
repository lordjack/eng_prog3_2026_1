// ================================================
// TELA: FORMULÁRIO DE TURMA (Criar / Editar)
// ================================================

import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Menu, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { criarTurma, atualizarTurma } from '../../services/turmaService';
import { listarProfessores } from '../../services/professorService';
import { listarCursos } from '../../services/cursoService';

export default function TurmaFormScreen({ navigation, route }) {
    const editando = route.params?.turma;

    const [nome, setNome] = useState('');
    const [codigo, setCodigo] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const [professores, setProfessores] = useState([]);
    const [cursos, setCursos] = useState([]);

    const [professorId, setProfessorId] = useState('');
    const [professorNome, setProfessorNome] = useState('');
    const [cursoId, setCursoId] = useState('');
    const [cursoNome, setCursoNome] = useState('');

    const [menuProfessor, setMenuProfessor] = useState(false);
    const [menuCurso, setMenuCurso] = useState(false);

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useFocusEffect(
        useCallback(() => {
            async function carregarDados() {
                setCarregando(true);
                try {
                    const [listaProfs, listaCursos] = await Promise.all([
                        listarProfessores(),
                        listarCursos(),
                    ]);
                    setProfessores(listaProfs);
                    setCursos(listaCursos);

                    if (editando) {
                        setNome(editando.nome || '');
                        setCodigo(editando.codigo || '');
                        setDataInicio(editando.dataInicio || '');
                        setDataFim(editando.dataFim || '');

                        setProfessorId(editando.professorId || '');
                        const p = listaProfs.find(x => x.id === editando.professorId);
                        setProfessorNome(p ? p.nome : editando.professorId || '');

                        setCursoId(editando.cursoId || '');
                        const c = listaCursos.find(x => x.id === editando.cursoId);
                        setCursoNome(c ? c.nome : editando.cursoId || '');
                    }
                } catch (e) {
                    Alert.alert('Erro', 'Não foi possível carregar os dados.');
                } finally {
                    setCarregando(false);
                }
            }
            carregarDados();
        }, [editando])
    );

    function selecionarProfessor(prof) {
        setProfessorId(prof.id);
        setProfessorNome(prof.nome);
        setMenuProfessor(false);
    }

    function selecionarCurso(curso) {
        setCursoId(curso.id);
        setCursoNome(curso.nome);
        setMenuCurso(false);
    }

    async function salvar() {
        if (!nome.trim()) {
            Alert.alert('Atenção', 'O nome é obrigatório.');
            return;
        }
        setSalvando(true);
        try {
            const dados = { nome, codigo, dataInicio, dataFim, professorId, professorNome, cursoId, cursoNome };
            if (editando) { await atualizarTurma(editando.id, dados); }
            else { await criarTurma(dados); }
            navigation.goBack();
        } catch {
            Alert.alert('Erro', 'Não foi possível salvar.');
        } finally {
            setSalvando(false);
        }
    }

    if (carregando || salvando) return <Loading />;

    return (
        <View style={styles.container}>
            <Header titulo={editando ? 'Editar Turma' : 'Nova Turma'} mostrarVoltar />
            <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">

                <TextInput label="Nome da turma *" value={nome} onChangeText={setNome}
                    mode="outlined" style={styles.input} />
                <TextInput label="Código" value={codigo} onChangeText={setCodigo}
                    mode="outlined" style={styles.input} />
                <TextInput label="Data de início (DD/MM/AAAA)" value={dataInicio}
                    onChangeText={setDataInicio} mode="outlined"
                    keyboardType="numeric" style={styles.input} />
                <TextInput label="Data de término (DD/MM/AAAA)" value={dataFim}
                    onChangeText={setDataFim} mode="outlined"
                    keyboardType="numeric" style={styles.input} />

                <Divider style={styles.divider} />

                {/* ---- PROFESSOR ---- */}
                <Text style={styles.label}>Professor</Text>
                <Menu
                    visible={menuProfessor}
                    onDismiss={() => setMenuProfessor(false)}
                    anchor={
                        <TouchableOpacity onPress={() => setMenuProfessor(true)}>
                            <TextInput
                                value={professorNome}
                                placeholder="Selecione um professor..."
                                mode="outlined"
                                style={styles.input}
                                editable={false}
                                right={<TextInput.Icon icon="chevron-down" />}
                            />
                        </TouchableOpacity>
                    }
                >
                    {professores.length === 0 ? (
                        <Menu.Item title="Nenhum professor cadastrado" disabled />
                    ) : (
                        professores.map((p) => (
                            <Menu.Item key={p.id} title={p.nome} onPress={() => selecionarProfessor(p)} />
                        ))
                    )}
                </Menu>

                {/* ---- CURSO ---- */}
                <Text style={styles.label}>Curso</Text>
                <Menu
                    visible={menuCurso}
                    onDismiss={() => setMenuCurso(false)}
                    anchor={
                        <TouchableOpacity onPress={() => setMenuCurso(true)}>
                            <TextInput
                                value={cursoNome}
                                placeholder="Selecione um curso..."
                                mode="outlined"
                                style={styles.input}
                                editable={false}
                                right={<TextInput.Icon icon="chevron-down" />}
                            />
                        </TouchableOpacity>
                    }
                >
                    {cursos.length === 0 ? (
                        <Menu.Item title="Nenhum curso cadastrado" disabled />
                    ) : (
                        cursos.map((c) => (
                            <Menu.Item key={c.id} title={c.nome} onPress={() => selecionarCurso(c)} />
                        ))
                    )}
                </Menu>

                <Button mode="contained" onPress={salvar} style={styles.btn} buttonColor="#6200ee" icon="check">
                    {editando ? 'Salvar alterações' : 'Cadastrar turma'}
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    form: { padding: 16 },
    label: { fontSize: 12, color: '#555', marginBottom: 2, marginLeft: 4 },
    input: { marginBottom: 12, backgroundColor: '#fff' },
    divider: { marginVertical: 8 },
    btn: { marginTop: 8 },
});

