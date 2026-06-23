import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import API_URL from '../../config/api';

export default function ClienteAPIFormScreen({ route }) {
  const { dado } = route.params || '';
  const navigation = useNavigation();

  const [id, setId] = useState(dado.id || '');
  const [nome, setNome] = useState(dado.nome || '');
  const [cpf, setCPF] = useState(dado.cpf || '');
  const [telefone, setTelefone] = useState(dado.telefone || '');

  const save = async () => {
    const dataForm = {
      nome: nome,
      cpf: cpf,
      telefone: telefone,
    };
    try {
      if (nome == '' || nome == undefined) {
        throw 'Informe um valor para o nome!';
      }

      if (cpf == '' || cpf == undefined) {
        throw 'Informe um valor para o cpf!';
      }

      if (id) {
        const response = await fetch(API_URL + 'cliente?id=' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForm),
        });
        // console.log(response);
        // console.log(dataForm);

        if (response.ok) {
          alert('Registro Salvo com sucesso!');
          navigation.navigate('ClienteAPIListScreen');
        } else {
          throw await response.json();
        }

      } else {
        const response = await fetch(API_URL + 'cliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForm),
        });
        // console.log(response);
        // console.log(dataForm);

        if (response.ok) {
          alert('Registro Salvo com sucesso!');
          navigation.navigate('ClienteAPIListScreen');
        } else {
          throw await response.json();
        }
      }
    } catch (error) {
      let mensagemErro = 'Código: ' + error.codigo + ' Erro: ' + error.erro;
      alert(mensagemErro);
      console.error('Erro: ', mensagemErro);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput label="Nome" value={nome} onChangeText={setNome} />
      <TextInput label="CPF" value={cpf} onChangeText={setCPF} />
      <TextInput label="Telefone" value={telefone} onChangeText={setTelefone} />
      <Button icon="save" mode="contained" onPress={save}>
        Salvar
      </Button>
    </View>
  );
}
