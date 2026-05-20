// ================================================
// COMPONENTE: CABEÇALHO PADRÃO
// ================================================
// Exibe o título da tela com botão de voltar
// e botão de adicionar (opcional).
// ================================================

import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Header({ titulo, mostrarVoltar = false, onAdicionar }) {
    const navigation = useNavigation();

    return (
        <Appbar.Header style={{ backgroundColor: '#6200ee' }}>
            {/* Botão voltar */}
            {mostrarVoltar && (
                <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
            )}

            {/* Título da tela */}
            <Appbar.Content title={titulo} titleStyle={{ color: '#fff' }} />

            {/* Botão de adicionar (aparece quando a função é passada) */}
            {onAdicionar && (
                <Appbar.Action icon="plus" color="#fff" onPress={onAdicionar} />
            )}
        </Appbar.Header>
    );
}
