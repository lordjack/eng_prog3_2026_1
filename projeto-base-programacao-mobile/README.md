# Projeto Base Programação Mobile

Este README descreve o app dentro da pasta `projeto-base-programacao-mobile`.

## Visão geral do projeto

O app é um projeto React Native criado com Expo. Ele usa navegação em pilha (`@react-navigation/native-stack`) para exibir várias telas e integra Firebase Realtime Database para persistência de dados.

A aplicação tem três blocos principais:

1. Navegação e telas básicas
2. CRUD de alunos usando Firebase
3. Consumo de APIs externas e backend próprio

## Como o app funciona

### Navegação

O arquivo `App.js` configura a navegação do app com `NavigationContainer` e `createNativeStackNavigator`.

As telas disponíveis são:
- `HomeScreen` - menu principal do app
- `IntroducaoRN` - página de introdução aos conceitos de React Native
- `AlunoListScreen` - lista de alunos
- `AlunoFormScreen` - formulário para adicionar/editar aluno
- `APIListScreen` - lista de filmes via API pública
- `ClienteAPIListScreen` - lista de clientes via backend próprio
- `ClienteAPIFormScreen` - formulário de cliente via backend próprio

### CRUD de alunos com Firebase

- `src/config/firebase.js` contém a configuração do Firebase e exporta `db` para o Realtime Database.
- `AlunoListScreen` carrega os dados de `db.ref('aluno')` e exibe os alunos encontrados.
- `AlunoFormScreen` salva um novo aluno com `db.ref('aluno').push(dataForm)` ou atualiza um aluno existente com `db.ref('aluno/' + id).update(dataForm)`.
- A exclusão de aluno é feita com `db.ref('aluno').child(id).remove()` após confirmação de pressionar longo.

Os campos usados no cadastro de aluno são:
- `nome`
- `email`
- `telefone`

### Consumo de API pública

A tela `APIListScreen` busca dados de `https://reactnative.dev/movies.json` e exibe uma lista de filmes.

Ela usa `fetch()` para obter o JSON e filtra resultados localmente pelo título.

### Integração com backend próprio

O app também contém uma área de cliente que consome um backend externo definido em `src/config/api.js`.

- `ClienteAPIListScreen` faz requisições `GET` para `API_URL + 'cliente'` e exibe os clientes.
- A exclusão de cliente usa `DELETE` em `API_URL + 'cliente?id=' + id`.
- `ClienteAPIFormScreen` faz `POST` para criar clientes e `PUT` para atualizar clientes.

Os campos do cliente são:
- `nome`
- `cpf`
- `telefone`

> Ajuste `src/config/api.js` para apontar para o seu backend correto.

## Estrutura do projeto

- `App.js` - configuração da navegação e registros das telas
- `index.js` - entrypoint do Expo
- `package.json` - dependências e scripts do projeto
- `src/config/firebase.js` - configuração do Firebase Realtime Database
- `src/config/api.js` - URL base para o backend de cliente
- `src/screens/` - telas do app
  - `HomeScreen.js`
  - `IntroducaoRN.js`
  - `AlunoListScreen.js`
  - `AlunoFormScreen.js`
  - `APIListScreen.js`
  - `ClienteApi/ClienteAPIListScreen.js`
  - `ClienteApi/ClienteAPIFormScreen.js`

## Como executar

1. Abra o terminal na pasta `projeto-base-programacao-mobile`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o app com Expo:
   ```bash
   npm start
   ```
4. Abra o app no Expo Go ou em um emulador Android/iOS.

### Scripts úteis

- `npm start` - inicia o servidor Expo
- `npm run android` - inicia Expo e abre no Android
- `npm run ios` - inicia Expo e abre no iOS
- `npm run web` - inicia a versão web

## Tecnologias usadas

- Expo
- React Native
- React Navigation
- React Native Paper
- Firebase Realtime Database

## Observações importantes

- O app usa a versão 8 do SDK `firebase`.
- O Firebase está configurado para o Realtime Database em `src/config/firebase.js`.
- O backend de cliente é configurado em `src/config/api.js` e deve ser atualizado para o seu domínio/IP.
- A tela `AlunoListScreen` permite buscar alunos por nome e navegar para edição ao pressionar o item.
- O botão `+` abre o formulário para cadastrar um novo registro.
