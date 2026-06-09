# Guia de Integração: API Slim + React Native

Documento de apoio para as 4 aulas de programação web integrada com React Native.

---

## 📅 Plano das 4 Aulas

### **Aula 1 (09/06) - Introdução a Web & API REST**

#### Objetivos:
- Entender conceitos de servidor web e cliente
- Aprender princípios REST
- Configurar ambiente e testar API

#### Conteúdo:
1. **O que é uma API?**
   - Definição simples: "Interface que permite que aplicações se comuniquem"
   - Cliente (React Native) → Servidor (API PHP)
   - Dados trafegam em JSON

2. **Princípios REST**
   - Recursos: entidades do sistema (servicos, clientes, prestadores)
   - Métodos HTTP:
     - `GET` - Obter dados
     - `POST` - Criar novo
     - `PUT` - Atualizar
     - `DELETE` - Remover

3. **Estrutura de Resposta Padrão**
   ```json
   {
     "success": true,
     "statusCode": 200,
     "data": { /* dados aqui */ }
   }
   ```

4. **Testando a API**
   - Usar Insomnia ou Postman
   - Fazer requisições aos endpoints
   - Verificar respostas

#### Exercício Prático:
- [ ] Instalar Insomnia/Postman
- [ ] Fazer 5 requisições diferentes à API
- [ ] Documentar as respostas

---

### **Aula 2 (16/06) - Desenvolvimento da API com PHP POO**

#### Objetivos:
- Entender padrão MVC
- Aprender a criar Controllers e Models
- Implementar validação e tratamento de erros

#### Conteúdo:

1. **Padrão MVC**
   ```
   REQUEST → ROUTE → CONTROLLER → MODEL → DATABASE
                         ↑
                     (lógica)
   ```

2. **Controllers** - Lógica das requisições
   - Recebem requisições HTTP
   - Chamam Models
   - Retornam respostas

3. **Models** - Acesso a dados
   - Comunicam com banco de dados
   - Métodos CRUD (Create, Read, Update, Delete)
   - Validação de dados

4. **Banco de Dados**
   - Usar a tabela `servicos` já existente
   - Entender relacionamentos

#### Estrutura de uma Requisição:

```php
// 1. Client envia dados
POST /api/servicos
{
  "titulo": "Novo Serviço",
  "descricao": "...",
  "preco": 100.00,
  "categoria": "...",
  "id_prestador": 1
}

// 2. Route chama Controller
$app->post('/api/servicos', [ServicoController::class, 'criarServico']);

// 3. Controller valida e chama Model
public function criarServico(Request $request, Response $response) {
  $data = $request->getParsedBody();
  $servico->validate($data); // Validar
  $servico->create($data);   // Criar
}

// 4. Model acessa banco de dados
public function create() {
  $sql = "INSERT INTO servicos (...)";
  return $this->db->execute($sql);
}

// 5. Resposta enviada ao client
{
  "success": true,
  "statusCode": 201,
  "data": { "message": "Criado com sucesso" }
}
```

#### Exercícios:
- [ ] Criar novo Controller para Clientes
- [ ] Implementar Model para Clientes
- [ ] Testar CRUD completo
- [ ] Adicionar validações customizadas

---

### **Aula 3 (23/06) - Consumindo a API no React Native**

#### Objetivos:
- Fazer requisições HTTP
- Gerenciar estados com dados da API
- Tratar erros

#### Conteúdo:

1. **Configurar URL da API**

```javascript
// src/config/api.js
const API_BASE_URL = 'http://localhost/eng_prog3_2026_1/APISlim/public/api';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000
};
```

2. **Criar Serviço de API**

