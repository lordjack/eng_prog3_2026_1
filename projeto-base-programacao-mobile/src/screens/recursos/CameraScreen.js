// ================================================
// TELA: CÂMERA
// ================================================
// Demonstra como usar a câmera do dispositivo
// com expo-camera para tirar fotos.
// ================================================

import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Header from '../../components/Header';

export default function CameraScreen() {
    const [permissao, solicitarPermissao] = useCameraPermissions();
    const [foto, setFoto] = useState(null);           // URI da foto capturada
    const [modoFrontal, setModoFrontal] = useState(false); // Câmera frontal/traseira
    const cameraRef = useRef(null);

    // ---- Tirar foto ----
    async function tirarFoto() {
        if (cameraRef.current) {
            const resultado = await cameraRef.current.takePictureAsync({ quality: 0.8 });
            setFoto(resultado.uri);
        }
    }

    // ---- Descarta a foto e volta para a câmera ----
    function descartarFoto() {
        setFoto(null);
    }

    // ---- Sem permissão ainda ----
    if (!permissao) {
        return <View />;
    }

    // ---- Permissão negada ----
    if (!permissao.granted) {
        return (
            <View style={styles.container}>
                <Header titulo="Câmera" mostrarVoltar />
                <View style={styles.centralized}>
                    <Text style={styles.texto}>Permissão de câmera necessária.</Text>
                    <Button mode="contained" onPress={solicitarPermissao} buttonColor="#6200ee">
                        Conceder permissão
                    </Button>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header titulo="Câmera" mostrarVoltar />

            {foto ? (
                // ---- Mostra a foto tirada ----
                <View style={styles.previewContainer}>
                    <Image source={{ uri: foto }} style={styles.preview} />
                    <Text style={styles.dica}>Foto capturada com sucesso!</Text>
                    <Button mode="contained" onPress={descartarFoto} buttonColor="#6200ee"
                        style={styles.btn}>
                        Tirar outra foto
                    </Button>
                    <Button mode="outlined" style={styles.btn}
                        onPress={() => Alert.alert('Upload', 'Aqui você faria o upload da foto para o Firebase Storage.')}>
                        Simular upload no Firebase
                    </Button>
                </View>
            ) : (
                // ---- Mostra a câmera ----
                <View style={styles.cameraContainer}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing={modoFrontal ? 'front' : 'back'}
                    />
                    <View style={styles.controles}>
                        <Button mode="outlined" onPress={() => setModoFrontal(!modoFrontal)}
                            style={styles.btnControle}>
                            {modoFrontal ? 'Câmera Traseira' : 'Câmera Frontal'}
                        </Button>
                        <Button mode="contained" icon="camera" onPress={tirarFoto}
                            buttonColor="#6200ee" style={styles.btnCapturar}>
                            Capturar
                        </Button>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    centralized: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    texto: { marginBottom: 20, fontSize: 16 },
    cameraContainer: { flex: 1 },
    camera: { flex: 1 },
    controles: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#111',
    },
    btnControle: { flex: 1, marginRight: 8 },
    btnCapturar: { flex: 1 },
    previewContainer: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        padding: 16,
    },
    preview: { width: '100%', flex: 1, borderRadius: 12, marginBottom: 16 },
    dica: { color: '#fff', marginBottom: 16 },
    btn: { width: '100%', marginBottom: 8 },
});
