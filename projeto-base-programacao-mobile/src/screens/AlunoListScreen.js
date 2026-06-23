import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import { Button, FAB, Searchbar } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { db } from '../config/firebase';

export default function AlunoListScreen() {
  const navigation = useNavigation();
  const [alunos, setAlunos] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => load(), []));

  const alunosFiltrados = alunos.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  const load = async () => {
    const snapshot = await db.ref('aluno').once('value');
    const val = snapshot.val();

    if (!val) {
      return [];
    }

    const lista = Object.entries(val).map(([id, dados]) => {
      return { id, ...dados };
    });
    setAlunos(lista);
  };

  const destroy = async (id) => {
    if (confirm('Deseja Excluir?')) {
      await db.ref('aluno').child(id).remove();
      await load();
    }
  };

  const Items = ({ dado }) => {
    console.log(dado);
    return (
      <View style={styles.containerItem}>
        <Pressable
          onPress={() => navigation.navigate('AlunoFormScreen', { dado: dado })}
          onLongPress={() => destroy(dado.id)}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.nome}>{dado.nome}</Text>
            <Text style={styles.telefone}>{dado.telefone}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.tela}>
        <Searchbar
          style={{ marginBottom: 8 }}
          placeholder="Pesquisar..."
          onChangeText={setSearch}
          value={search}
        />
        <FlatList
          data={alunosFiltrados}
          renderItem={({ item }) => <Items dado={item} />}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AlunoFormScreen', { dado: '' })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  tela: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  telefone: { fontSize: 16, color: '#2e7d32' },
  containerItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