```javascript
// src/api/servicoAPI.js
import { API_CONFIG } from '../config/api';

export const ServicoAPI = {
  // Listar todos
  listar: async () => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/servicos`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  },

  // Obter por ID
  obter: async (id) => {
    const response = await fetch(`${API_CONFIG.baseURL}/servicos/${id}`);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  },

  // Criar novo
  criar: async (servico) => {
    const response = await fetch(`${API_CONFIG.baseURL}/servicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.data;
  },

  // Atualizar
  atualizar: async (id, servico) => {
    const response = await fetch(`${API_CONFIG.baseURL}/servicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(servico)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.data;
  },

  // Deletar
  deletar: async (id) => {
    const response = await fetch(`${API_CONFIG.baseURL}/servicos/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.data;
  }
};
```

3. **Usar em Componentes**

```javascript
// screens/ListaServicos.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ServicoAPI } from '../api/servicoAPI';

export default function ListaServicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      setLoading(true);
      setErro(null);
      
      const dados = await ServicoAPI.listar();
      setServicos(dados);
    } catch (error) {
      setErro(error.message);
      console.error('Erro ao carregar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (erro) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Erro: {erro}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={servicos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {item.titulo}
          </Text>
          <Text>{item.descricao}</Text>
          <Text style={{ color: 'green', fontSize: 14 }}>
            R$ {parseFloat(item.preco).toFixed(2)}
          </Text>
        </View>
      )}
    />
  );
}
```

4. **Formulário de Criação**

```javascript
// screens/CadastrarServico.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { ServicoAPI } from '../api/servicoAPI';

export default function CadastrarServico({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [idPrestador, setIdPrestador] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!titulo || !descricao || !preco || !categoria || !idPrestador) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      
      const novoServico = {
        titulo,
        descricao,
        preco: parseFloat(preco),
        categoria,
        id_prestador: parseInt(idPrestador)
      };

      await ServicoAPI.criar(novoServico);
      
      Alert.alert('Sucesso', 'Serviço criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, height: 80 }}
      />
      
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="decimal-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="ID do Prestador"
        value={idPrestador}
        onChangeText={setIdPrestador}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Button
        title={loading ? 'Salvando...' : 'Salvar'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
}
```

#### Exercícios:
- [ ] Implementar ServicoAPI completo
- [ ] Criar tela de listagem consumindo API
- [ ] Criar tela de formulário
- [ ] Implementar tratamento de erros
- [ ] Adicionar loading states

---

### **Aula 4 (30/06) - Apresentação do Sistema Completo**

#### Objetivos:
- Integração completa funcionando
- Código limpo e documentado
- Apresentação ao professor

#### Checklist de Apresentação:

- [ ] **API Funcionando**
  - Health check retorna status
  - CRUD completo testado
  - Erros tratados adequadamente

- [ ] **React Native Consumindo API**
  - Lista de serviços carrega
  - Pode criar novo serviço
  - Pode editar serviço
  - Pode deletar serviço

- [ ] **Documentação**
  - README da API completo
  - Exemplos de uso
  - Estrutura explicada

- [ ] **Código Limpo**
  - Nomenclatura clara
  - Comentários em inglês/português
  - Sem código duplicado

---

## 🛠️ Dicas e Boas Práticas

### Para o Professor:

1. **Configurar Ambiente**
   - Usar Laragon (já instalado)
   - Verificar PHP 7.4+
   - Ter MySQL rodando

2. **Explicar Conceitos Progressivamente**
   - Semana 1: HTTP e REST
   - Semana 2: PHP e Controllers
   - Semana 3: React Native
   - Semana 4: Integração completa

3. **Usar Exemplos Reais**
   - Aplicação já existente (ServiçosApp)
   - Dados do banco de dados real
   - Casos de uso do dia a dia

4. **Incentivar Debugging**
   - Usar Insomnia para testar
   - Ver logs do servidor
   - Entender fluxo de dados

### Para os Alunos:

1. **Antes de codificar**
   - Entender o fluxo de dados
   - Documentar o que precisa ser feito
   - Testar a API antes de usar no React

2. **Durante o desenvolvimento**
   - Usar Insomnia para validar endpoints
   - Fazer pequenos passos
   - Testar frequentemente

3. **Após terminar**
   - Revisar código
   - Documentar
   - Preparar apresentação

---

## 🔗 Referências Úteis

### Documentações:
- [Slim Framework Docs](https://www.slimframework.com/)
- [MDN - HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Native Docs](https://reactnative.dev/)

### Ferramentas:
- [Insomnia](https://insomnia.rest/) - Testar API
- [Postman](https://www.postman.com/) - Testar API
- [VS Code](https://code.visualstudio.com/) - Editor

### Padrões:
- REST API Best Practices
- MVC Pattern
- SOLID Principles (básico)

---

## ❓ Troubleshooting Comum

### "API não encontrada (404)"
- Verificar se arquivo `.htaccess` está na pasta `public/`
- Verificar se URL está correta
- Limpar cache do navegador

### "Erro de conexão com banco de dados"
- Verificar configurações em `config/config.php`
- Verificar se MySQL está rodando
- Verificar credenciais

### "CORS Error no React Native"
- Verificar se `CorsMiddleware` está ativo
- Adicionar origem ao array `ALLOWED_ORIGINS`
- Testar com Insomnia primeiro

### "Erro de validação"
- Verificar tipos de dados
- Verificar campos obrigatórios
- Usar Insomnia para enviar dados corretos

---

**Boa sorte com as aulas! 🚀**
