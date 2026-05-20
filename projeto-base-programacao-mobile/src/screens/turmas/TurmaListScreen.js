// ================================================
// TELA: LISTA DE TURMAS
// ================================================

import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB, Card, Text, IconButton, Avatar, Chip, Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ConfirmDialog from '../../components/ConfirmDialog';
import ErroConexao from '../../components/ErroConexao';
import { listarTurmas, excluirTurma } from '../../services/turmaService';

export default function TurmaListScreen({ navigation }) {
    const [turmas, setTurmas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [dialogVisivel, setDialogVisivel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);
    const [busca, setBusca] = useState('');

    const listaFiltrada = turmas.filter((t) => {
        const termo = busca.toLowerCase();
        return (
            t.nome?.toLowerCase().includes(termo) ||
            t.codigo?.toLowerCase().includes(termo) ||
            t.professorNome?.toLowerCase().includes(termo) ||
            t.cursoNome?.toLowerCase().includes(termo)
        );
    });

    useFocusEffect(useCallback(() => { carregar(); }, []));

    async function carregar() {
        setCarregando(true);
        setErro(null);
        try { setTurmas(await listarTurmas()); }
        catch (error) { console.error(error); setErro(error.message); }
        finally { setCarregando(false); }
    }

    async function excluir() {
        await excluirTurma(selecionado.id);
        setDialogVisivel(false);
        carregar();
    }

    if (carregando) return <Loading />;
    if (erro) return <ErroConexao mensagem={erro} onTentarNovamente={carregar} />;

    return (
        <View style={styles.container}>
            <Header titulo="Turmas"
                onAdicionar={() => navigation.navigate('TurmaForm', { turma: null })} />
            <Searchbar
                placeholder="Buscar por nome, professor ou curso..."
                value={busca}
                onChangeText={setBusca}
                style={styles.searchbar}
            />

            <FlatList
                data={listaFiltrada}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma turma cadastrada.</Text>}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.nome}
                            subtitle={`Prof: ${item.professorNome || '—'} | Curso: ${item.cursoNome || '—'}`}
                            left={() => <Avatar.Icon size={45} icon="google-classroom" />}
                            right={() => (
                                <View style={styles.acoes}>
                                    <IconButton icon="pencil" iconColor="#6200ee"
                                        onPress={() => navigation.navigate('TurmaForm', { turma: item })} />
                                    <IconButton icon="delete" iconColor="red"
                                        onPress={() => { setSelecionado(item); setDialogVisivel(true); }} />
                                </View>
                            )}
                        />
                        <Card.Content>
                            <View style={styles.chips}>
                                <Chip icon="calendar-start" style={styles.chip}>
                                    Início: {item.dataInicio}
                                </Chip>
                                <Chip icon="calendar-end" style={styles.chip}>
                                    Fim: {item.dataFim}
                                </Chip>
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
            <FAB icon="plus" style={styles.fab}
                onPress={() => navigation.navigate('TurmaForm', { turma: null })} />
            <ConfirmDialog visivel={dialogVisivel}
                mensagem={`Deseja excluir a turma "${selecionado?.nome}"?`}
                onConfirmar={excluir} onCancelar={() => setDialogVisivel(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    searchbar: { margin: 12, elevation: 2 },
    lista: { padding: 12 },
    card: { marginBottom: 10, elevation: 2 },
    acoes: { flexDirection: 'row' },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingBottom: 8 },
    chip: { backgroundColor: '#ede7f6' },
    fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#6200ee' },
    vazio: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 16 },
});
