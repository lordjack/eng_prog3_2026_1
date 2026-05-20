// ================================================
// SHIM DE COMPATIBILIDADE - AsyncStorage
// ================================================
// O Firebase v8 tenta acessar AsyncStorage de 'react-native'
// (removido nas versões modernas). Este shim substitui o
// getter que lança erro pelo AsyncStorage correto.
// IMPORTANTE: deve ser o primeiro import do index.js
// ================================================

// Usa require (CommonJS) para garantir execução síncrona
const AsyncStorage = require('@react-native-async-storage/async-storage').default
    || require('@react-native-async-storage/async-storage');

// RN declarada FORA do try para ser acessível no catch
const RN = require('react-native');

try {
    // Tenta ler AsyncStorage — em RN moderno isso lança invariant error
    const existing = RN.AsyncStorage;
    if (!existing) {
        // Propriedade existe mas é falsy: sobrescreve
        Object.defineProperty(RN, 'AsyncStorage', {
            value: AsyncStorage,
            writable: true,
            configurable: true,
            enumerable: true,
        });
    }
    // Se chegou aqui sem lançar e existing é truthy, já está ok
} catch (_e) {
    // A leitura jogou invariant — precisamos substituir o getter
    try {
        Object.defineProperty(RN, 'AsyncStorage', {
            value: AsyncStorage,
            writable: true,
            configurable: true,
            enumerable: true,
        });
    } catch (_e2) {
        // Último recurso: atribuição direta
        RN.AsyncStorage = AsyncStorage;
    }
}
