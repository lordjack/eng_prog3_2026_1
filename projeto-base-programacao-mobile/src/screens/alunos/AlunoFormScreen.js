// ================================================
// TELA: FORMULÁRIO DE ALUNO (Criar / Editar)
// ================================================
// Demonstra: formulário, câmera, upload de foto
// no Firebase Storage e CRUD no Firestore.
// ================================================

import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    TextInput,
    Button,
    Text,
    HelperText,
    Divider,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {
    criarAluno,
    atualizarAluno,
    uploadFotoAluno,
} from '../../services/alunoService';

export default function AlunoFormScreen({ navigation, route }) {
    // Recebe o aluno (se for edição) ou null (se for criação)
    const alunoEditando = route.params?.aluno;

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [fotoUri, setFotoUri] = useState(null);
    const [salvando, setSalvando] = useState(false);

    // Se for edição, preenche os campos com os dados existentes
    useEffect(() => {
        if (alunoEditando) {
            setNome(alunoEditando.nome || '');
            setCpf(alunoEditando.cpf || '');
            setTelefone(alunoEditando.telefone || '');
            setFotoUri(alunoEditando.fotoUrl || null);
        }
    }, [alunoEditando]);

    // Abre a câmera para tirar foto
    async function tirarFoto() {
        // Solicita permissão de câmera
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à câmera.');
            return;
        }

        // Abre a câmera
        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: true,   // Permite recortar a imagem
            aspect: [1, 1],        // Formato quadrado (ideal para foto de perfil)
            quality: 0.7,          // Qualidade 70% para economizar espaço
        });

        if (!resultado.canceled) {
            setFotoUri(resultado.assets[0].uri);
        }
    }

    // Abre a galeria para escolher uma foto existente
    async function escolherDaGaleria() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à galeria.');
            return;
        }

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // API atualizada do expo-image-picker v17
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!resultado.canceled) {
            setFotoUri(resultado.assets[0].uri);
        }
    }

    // Valida e salva o aluno
    async function salvar() {
        if (!nome.trim()) {
            Alert.alert('Atenção', 'O nome do aluno é obrigatório.');
            return;
        }

        setSalvando(true);
        try {
            const dados = { nome, cpf, telefone };
            let idAluno;

            if (alunoEditando) {
                // ---- EDITAR: salva os dados no Firestore primeiro ----
                await atualizarAluno(alunoEditando.id, dados);
                idAluno = alunoEditando.id;
            } else {
                // ---- CRIAR: salva os dados no Firestore primeiro ----
                idAluno = await criarAluno(dados);
            }

            // ---- Upload da foto (opcional, separado do salvamento) ----
            // Mesmo que o upload falhe, o registro já foi salvo acima.
            const fotoNova = fotoUri && fotoUri !== alunoEditando?.fotoUrl;
            if (fotoNova) {
                try {
                    const url = await uploadFotoAluno(idAluno, fotoUri);
                    await atualizarAluno(idAluno, { fotoUrl: url });
                } catch (uploadError) {
                    console.warn('Upload da foto falhou:', uploadError);
                    Alert.alert(
                        'Aviso',
                        'Aluno salvo, mas a foto não pôde ser enviada. Tente editar e salvar a foto novamente.'
                    );
                }
            }

            // Volta para a lista após salvar com sucesso
            navigation.goBack();
        } catch (error) {
            // Exibe a mensagem real do erro para facilitar o diagnóstico
            console.error('Erro ao salvar aluno:', error);
            Alert.alert(
                'Erro ao salvar',
                `Não foi possível salvar o aluno.\n\n${error?.message ?? 'Erro desconhecido.'}`
            );
        } finally {
            // Garante que o loading sempre para, mesmo em caso de erro
            setSalvando(false);
        }
    }

    if (salvando) return <Loading />;

    return (
        <View style={styles.container}>
            <Header
                titulo={alunoEditando ? 'Editar Aluno' : 'Novo Aluno'}
                mostrarVoltar
            />

            <ScrollView contentContainerStyle={styles.form}>
                {/* ---- SEÇÃO DE FOTO ---- */}
                <TouchableOpacity onPress={tirarFoto} style={styles.fotoContainer}>
                    {fotoUri ? (
                        <Image source={{ uri: fotoUri }} style={styles.foto} />
                    ) : (
                        <View style={styles.fotoPlaceholder}>
                            <Text style={styles.fotoTexto}>Toque para tirar foto</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Button
                    mode="outlined"
                    icon="image"
                    onPress={escolherDaGaleria}
                    style={styles.btnGaleria}
                >
                    Escolher da Galeria
                </Button>

                <Divider style={styles.divider} />

                {/* ---- CAMPOS DO FORMULÁRIO ---- */}
                <TextInput
                    label="Nome completo *"
                    value={nome}
                    onChangeText={setNome}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <HelperText type="info">Formato: 000.000.000-00</HelperText>

                <TextInput
                    label="Telefone"
                    value={telefone}
                    onChangeText={setTelefone}
                    mode="outlined"
                    keyboardType="phone-pad"
                    style={styles.input}
                />

                {/* ---- BOTÃO SALVAR ---- */}
                <Button
                    mode="contained"
                    onPress={salvar}
                    style={styles.btnSalvar}
                    buttonColor="#6200ee"
                >
                    {alunoEditando ? 'Salvar alterações' : 'Cadastrar aluno'}
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    form: { padding: 16 },
    fotoContainer: { alignItems: 'center', marginBottom: 12 },
    foto: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 3,
        borderColor: '#6200ee',
    },
    fotoPlaceholder: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fotoTexto: { color: '#666', textAlign: 'center', fontSize: 13 },
    btnGaleria: { marginBottom: 8 },
    divider: { marginVertical: 12 },
    input: { marginBottom: 8, backgroundColor: '#fff' },
    btnSalvar: { marginTop: 16 },
});
