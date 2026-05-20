// ================================================
// TELA: OUTROS RECURSOS NATIVOS
// ================================================
// Demonstra recursos do smartphone que podem ser
// explorados durante a disciplina:
//
//  • Clipboard (copiar/colar texto)
//  • Vibração do dispositivo
//  • Compartilhamento nativo
//  • Notificação in-app (Snackbar)
//  • Informações do dispositivo
// ================================================

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Share, Platform, Vibration } from 'react-native';
import { Button, Text, Card, Divider, TextInput, Snackbar } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import Header from '../../components/Header';

export default function RecursosScreen() {
    const [textoClipboard, setTextoClipboard] = useState('');
    const [textoCopiar, setTextoCopiar] = useState('Olá, turma! 👋');
    const [tituloNotif, setTituloNotif] = useState('App Acadêmico');
    const [corpoNotif, setCorpoNotif] = useState('Você tem uma nova mensagem!');
    const [snackVisivel, setSnackVisivel] = useState(false);
    const [snackMensagem, setSnackMensagem] = useState('');

    // ---- 1. Clipboard: copiar texto ----
    async function copiarTexto() {
        await Clipboard.setStringAsync(textoCopiar);
        setSnackMensagem('Texto copiado para a área de transferência!');
        setSnackVisivel(true);
    }

    // ---- 2. Clipboard: colar texto ----
    async function colarTexto() {
        const texto = await Clipboard.getStringAsync();
        setTextoClipboard(texto);
    }

    // ---- 3. Vibração ----
    async function vibrar() {
        if (Platform.OS === 'ios') {
            // iOS: haptic feedback (Apple não permite vibração customizada por app)
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 400);
            setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 800);
        } else {
            // Android: vibração simples de 1 segundo (forma mais confiável)
            // NOTA: emuladores Android não suportam vibração por limitação de hardware virtual.
            // Teste sempre em um dispositivo físico.
            Vibration.cancel(); // cancela qualquer vibração anterior
            Vibration.vibrate(1000);
        }
    }

    // ---- 5. Notificação in-app (Snackbar) ----
    function enviarNotificacao() {
        setSnackMensagem(`🔔 ${tituloNotif}: ${corpoNotif}`);
        setSnackVisivel(true);
    }

    // ---- 4. Compartilhamento nativo (Share API) ----
    async function compartilhar() {
        await Share.share({
            title: 'App Acadêmico',
            message: 'Confira nosso aplicativo acadêmico desenvolvido em React Native!',
        });
    }

    return (
        <View style={styles.container}>
            <Header titulo="Recursos Nativos" mostrarVoltar />
            <ScrollView contentContainerStyle={styles.content}>

                {/* ---- CLIPBOARD ---- */}
                <Card style={styles.card}>
                    <Card.Title title="📋 Clipboard (Área de Transferência)" />
                    <Card.Content>
                        <TextInput
                            label="Texto para copiar"
                            value={textoCopiar}
                            onChangeText={setTextoCopiar}
                            mode="outlined"
                            style={styles.input}
                        />
                        <Button mode="contained" icon="content-copy" onPress={copiarTexto}
                            buttonColor="#6200ee" style={styles.btn}>
                            Copiar texto
                        </Button>
                        <Divider style={styles.divider} />
                        <Button mode="outlined" icon="content-paste" onPress={colarTexto}
                            style={styles.btn}>
                            Colar da área de transferência
                        </Button>
                        {textoClipboard ? (
                            <Text style={styles.resultado}>Colado: "{textoClipboard}"</Text>
                        ) : null}
                    </Card.Content>
                </Card>

                {/* ---- VIBRAÇÃO ---- */}
                <Card style={styles.card}>
                    <Card.Title title="📳 Vibração" />
                    <Card.Content>
                        <Text style={styles.descricao}>
                            Útil para notificações táteis, confirmações e alertas.
                        </Text>
                        <Button mode="contained" icon="vibrate" onPress={vibrar}
                            buttonColor="#6200ee" style={styles.btn}>
                            Vibrar dispositivo
                        </Button>
                    </Card.Content>
                </Card>

                {/* ---- NOTIFICAÇÕES ---- */}
                <Card style={styles.card}>
                    <Card.Title title="🔔 Notificação In-App" />
                    <Card.Content>
                        <Text style={styles.descricao}>
                            Simula uma notificação dentro do próprio aplicativo usando Snackbar.
                        </Text>
                        <TextInput
                            label="Título da notificação"
                            value={tituloNotif}
                            onChangeText={setTituloNotif}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="Mensagem da notificação"
                            value={corpoNotif}
                            onChangeText={setCorpoNotif}
                            mode="outlined"
                            style={styles.input}
                        />
                        <Button
                            mode="contained"
                            icon="bell-ring"
                            onPress={enviarNotificacao}
                            buttonColor="#6200ee"
                            style={styles.btn}
                        >
                            Enviar notificação
                        </Button>
                    </Card.Content>
                </Card>

                {/* ---- COMPARTILHAMENTO ---- */}
                <Card style={styles.card}>
                    <Card.Title title="📤 Compartilhamento Nativo" />
                    <Card.Content>
                        <Text style={styles.descricao}>
                            Abre o menu nativo de compartilhamento do sistema operacional
                            ({Platform.OS === 'ios' ? 'iOS' : 'Android'}).
                        </Text>
                        <Button mode="contained" icon="share-variant" onPress={compartilhar}
                            buttonColor="#6200ee" style={styles.btn}>
                            Compartilhar
                        </Button>
                    </Card.Content>
                </Card>

                {/* ---- INFORMAÇÕES DO DISPOSITIVO ---- */}
                <Card style={[styles.card, styles.infoCard]}>
                    <Card.Title title="ℹ️ Informações do Dispositivo" />
                    <Card.Content>
                        <Text style={styles.info}>Sistema: {Platform.OS}</Text>
                        <Text style={styles.info}>Versão: {Platform.Version}</Text>
                    </Card.Content>
                </Card>

                {/* ---- SUGESTÕES DE AULA ---- */}
                <Card style={[styles.card, styles.dicaCard]}>
                    <Card.Title title="💡 Ideias para as próximas aulas" />
                    <Card.Content>
                        {[
                            'expo-local-authentication → Login com biometria (digital/face)',
                            'expo-barcode-scanner → Ler QR Code do cartão do aluno',
                            'expo-sensors (Accelerometer) → Detectar movimento do dispositivo',
                            'expo-av → Reproduzir áudios/vídeos de aulas',
                            'expo-file-system → Exportar relatórios em PDF',
                        ].map((item, i) => (
                            <Text key={i} style={styles.sugestao}>• {item}</Text>
                        ))}
                    </Card.Content>
                </Card>

            </ScrollView>

            <Snackbar
                visible={snackVisivel}
                onDismiss={() => setSnackVisivel(false)}
                duration={3500}
                action={{ label: 'OK', onPress: () => setSnackVisivel(false) }}
            >
                {snackMensagem}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { padding: 16 },
    card: { marginBottom: 16, elevation: 2 },
    dicaCard: { backgroundColor: '#fffde7' },
    infoCard: { backgroundColor: '#e8f5e9' },
    input: { marginBottom: 8, backgroundColor: '#fff' },
    btn: { marginBottom: 8 },
    divider: { marginVertical: 8 },
    descricao: { color: '#555', marginBottom: 12, lineHeight: 20 },
    resultado: { color: '#6200ee', marginTop: 8, fontStyle: 'italic' },
    info: { fontSize: 15, marginBottom: 4, color: '#333' },
    sugestao: { color: '#555', marginBottom: 6, lineHeight: 20 },
});
