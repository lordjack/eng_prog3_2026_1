// ================================================
// TELA: MAIS (Menu de funcionalidades extras)
// ================================================
// Ponto de entrada para Categorias, Matrículas
// e recursos nativos do smartphone.
// ================================================

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import Header from '../components/Header';

export default function MaisScreen({ navigation }) {
    const itens = [
        {
            titulo: 'Categorias de Aluno',
            descricao: 'Gerenciar categorias e níveis',
            icone: 'tag-multiple',
            tela: 'CategoriaList',
        },
        {
            titulo: 'Matrículas',
            descricao: 'Gerenciar matrículas de alunos',
            icone: 'clipboard-account',
            tela: 'MatriculaList',
        },
        { tipo: 'divider' },
        {
            titulo: '📷  Câmera',
            descricao: 'Demonstração do uso de câmera',
            icone: 'camera',
            tela: 'Camera',
        },
        {
            titulo: '🗺️  Mapa e GPS',
            descricao: 'Localização e mapa em tempo real',
            icone: 'map-marker',
            tela: 'Mapa',
        },
        {
            titulo: '📱  Outros Recursos Nativos',
            descricao: 'Vibração, Brilho e Clipboard',
            icone: 'cellphone-cog',
            tela: 'Recursos',
        },
    ];

    return (
        <View style={styles.container}>
            <Header titulo="Mais" />
            <ScrollView>
                {itens.map((item, index) =>
                    item.tipo === 'divider' ? (
                        <Divider key={index} style={styles.divider} />
                    ) : (
                        <List.Item
                            key={index}
                            title={item.titulo}
                            description={item.descricao}
                            left={(props) => (
                                <List.Icon {...props} icon={item.icone} color="#6200ee" />
                            )}
                            right={(props) => <List.Icon {...props} icon="chevron-right" />}
                            onPress={() => navigation.navigate(item.tela)}
                            style={styles.item}
                        />
                    )
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    item: { backgroundColor: '#fff', marginBottom: 1 },
    divider: { height: 16, backgroundColor: '#f5f5f5' },
});
