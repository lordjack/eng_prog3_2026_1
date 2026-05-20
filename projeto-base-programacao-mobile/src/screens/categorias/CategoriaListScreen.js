// ================================================
// TELA: LISTA DE CATEGORIAS DE ALUNO
// ================================================

import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB, Card, Text, IconButton, Avatar, Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ConfirmDialog from '../../components/ConfirmDialog';
import ErroConexao from '../../components/ErroConexao';
import { listarCategorias, excluirCategoria } from '../../services/categoriaService';

export default function CategoriaListScreen({ navigation }) {
    const [categorias, setCategorias] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [dialogVisivel, setDialogVisivel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);
    const [busca, setBusca] = useState('');

    const listaFiltrada = categorias.filter((c) => {
        const termo = busca.toLowerCase();
        return (
            c.nome?.toLowerCase().includes(termo) ||
            c.nivel?.toLowerCase().includes(termo)
        );
    });

    useFocusEffect(useCallback(() => { carregar(); }, []));

    async function carregar() {
        setCarregando(true);
        setErro(null);
        try { setCategorias(await listarCategorias()); }
        catch (error) { console.error(error); setErro(error.message); }
        finally { setCarregando(false); }
    }

    async function excluir() {
        await excluirCategoria(selecionado.id);
        setDialogVisivel(false);
        carregar();
    }

    if (carregando) return <Loading />;
    if (erro) return <ErroConexao mensagem={erro} onTentarNovamente={carregar} />;

    return (
        <View style={styles.container}>
            <Header titulo="Categorias de Aluno"
                onAdicionar={() => navigation.navigate('CategoriaForm', { categoria: null })} />
            <Searchbar
                placeholder="Buscar por nome ou nível..."
                value={busca}
                onChangeText={setBusca}
                style={styles.searchbar}
            />

            <FlatList
                data={listaFiltrada}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhuma categoria cadastrada.</Text>}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.nome}
                            subtitle={`Nível: ${item.nivel}`}
                            left={() => <Avatar.Icon size={45} icon="tag" />}
                            right={() => (
                                <View style={styles.acoes}>
                                    <IconButton icon="pencil" iconColor="#6200ee"
                                        onPress={() => navigation.navigate('CategoriaForm', { categoria: item })} />
                                    <IconButton icon="delete" iconColor="red"
                                        onPress={() => { setSelecionado(item); setDialogVisivel(true); }} />
                                </View>
                            )}
                        />
                    </Card>
                )}
            />
            <FAB icon="plus" style={styles.fab}
                onPress={() => navigation.navigate('CategoriaForm', { categoria: null })} />
            <ConfirmDialog visivel={dialogVisivel}
                mensagem={`Deseja excluir "${selecionado?.nome}"?`}
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
    fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#6200ee' },
    vazio: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 16 },
});
