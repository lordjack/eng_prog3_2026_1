// ================================================
// TELA: FORMULÁRIO DE MATRÍCULA (Criar / Editar)
// ================================================

import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Menu, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { criarMatricula, atualizarMatricula } from '../../services/matriculaService';
import { listarCursos } from '../../services/cursoService';
import { listarTurmas } from '../../services/turmaService';
import { listarAlunos } from '../../services/alunoService';

export default function MatriculaFormScreen({ navigation, route }) {
    const editando = route.params?.matricula;

    // Listas para os pickers
    const [cursos, setCursos] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [alunos, setAlunos] = useState([]);

    // Valores selecionados
    const [cursoId, setCursoId] = useState('');
    const [cursoNome, setCursoNome] = useState('');
    const [turmaId, setTurmaId] = useState('');
    const [turmaNome, setTurmaNome] = useState('');
    const [alunoId, setAlunoId] = useState('');
    const [alunoNome, setAlunoNome] = useState('');
    const [dataMatricula, setDataMatricula] = useState('');

    // Controle de visibilidade dos menus
    const [menuCurso, setMenuCurso] = useState(false);
    const [menuTurma, setMenuTurma] = useState(false);
    const [menuAluno, setMenuAluno] = useState(false);

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useFocusEffect(
        useCallback(() => {
            async function carregarDados() {
                setCarregando(true);
                try {
                    const [listaCursos, listaTurmas, listaAlunos] = await Promise.all([
                        listarCursos(),
                        listarTurmas(),
                        listarAlunos(),
                    ]);
                    setCursos(listaCursos);
                    setTurmas(listaTurmas);
                    setAlunos(listaAlunos);

                    if (editando) {
                        setCursoId(editando.cursoId || '');
                        const c = listaCursos.find(x => x.id === editando.cursoId);
                        setCursoNome(c ? c.nome : editando.cursoId || '');

                        setTurmaId(editando.turmaId || '');
                        const t = listaTurmas.find(x => x.id === editando.turmaId);
                        setTurmaNome(t ? t.nome : editando.turmaId || '');

                        setAlunoId(editando.alunoId || '');
                        const a = listaAlunos.find(x => x.id === editando.alunoId);
                        setAlunoNome(a ? a.nome : editando.alunoId || '');

                        setDataMatricula(editando.dataMatricula || '');
                    } else {
                        const hoje = new Date();
                        setDataMatricula(
                            `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`
                        );
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

    function selecionarCurso(curso) {
        setCursoId(curso.id);
        setCursoNome(curso.nome);
        setMenuCurso(false);
    }

    function selecionarTurma(turma) {
        setTurmaId(turma.id);
        setTurmaNome(turma.nome);
        setMenuTurma(false);
    }

    function selecionarAluno(aluno) {
        setAlunoId(aluno.id);
        setAlunoNome(aluno.nome);
        setMenuAluno(false);
    }

    async function salvar() {
        if (!cursoId || !turmaId || !alunoId) {
            Alert.alert('Atenção', 'Curso, Turma e Aluno são obrigatórios.');
            return;
        }
        setSalvando(true);
        try {
            const dados = { cursoId, cursoNome, turmaId, turmaNome, alunoId, alunoNome, dataMatricula };
            if (editando) {
                await atualizarMatricula(editando.id, dados);
            } else {
                await criarMatricula(dados);
            }
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
            <Header titulo={editando ? 'Editar Matrícula' : 'Nova Matrícula'} mostrarVoltar />
            <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">

                {/* ---- CURSO ---- */}
                <Text style={styles.label}>Curso *</Text>
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
                            <Menu.Item
                                key={c.id}
                                title={c.nome}
                                onPress={() => selecionarCurso(c)}
                            />
                        ))
                    )}
                </Menu>

                {/* ---- TURMA ---- */}
                <Text style={styles.label}>Turma *</Text>
                <Menu
                    visible={menuTurma}
                    onDismiss={() => setMenuTurma(false)}
                    anchor={
                        <TouchableOpacity onPress={() => setMenuTurma(true)}>
                            <TextInput
                                value={turmaNome}
                                placeholder="Selecione uma turma..."
                                mode="outlined"
                                style={styles.input}
                                editable={false}
                                right={<TextInput.Icon icon="chevron-down" />}
                            />
                        </TouchableOpacity>
                    }
                >
                    {turmas.length === 0 ? (
                        <Menu.Item title="Nenhuma turma cadastrada" disabled />
                    ) : (
                        turmas.map((t) => (
                            <Menu.Item
                                key={t.id}
                                title={t.nome}
                                onPress={() => selecionarTurma(t)}
                            />
                        ))
                    )}
                </Menu>

                {/* ---- ALUNO ---- */}
                <Text style={styles.label}>Aluno *</Text>
                <Menu
                    visible={menuAluno}
                    onDismiss={() => setMenuAluno(false)}
                    anchor={
                        <TouchableOpacity onPress={() => setMenuAluno(true)}>
                            <TextInput
                                value={alunoNome}
                                placeholder="Selecione um aluno..."
                                mode="outlined"
                                style={styles.input}
                                editable={false}
                                right={<TextInput.Icon icon="chevron-down" />}
                            />
                        </TouchableOpacity>
                    }
                >
                    {alunos.length === 0 ? (
                        <Menu.Item title="Nenhum aluno cadastrado" disabled />
                    ) : (
                        alunos.map((a) => (
                            <Menu.Item
                                key={a.id}
                                title={a.nome}
                                onPress={() => selecionarAluno(a)}
                            />
                        ))
                    )}
                </Menu>

                <Divider style={styles.divider} />

                {/* ---- DATA ---- */}
                <TextInput
                    label="Data da Matrícula (DD/MM/AAAA)"
                    value={dataMatricula}
                    onChangeText={setDataMatricula}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="numeric"
                />

                <Button
                    mode="contained"
                    onPress={salvar}
                    style={styles.btn}
                    buttonColor="#6200ee"
                    icon="check"
                >
                    {editando ? 'Salvar alterações' : 'Realizar matrícula'}
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
