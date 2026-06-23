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

export default function APIListScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => load(), []));

  const dataFiltrados = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const load = async () => {
    const response = await fetch('https://reactnative.dev/movies.json');

    const json = await response.json();

    setData(json.movies);
  };

  const Items = ({ dado }) => {
    console.log(dado);
    return (
      <View style={styles.containerItem}>
        <Pressable>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.nome}>{dado.title}</Text>
            <Text style={styles.telefone}>{dado.releaseYear}</Text>
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
          data={dataFiltrados}
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
