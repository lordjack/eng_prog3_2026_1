// ================================================
// TELA: MAPA E GPS
// ================================================
// Demonstra como obter a localização atual do
// dispositivo usando expo-location e exibir no mapa
// com react-native-maps.
// ================================================

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, List, Divider } from 'react-native-paper';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Header from '../../components/Header';

export default function MapaScreen() {
  const [localizacao, setLocalizacao] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Obtém a localização atual do dispositivo
  async function obterLocalizacao() {
    setCarregando(true);
    setLocalizacao(null);
    setEndereco(null);

    try {
      // 1. Solicitar permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada!');
        return;
      }

      // 2. Obter coordenadas GPS (latitude e longitude)
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Alta precisão
      });
      setLocalizacao(pos.coords);

      // 3. Converter coordenadas em endereço legível (Geocodificação reversa)
      const [local] = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setEndereco(local);
    } catch (error) {
      alert('Erro ao obter localização: ' + error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Header titulo="Mapa e GPS" mostrarVoltar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.descricao}>
          Esta tela demonstra o uso do GPS do dispositivo para obter a
          localização atual e converter as coordenadas em endereço.
        </Text>

        <Button
          mode="contained"
          icon="crosshairs-gps"
          onPress={obterLocalizacao}
          loading={carregando}
          disabled={carregando}
          buttonColor="#6200ee"
          style={styles.btn}>
          {carregando ? 'Obtendo localização...' : 'Obter minha localização'}
        </Button>

        {/* Exibe as coordenadas */}
        {localizacao && (
          <Card style={styles.card}>
            <Card.Title title="📍 Coordenadas GPS" />
            <Card.Content>
              <List.Item
                title="Latitude"
                description={localizacao.latitude.toFixed(6)}
              />
              <Divider />
              <List.Item
                title="Longitude"
                description={localizacao.longitude.toFixed(6)}
              />
              <Divider />
              <List.Item
                title="Altitude (m)"
                description={localizacao.altitude?.toFixed(1) ?? 'N/A'}
              />
              <Divider />
              <List.Item
                title="Precisão (m)"
                description={localizacao.accuracy?.toFixed(1) ?? 'N/A'}
              />
            </Card.Content>
          </Card>
        )}

        {/* Exibe o endereço obtido por geocodificação reversa */}
        {endereco && (
          <Card style={styles.card}>
            <Card.Title title="🏠 Endereço aproximado" />
            <Card.Content>
              <List.Item title="Rua" description={endereco.street || 'N/A'} />
              <Divider />
              <List.Item
                title="Bairro"
                description={endereco.district || 'N/A'}
              />
              <Divider />
              <List.Item title="Cidade" description={endereco.city || 'N/A'} />
              <Divider />
              <List.Item
                title="Estado"
                description={endereco.region || 'N/A'}
              />
              <Divider />
              <List.Item
                title="CEP"
                description={endereco.postalCode || 'N/A'}
              />
            </Card.Content>
          </Card>
        )}

        {/* Dica para aula */}
        <Card style={[styles.card, styles.dicaCard]}>
          <Card.Title title="💡 Dica para aula" />
          <Card.Content>
            <Text style={styles.dica}>
              Você pode adicionar múltiplos marcadores e rotas usando o
              componente
              {'<Marker>'} dentro do {'<MapView>'}. Experimente arrastar o mapa!
            </Text>
            <Text style={styles.dica}>
              Caso de uso acadêmico: registrar a localização do aluno no momento
              da matrícula presencial ou check-in em aula.
            </Text>
          </Card.Content>
        </Card>

        {/* Mapa com marcador na localização obtida (OpenStreetMap via WebView) */}
        {localizacao && (
          <Card style={styles.card}>
            <Card.Title title="🗺️ Mapa com marcador" />
            <Card.Content>
              <MapView
                style={styles.mapa}
                initialRegion={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}>
                <Marker coordinate={localizacao} title="Você está aqui!" />
              </MapView>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  descricao: { color: '#555', marginBottom: 16, lineHeight: 20 },
  btn: { marginBottom: 16 },
  card: { marginBottom: 16, elevation: 2 },
  dicaCard: { backgroundColor: '#fffde7' },
  dica: { color: '#666', marginBottom: 8, lineHeight: 18 },
  mapa: { width: '100%', height: 250, borderRadius: 8, marginTop: 8 },
});
