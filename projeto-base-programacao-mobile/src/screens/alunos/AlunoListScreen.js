// ================================================
// TELA: LISTA DE ALUNOS
// ================================================
// Mostra todos os alunos cadastrados no Firestore.
// Permite editar e excluir cada aluno.
// ================================================

import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB, Card, Text, IconButton, Avatar, Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ConfirmDialog from '../../components/ConfirmDialog';
import ErroConexao from '../../components/ErroConexao';
import { listarAlunos, excluirAluno } from '../../services/alunoService';

export default function AlunoListScreen({ navigation }) {
    const [alunos, setAlunos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [dialogVisivel, setDialogVisivel] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [busca, setBusca] = useState('');

    const listaFiltrada = alunos.filter((a) => {
        const termo = busca.toLowerCase();
        return (
            a.nome?.toLowerCase().includes(termo) ||
            a.cpf?.toLowerCase().includes(termo)
        );
    });

    // Recarrega a lista sempre que a tela recebe foco
    useFocusEffect(
        useCallback(() => {
            carregarAlunos();
        }, [])
    );

    async function carregarAlunos() {
        setCarregando(true);
        setErro(null);
        try {
            const dados = await listarAlunos();
            setAlunos(dados);
        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
            setErro(error.message);
        } finally {
            setCarregando(false);
        }
    }

    function confirmarExclusao(aluno) {
        setAlunoSelecionado(aluno);
        setDialogVisivel(true);
    }

    async function excluir() {
        await excluirAluno(alunoSelecionado.id);
        setDialogVisivel(false);
        carregarAlunos();
    }

    if (carregando) return <Loading />;
    if (erro) return <ErroConexao mensagem={erro} onTentarNovamente={carregarAlunos} />;

    return (
        <View style={styles.container}>
            <Header
                titulo="Alunos"
                onAdicionar={() => navigation.navigate('AlunoForm', { aluno: null })}
            />

            <Searchbar
                placeholder="Buscar por nome ou CPF..."
                value={busca}
                onChangeText={setBusca}
                style={styles.searchbar}
            />

            <FlatList
                data={listaFiltrada}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Nenhum aluno cadastrado.</Text>
                }
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.nome}
                            subtitle={`CPF: ${item.cpf}`}
                            left={() =>
                                item.fotoUrl ? (
                                    <Avatar.Image size={45} source={{ uri: item.fotoUrl }} />
                                ) : (
                                    <Avatar.Icon size={45} icon="account" />
                                )
                            }
                            right={() => (
                                <View style={styles.acoes}>
                                    <IconButton
                                        icon="pencil"
                                        iconColor="#6200ee"
                                        onPress={() =>
                                            navigation.navigate('AlunoForm', { aluno: item })
                                        }
                                    />
                                    <IconButton
                                        icon="delete"
                                        iconColor="red"
                                        onPress={() => confirmarExclusao(item)}
                                    />
                                </View>
                            )}
                        />
                    </Card>
                )}
            />

            {/* Botão flutuante para adicionar aluno */}
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AlunoForm', { aluno: null })}
            />

            {/* Diálogo de confirmação de exclusão */}
            <ConfirmDialog
                visivel={dialogVisivel}
                mensagem={`Deseja excluir o aluno "${alunoSelecionado?.nome}"?`}
                onConfirmar={excluir}
                onCancelar={() => setDialogVisivel(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    searchbar: { margin: 12, elevation: 2 },
    lista: { padding: 12 },
    card: { marginBottom: 10, elevation: 2 },
    acoes: { flexDirection: 'row' },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#6200ee',
    },
    vazio: {
        textAlign: 'center',
        marginTop: 40,
        color: '#999',
        fontSize: 16,
    },
});
