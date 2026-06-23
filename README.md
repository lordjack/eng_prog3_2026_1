## About this Project - Programação 3 - Eng. Controle e Automação 2026.1
Código-Fonte do projeto desenvolvido durante as aulas de Programação 3 em JavaScript e PHP no curso de Engenharia de Controle e Automação do IFSC 2026.1.

Este repositório reúne os principais trabalhos e exemplos usados nas aulas:

- **JavaScript com POO** (pasta `poo/`)
- **HTML** (pasta `html/`)
- **PHP** (pasta `php/`)
- **React Native** (pasta `projeto-base-programacao-mobile/`)
- **API REST em PHP** (pasta `APIModelo/`)

## Estrutura principal do repositório

### `poo/`
Projetos em JavaScript com foco em Programação Orientada a Objetos, exercícios e classes como `ContaCorrente`, `ContaPoupanca` e controle de pessoas.

### `html/`
Exemplos de páginas estáticas e exercícios HTML usados nas aulas.

### `php/`
Formulários e scripts PHP para processar dados em servidor, incluindo exemplos de conexão e manipulação de formulários.

### `projeto-base-programacao-mobile/`
Aplicativo mobile em **React Native + Expo**. Esta pasta contém o app usado em sala:

- navegação com `@react-navigation/native-stack`
- telas para cadastro e listagem de alunos
- consumo de API pública de filmes
- integração com backend próprio via `src/config/api.js`
- conexão com **Firebase Realtime Database** para CRUD de alunos

### `APIModelo/`
API REST construída em PHP puro com arquitetura **MVC**. Essa API pode ser usada pelo app React Native ao configurar a URL em `projeto-base-programacao-mobile/src/config/api.js`.

> Para conectar o app React Native à API, ajuste o valor de `API_URL` em `projeto-base-programacao-mobile/src/config/api.js` para apontar para `APIModelo/public/` ou para o backend hospedado.

## Comandos básicos Git

**Clonar o projeto**  
`git clone URL_PROJETO`

**Configurar o email e nome do repositorio**  
`git config --global user.email "you@example.com"`\
`git config --global user.name "Your Name"`

**Adicionar todos arquivos para serem versionados**  
`git add .`

**Commitar o arquivo para ser versionado**  
`git commit -m "Sua mensagem"`

**Enviar as alterações para o repositorio remoto do Git**  
`git push`

**Atualizar arquivos do projeto local de acordo com o repositorio do Git remoto**  
`git pull`

## Observações

- O repositório foi usado em aulas de programação voltadas para os estudantes do IFSC, turma de Engenharia de Controle e Automação.
- O fluxo do curso passou por **JavaScript com POO**, **HTML**, **PHP**, **React Native** e **API REST**.
- O app em `projeto-base-programacao-mobile/` é o projeto mobile que consome APIs e usa Firebase para dados de alunos.
- A API em `APIModelo/` é o backend que atende requisições REST, ideal para integração com o app React Native.
