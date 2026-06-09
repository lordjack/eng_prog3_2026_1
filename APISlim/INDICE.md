# 📋 Índice Rápido do Projeto

Navegação rápida pela documentação do projeto APISlim.

---

## 🎯 Acessos Rápidos por Necessidade

### ❓ "Quero começar rapidinho"
→ Leia: [QUICK_START.md](QUICK_START.md) (5 minutos)

### 🏫 "Como dar as aulas?"
→ Leia: [GUIA_INTEGRACAO.md](GUIA_INTEGRACAO.md) (Plano completo das 4 aulas)

### 📖 "Como a API funciona?"
→ Leia: [README.md](README.md) (Documentação técnica)

### 🧪 "Como testar a API?"
→ Leia: [TESTES_CURL.md](TESTES_CURL.md) (Exemplos com cURL)

### 💡 "Que ideias posso implementar?"
→ Leia: [EXPANSOES_E_DESAFIOS.md](EXPANSOES_E_DESAFIOS.md) (Projetos extras)

### 📊 "Resumo para entender tudo"
→ Leia: [RESUMO_PROFESSOR.md](RESUMO_PROFESSOR.md) (Visão geral completa)

---

## 🗂️ Estrutura de Arquivos

```
APISlim/
│
├── 📘 Documentação (COMECE POR AQUI)
│   ├── QUICK_START.md              ← 5 min para começar
│   ├── RESUMO_PROFESSOR.md          ← Visão geral para professores
│   ├── README.md                    ← Documentação técnica
│   ├── GUIA_INTEGRACAO.md           ← Plano das 4 aulas
│   ├── TESTES_CURL.md               ← Exemplos de teste
│   └── EXPANSOES_E_DESAFIOS.md      ← Ideias futuras
│
├── 💾 Banco de Dados
│   └── setup.sql                    ← Crie as tabelas aqui
│
├── 🔧 Configuração
│   └── config/
│       └── config.php               ← Edite DB, CORS, ambiente
│
├── 📦 Código da Aplicação
│   ├── public/
│   │   ├── index.php                ← Ponto de entrada
│   │   └── .htaccess                ← Reescrita de URLs
│   │
│   └── src/
│       ├── Controllers/
│       │   └── ServicoController.php ← Exemplo de Controller
│       ├── Models/
│       │   ├── Database.php         ← Conexão com BD
│       │   └── Servico.php          ← Exemplo de Model
│       ├── Middlewares/
│       │   └── CorsMiddleware.php   ← CORS para React
│       └── Utils/
│           └── Response.php         ← Respostas JSON
│
└── 📋 Configuração PHP
    └── composer.json                ← Dependências (Slim)
```

---

## 🚀 Roadmap de Início

### Dia 1 - Setup (30 min)
1. Leia [QUICK_START.md](QUICK_START.md)
2. Execute `setup.sql` no phpMyAdmin
3. Teste `/api/health` no navegador
4. ✅ Pronto!

### Dia 2-3 - Preparação Aula 1
1. Leia [GUIA_INTEGRACAO.md](GUIA_INTEGRACAO.md) - Seção Aula 1
2. Revise [TESTES_CURL.md](TESTES_CURL.md)
3. Instale Insomnia
4. Faça os testes manualmente
5. Prepare apresentação

### Dia 4-5 - Preparação Aulas 2-4
1. Estude Controllers em [ServicoController.php](src/Controllers/ServicoController.php)
2. Estude Models em [Servico.php](src/Models/Servico.php)
3. Prepare exemplos para mostrar em aula
4. Elabore atividades para alunos

### Dia 6-7 - Revisão Final
1. Revise [RESUMO_PROFESSOR.md](RESUMO_PROFESSOR.md)
2. Teste tudo funcionando
3. Prepare questionário/quiz
4. Relaxa! Tudo pronto 😊

---

## 📌 Endpoints Principais (Colar no Insomnia)

```
Base URL: http://localhost/eng_prog3_2026_1/APISlim/public/api

GET     /health                 - Verificar se está online
GET     /servicos              - Listar todos
GET     /servicos/{id}         - Obter um específico
POST    /servicos              - Criar novo
PUT     /servicos/{id}         - Atualizar
DELETE  /servicos/{id}         - Deletar
```

---

## 🎯 Objetivos por Aula

### Aula 1 (09/06) - Fundamentos [4h]
- [ ] Alunos entendem o que é API
- [ ] Alunos entendem HTTP methods
- [ ] Alunos conseguem testar endpoints
- [ ] Alunos entendem JSON

**Atividade:** Testar endpoints com Insomnia

---

### Aula 2 (16/06) - PHP OOP [4h]
- [ ] Alunos entendem MVC
- [ ] Alunos conseguem criar Controller
- [ ] Alunos conseguem criar Model
- [ ] Alunos implementam CRUD

**Atividade:** Criar Model+Controller para "Clientes"

---

### Aula 3 (23/06) - React Native [4h]
- [ ] Alunos conseguem fazer requisição HTTP
- [ ] Alunos conseguem exibir dados
- [ ] Alunos conseguem enviar dados
- [ ] Alunos tratam erros

**Atividade:** Conectar app React Native à API

---

### Aula 4 (30/06) - Apresentação [4h]
- [ ] Aplicação funciona 100%
- [ ] Código está documentado
- [ ] Alunos conseguem explicar
- [ ] Alunos respondeem perguntas

