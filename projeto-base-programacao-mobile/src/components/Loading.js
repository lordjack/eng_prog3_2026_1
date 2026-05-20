// ================================================
// COMPONENTE: INDICADOR DE CARREGAMENTO
// ================================================

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#6200ee" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
