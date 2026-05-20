// ================================================
// TELA: LISTA DE CURSOS
// ================================================

import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB, Card, Text, IconButton, Avatar, Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ConfirmDialog from '../../components/ConfirmDialog';
import ErroConexao from '../../components/ErroConexao';
import { listarCursos, excluirCurso } from '../../services/cursoService';

export default function CursoListScreen({ navigation }) {
    const [cursos, setCursos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [dialogVisivel, setDialogVisivel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);
    const [busca, setBusca] = useState('');

    const listaFiltrada = cursos.filter((c) =>
        c.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    useFocusEffect(useCallback(() => { carregar(); }, []));

    async function carregar() {
        setCarregando(true);
        setErro(null);
        try { setCursos(await listarCursos()); }
        catch (error) { console.error(error); setErro(error.message); }
        finally { setCarregando(false); }
    }

    async function excluir() {
        await excluirCurso(selecionado.id);
        setDialogVisivel(false);
        carregar();
    }

    if (carregando) return <Loading />;
    if (erro) return <ErroConexao mensagem={erro} onTentarNovamente={carregar} />;

    return (
        <View style={styles.container}>
            <Header titulo="Cursos"
                onAdicionar={() => navigation.navigate('CursoForm', { curso: null })} />
            <Searchbar
                placeholder="Buscar por nome..."
                value={busca}
                onChangeText={setBusca}
                style={styles.searchbar}
            />

            <FlatList
                data={listaFiltrada}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhum curso cadastrado.</Text>}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.nome}
                            subtitle={`Carga horária: ${item.cargaHoraria}h | Valor: R$ ${item.valor}`}
                            left={() => <Avatar.Icon size={45} icon="book-open-variant" />}
                            right={() => (
                                <View style={styles.acoes}>
                                    <IconButton icon="pencil" iconColor="#6200ee"
                                        onPress={() => navigation.navigate('CursoForm', { curso: item })} />
                                    <IconButton icon="delete" iconColor="red"
                                        onPress={() => { setSelecionado(item); setDialogVisivel(true); }} />
                                </View>
                            )}
                        />
                    </Card>
                )}
            />
            <FAB icon="plus" style={styles.fab}
                onPress={() => navigation.navigate('CursoForm', { curso: null })} />
            <ConfirmDialog visivel={dialogVisivel}
                mensagem={`Deseja excluir o curso "${selecionado?.nome}"?`}
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