**Atividade:** Apresentar projeto funcionando

---

## ✅ Checklist de Preparação

### Uma Semana Antes
- [ ] Ler este arquivo completamente
- [ ] Executar setup.sql
- [ ] Testar /api/health
- [ ] Revisar GUIA_INTEGRACAO.md

### 3 Dias Antes
- [ ] Instalar Insomnia
- [ ] Fazer todos os testes de TESTES_CURL.md
- [ ] Preparar apresentação Aula 1
- [ ] Revisar código em ServicoController.php

### 1 Dia Antes
- [ ] Testar projetor em sala
- [ ] Revisar apresentação
- [ ] Testar acesso à rede da instituição
- [ ] Garantir que MySQL está rodando

### Dia da Aula
- [ ] Chegar 15 min antes
- [ ] Testar projetor
- [ ] Testar acesso à API
- [ ] Ter Insomnia aberto
- [ ] Ter este índice impresso

---

## 🎓 Materiais para Alunos

Compartilhe com os alunos:

### Antes da Aula 1
- [ ] [README.md](README.md) - Como funciona a API
- [ ] [TESTES_CURL.md](TESTES_CURL.md) - Exemplos para testar
- [ ] Link para Insomnia: https://insomnia.rest/

### Antes da Aula 2
- [ ] [Aula 2 do GUIA_INTEGRACAO.md](GUIA_INTEGRACAO.md)
- [ ] [ServicoController.php](src/Controllers/ServicoController.php) - Código para estudar
- [ ] [Servico.php](src/Models/Servico.php) - Model para estudar

### Antes da Aula 3
- [ ] [Aula 3 do GUIA_INTEGRACAO.md](GUIA_INTEGRACAO.md)
- [ ] Código JavaScript de exemplo (copiar de GUIA_INTEGRACAO.md)

### Antes da Aula 4
- [ ] [Rubrica de avaliação](EXPANSOES_E_DESAFIOS.md)
- [ ] Checklist de apresentação

---

## 🔍 Como Encontrar o que Precisa

| Preciso de... | Arquivo |
|--------------|---------|
| Setup rápido | QUICK_START.md |
| Plano das aulas | GUIA_INTEGRACAO.md |
| Lista de endpoints | README.md |
| Exemplos de teste | TESTES_CURL.md |
| Expandir projeto | EXPANSOES_E_DESAFIOS.md |
| Visão geral | RESUMO_PROFESSOR.md |
| Código Controller | src/Controllers/ServicoController.php |
| Código Model | src/Models/Servico.php |
| Código BD | src/Models/Database.php |
| Código CORS | src/Middlewares/CorsMiddleware.php |
| Criar tabelas | setup.sql |
| Configurar BD | config/config.php |

---

## 💬 Frases Úteis para Usar em Aula

### Aula 1
> "Uma API é como um garçom. Você (cliente) pede, ele processa no cozinha (servidor) e traz a resposta."

> "HTTP é o idioma que cliente e servidor usam para conversar."

### Aula 2
> "MVC é dividir o trabalho: Model → dados, Controller → lógica, View → apresentação."

> "Validação protege seu banco de dados de dados ruins."

### Aula 3
> "Fetch é apenas fazer uma requisição HTTP programaticamente."

> "Sempre trate os erros! Seu usuário vai tentar coisas inesperadas."

### Aula 4
> "O melhor código é aquele que outro programador consegue entender."

> "Parabéns! Vocês criaram uma aplicação real cliente-servidor!"

---

## 🎬 Dicas de Apresentação

### Projetar em Aula
1. Abra Insomnia lado a lado com código
2. Faça uma requisição
3. Mostre que retornou dados
4. Mostre o código que processou
5. Explique cada parte

### Exemplo de Flow para Mostrar
```
1. Aluno faz requisição GET /api/servicos em Insomnia
2. Requisição chega em public/index.php
3. index.php direciona para ServicoController.php
4. Controller chama Servico.php (Model)
5. Model consulta banco de dados
6. Dados retornam para Controller
7. Controller formata em JSON
8. JSON aparece em Insomnia
```

---

## 📞 Suporte Rápido

Se algo não funcionar:

1. **API retorna 404**
   - Verificar `.htaccess` em `public/`
   - Verificar URL digitada

2. **Erro de banco de dados**
   - Verificar MySQL rodando
   - Verificar `setup.sql` foi executado
   - Verificar `config.php`

3. **CORS Error**
   - Adicionar origem em `config.php`
   - Verificar `CorsMiddleware` está ativo

4. **Confuso qual arquivo mexer**
   - Voltar a este índice
   - Procurar no Ctrl+F
   - Ler documentação correspondente

---

## 🌟 Você Está Pronto!

✅ Você tem:
- Estrutura MVC profissional
- Documentação completa
- Plano de 4 aulas
- Exemplos de testes
- Rubrica de avaliação
- Ideias de expansão

Basta agora:
1. Executar `setup.sql`
2. Testar `/api/health`
3. Começar a aula!

**Boa sorte! 🚀📚**

---

**Última atualização:** 08/06/2026  
**Compatível com:** PHP 7.4+, Slim 4.0+  
**Para turma:** Engenharia de Controle e Automação 2026-1
