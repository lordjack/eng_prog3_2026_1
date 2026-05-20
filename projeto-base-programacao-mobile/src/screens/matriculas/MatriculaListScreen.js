// ================================================
// TELA: LISTA DE MATRÍCULAS
// ================================================

import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB, Card, Text, IconButton, Avatar, Searchbar, Chip } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ConfirmDialog from '../../components/ConfirmDialog';
import ErroConexao from '../../components/ErroConexao';
import { listarMatriculas, excluirMatricula } from '../../services/matriculaService';

export default function MatriculaListScreen({ navigation }) {
    const [matriculas, setMatriculas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [dialogVisivel, setDialogVisivel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);
    const [busca, setBusca] = useState('');

    const listaFiltrada = matriculas.filter((m) => {
        const termo = busca.toLowerCase();
        return (
            m.alunoNome?.toLowerCase().includes(termo) ||
            m.cursoNome?.toLowerCase().includes(termo) ||
            m.turmaNome?.toLowerCase().includes(termo) ||
            m.dataMatricula?.toLowerCase().includes(termo)
        );
    });

    useFocusEffect(useCallback(() => { carregar(); }, []));

    async function carregar() {
        setCarregando(true);
        setErro(null);
        try { setMatriculas(await listarMatriculas()); }
        catch (error) { console.error(error); setErro(error.message); }
        finally { setCarregando(false); }
    }

    async function excluir() {
        await excluirMatricula(selecionado.id);
        setDialogVisivel(false);
        carregar();
    }

    if (carregando) return <Loading />;
    if (erro) return <ErroConexao mensagem={erro} onTentarNovamente={carregar} />;

    return (
        <View style={styles.container}>
            <Header titulo="Matrículas"
                onAdicionar={() => navigation.navigate('MatriculaForm', { matricula: null })} />
            <Searchbar
                placeholder="Buscar por aluno, curso ou turma..."
                value={busca}
                onChangeText={setBusca}
                style={styles.searchbar}
            />

            <FlatList
                data={listaFiltrada}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma matrícula cadastrada.</Text>}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.alunoNome || `Aluno: ${item.alunoId?.slice(0, 8) ?? '—'}`}
                            subtitle={`Curso: ${item.cursoNome || '—'} | Turma: ${item.turmaNome || '—'}`}
                            left={() => <Avatar.Icon size={45} icon="clipboard-account" />}
                            right={() => (
                                <View style={styles.acoes}>
                                    <IconButton icon="pencil" iconColor="#6200ee"
                                        onPress={() => navigation.navigate('MatriculaForm', { matricula: item })} />
                                    <IconButton icon="delete" iconColor="red"
                                        onPress={() => { setSelecionado(item); setDialogVisivel(true); }} />
                                </View>
                            )}
                        />
                        {item.dataMatricula ? (
                            <Card.Content style={styles.cardContent}>
                                <Chip icon="calendar" style={styles.chip}>
                                    Data: {item.dataMatricula}
                                </Chip>
                            </Card.Content>
                        ) : null}
                    </Card>
                )}
            />
            <FAB icon="plus" style={styles.fab}
                onPress={() => navigation.navigate('MatriculaForm', { matricula: null })} />
            <ConfirmDialog visivel={dialogVisivel}
                mensagem="Deseja excluir esta matrícula?"
                onConfirmar={excluir} onCancelar={() => setDialogVisivel(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    searchbar: { margin: 12, elevation: 2 },
    cardContent: { paddingBottom: 8 },
    chip: { alignSelf: 'flex-start', backgroundColor: '#ede7f6' },
    lista: { padding: 12 },
    card: { marginBottom: 10, elevation: 2 },
    acoes: { flexDirection: 'row' },
    fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#6200ee' },
    vazio: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 16 },
});
