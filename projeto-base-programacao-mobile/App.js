// ================================================
// PONTO DE ENTRADA DO APLICATIVO
// ================================================
// Envolve o app com o Provider do React Native Paper
// (necessário para Dialogs, Snackbars, FABs etc.)
// e carrega o navegador principal.
// ================================================
import './src/shim';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    // PaperProvider: habilita os componentes do react-native-paper
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
