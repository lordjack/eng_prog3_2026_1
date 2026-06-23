import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { db } from '../config/firebase';

export default function AlunoFormScreen({ route }) {
  const { dado } = route.params || '';
  const navigation = useNavigation();

  const [id, setId] = useState(dado.id || '');
  const [nome, setNome] = useState(dado.nome || '');
  const [email, setEmail] = useState(dado.email || '');
  const [telefone, setTelefone] = useState(dado.telefone || '');

  const save = async () => {
    const dataForm = {
      nome: nome,
      email: email,
      telefone: telefone,
    };
    try {
      if (nome == '' || nome == undefined) {
        throw 'Informe um valor para o nome!';
      }

      if (email == '' || email == undefined) {
        throw 'Informe um valor para o email!';
      }

      if (id) {
        db.ref('aluno/' + id).update(dataForm);
        alert('Registro Atualizado com sucesso!');
      } else {
        await db.ref('aluno').push(dataForm);

        alert('Registro Salvo com sucesso!');
      }

      navigation.navigate('AlunoListScreen');
    } catch (error) {
      alert(error);
      console.error('Erro: ', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput label="Nome" value={nome} onChangeText={setNome} />
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Telefone" value={telefone} onChangeText={setTelefone} />
      <Button icon="save" mode="contained" onPress={save}>
        Salvar
      </Button>
    </View>
  );
}
