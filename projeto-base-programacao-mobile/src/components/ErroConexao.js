// ================================================
// COMPONENTE: MENSAGEM DE ERRO COM RETRY
// ================================================

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function ErroConexao({ mensagem, onTentarNovamente }) {
    return (
        <View style={styles.container}>
            <Text style={styles.icone}>⚠️</Text>
            <Text style={styles.titulo}>Não foi possível carregar</Text>
            <Text style={styles.mensagem}>{mensagem || 'Verifique sua conexão e as configurações do Firebase.'}</Text>
            <Button mode="contained" onPress={onTentarNovamente} buttonColor="#6200ee">
                Tentar novamente
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    icone: { fontSize: 48, marginBottom: 12 },
    titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    mensagem: { textAlign: 'center', color: '#666', marginBottom: 24, lineHeight: 20 },
});
