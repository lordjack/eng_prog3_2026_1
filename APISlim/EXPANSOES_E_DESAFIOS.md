# Ideias de Expansão e Projetos Complementares

Documento com sugestões de como expandir o projeto base e atividades complementares para aprofundar o aprendizado.

---

## 🎓 Extensões Pedagógicas

### Etapa 1: Fundamentos (Aulas 1-2)
Já coberto com a API base.

### Etapa 2: Segurança e Autenticação (Próxima)

#### 2.1 - Autenticação JWT (JSON Web Tokens)
```php
// Novo endpoint: POST /api/auth/login
// Retorna um token JWT que alunos usam em requisições

public function login(Request $request, Response $response) {
  // Validar credenciais
  // Gerar JWT
  // Retornar token
}

// Middleware de proteção
// Verificar token antes de cada operação
```

**Tempo:** 2 aulas
**Dificuldade:** Média

#### 2.2 - Autorização (Roles/Permissões)
```php
// Diferentes tipos de usuários
// - Cliente: Pode listar serviços
// - Prestador: Pode gerenciar seus serviços
// - Admin: Acesso total

// Verificar role do usuário antes de ação
```

**Tempo:** 1-2 aulas
**Dificuldade:** Média-Alta

### Etapa 3: Recursos Avançados

#### 3.1 - Upload de Imagens
```php
// POST /api/servicos/{id}/imagem
// Salvar foto do serviço
// Retornar URL da imagem
```

**Integração React Native:**
```javascript
// Usar ImagePicker
// Fazer upload FormData
// Exibir imagem na lista
```

#### 3.2 - Avaliações e Comentários
```php
// POST /api/avaliacoes
// GET /api/servicos/{id}/avaliacoes
// DELETE /api/avaliacoes/{id}
```

#### 3.3 - Sistema de Mensagens
```php
// POST /api/mensagens
// GET /api/mensagens/{conversaId}
// Notificações em tempo real (próximo: WebSocket)
```

### Etapa 4: Performance e Escalabilidade

#### 4.1 - Paginação
```php
// GET /api/servicos?page=1&limit=10
// Implementar offset/limit
```

#### 4.2 - Cache
```php
// Usar Redis para cache
// GET /api/servicos (rápido em lista grande)
```

#### 4.3 - Filtros e Busca
```php
// GET /api/servicos?categoria=Eletrônicos&preco_max=200
// GET /api/servicos/busca?q=notebook
```

### Etapa 5: Tempo Real (WebSocket)

#### 5.1 - Notificações
```javascript
// Cliente conecta via WebSocket
// Servidor notifica quando novo serviço é criado
// Lista atualiza em tempo real
```

---

## 💡 Ideias Práticas de Projetos

### Projeto 1: Sistema de Agendamento
Expandir a aplicação existente com:

**Tabelas:**
```sql
CREATE TABLE agendamentos (
    id INT PRIMARY KEY,
    id_cliente INT,
    id_servico INT,
    data_agendamento DATETIME,
    status ENUM('pendente', 'confirmado', 'concluído'),
    avaliacao DECIMAL(3,1)
);
```

**Endpoints:**
- `POST /api/agendamentos` - Cliente marca agendamento
- `GET /api/agendamentos` - Listar para prestador
- `PUT /api/agendamentos/{id}/status` - Atualizar status
- `POST /api/agendamentos/{id}/avaliacao` - Avaliar após conclusão

**React Native:**
- Calendario para escolher data
- Notificações de confirmação
- Chat com prestador

### Projeto 2: Sistema de Pagamentos
Integrar pagamento e comissão:

**Tabelas:**
```sql
CREATE TABLE pagamentos (
    id INT PRIMARY KEY,
    id_agendamento INT,
    valor DECIMAL(10,2),
    metodo VARCHAR(50),
    status ENUM('pendente', 'pago', 'cancelado'),
    data_criacao TIMESTAMP
);
```

**Endpoints:**
- `POST /api/pagamentos` - Processar pagamento
- `GET /api/pagamentos/{id}` - Status do pagamento
- `GET /api/relatorios/faturamento` - Relatório por período

**Integração:**
- Usar API de pagamento real (PagSeguro, Stripe)
- Recibos em PDF

### Projeto 3: Mapa de Prestadores
Localizar prestadores próximos:

**Tabelas:**
```sql
ALTER TABLE prestadores ADD COLUMN (
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8),
    raio_atendimento INT
);
```

**Endpoints:**
- `GET /api/prestadores/proximidade?lat=-23.5&lon=-46.6` - Buscar próximos
- `GET /api/rotas?id_cliente=1` - Calcular rota

**React Native:**
- Integrar React Native Maps
- Mostrar prestadores no mapa
- Calcular distância

---

## 🛠️ Atividades Práticas por Aula

### Aula 1: Fundamentos Web

**Atividade 1.1 - Entender o Flow**
- [ ] Desenhar diagrama Client → Server
- [ ] Mostrar request/response no Insomnia
- [ ] Explicar cada campo do JSON

**Atividade 1.2 - Testar Endpoints**
- [ ] Fazer 10 requisições diferentes
- [ ] Documentar respostas
- [ ] Identificar padrões

**Atividade 1.3 - Códigos HTTP**
- [ ] Provocar erro 404 propositalmente
- [ ] Provocar erro 422 com dados inválidos
- [ ] Documentar o que cada código significa

### Aula 2: PHP POO

**Atividade 2.1 - Criar novo Model**
```
[ ] Criar Model "Cliente"
[ ] Métodos: create(), getAll(), getById(), update(), delete()
[ ] Adicionar validação
```

**Atividade 2.2 - Criar novo Controller**
```
[ ] Criar Controller "ClienteController"
[ ] Implementar todos os métodos CRUD
[ ] Testar com Insomnia
```

**Atividade 2.3 - Registrar Rotas**
```
[ ] Adicionar rotas em index.php
[ ] GET, POST, PUT, DELETE para /api/clientes
[ ] Testar cada uma
```

**Atividade 2.4 - Melhorar Validação**
```
[ ] Adicionar mais regras de validação
[ ] Email válido
[ ] Telefone formatado
[ ] CPF válido (extra)
```

### Aula 3: React Native

**Atividade 3.1 - Criar Service**
```
[ ] Criar arquivo api.js
[ ] Implementar funções para cada endpoint
[ ] Adicionar tratamento de erro
```

**Atividade 3.2 - Listar dados**
```
[ ] Criar tela que chama API
[ ] Exibir em FlatList
[ ] Adicionar loading state
[ ] Adicionar error state
```

**Atividade 3.3 - Criar novo**
```
[ ] Implementar formulário
[ ] Validar dados localmente
[ ] Enviar para API
[ ] Mostrar confirmação
[ ] Atualizar lista
```

**Atividade 3.4 - Editar e Deletar**
```
[ ] Implementar PUT
[ ] Implementar DELETE
[ ] Adicionar confirmação
[ ] Atualizar lista local
```

### Aula 4: Integração

**Atividade 4.1 - App Completa**
```
[ ] Todas as funcionalidades funcionando
[ ] Sem bugs
[ ] Interface amigável
```

**Atividade 4.2 - Documentação**
```
[ ] Documentar como usar a API
[ ] Documentar estrutura do código
[ ] Exemplos de requisições
```

**Atividade 4.3 - Apresentação**
```
[ ] Preparar slides (5-10 slides)
[ ] Demonstrar funcionando
[ ] Explicar decisões técnicas
[ ] Responder perguntas
```

---

## 📊 Rubrica de Avaliação

### Aula 2: API PHP (40 pontos)

| Critério | Excelente | Bom | Satisfatório | Insuficiente |
|----------|-----------|-----|--------------|--------------|
| **Funcionalidade CRUD** (10) | Tudo funciona | 1-2 erros | 3-4 erros | Não funciona |
| **Validação** (10) | Completa e precisa | Maioria ok | Mínima | Nenhuma |
| **Código Limpo** (10) | Muito legível | Legível | Confuso | Ilegível |
| **Documentação** (10) | Excelente | Boa | Básica | Nenhuma |

### Aula 3: React Native (30 pontos)

| Critério | Excelente | Bom | Satisfatório | Insuficiente |
|----------|-----------|-----|--------------|--------------|
| **Integração API** (10) | Sem problemas | Mínimos erros | Alguns erros | Não integra |
| **UX/Interface** (10) | Intuitiva | Boa | Básica | Ruim |
| **Tratamento Erros** (10) | Robusto | Bom | Mínimo | Nenhum |

### Aula 4: Apresentação (30 pontos)

| Critério | Excelente | Bom | Satisfatório | Insuficiente |
|----------|-----------|-----|--------------|--------------|
| **Funcionalidade** (10) | Tudo perfeito | 1-2 bugs | Vários bugs | Não funciona |
| **Apresentação** (10) | Muito clara | Clara | Confusa | Desorganizada |
| **Resposta Perguntas** (10) | Seguro | Bem | Hesitante | Não sabe |

---

## 🚀 Desafios Extra (Bonus)

### Desafio 1: Autenticação (10 pontos)
Implementar login com JWT

### Desafio 2: Imagens (10 pontos)
Upload de foto do serviço e exibição no app

### Desafio 3: Busca Avançada (10 pontos)
Filtros por categoria, preço, ordenação

### Desafio 4: Notificações (15 pontos)
Notificações quando novo serviço é criado

### Desafio 5: Performance (10 pontos)
Paginação e cache implementados

---

## 📚 Recursos de Aprendizado Complementares

### Documentações Recomendadas
- [MDN - HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Introduction](https://jwt.io/introduction)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

### Vídeos Tutoriais (YouTube)
- "REST API Concepts" - por Traversy Media
- "PHP OOP" - por Tech With Tim
- "React Native Networking" - por Nerd Forge

### Livros
- "Clean Code" - Robert Martin
- "RESTful Web Services" - Leonard Richardson

---

## 🎯 Metas de Aprendizado

Ao final do curso, alunos devem:

1. ✅ Entender conceitos fundamentais de API REST
2. ✅ Criar uma API funcional com PHP
3. ✅ Consumir API em aplicação mobile
4. ✅ Aplicar boas práticas de código
5. ✅ Trabalhar com banco de dados
6. ✅ Debugar problemas de integração
7. ✅ Documentar seu trabalho
8. ✅ Apresentar um projeto funcional

---

**Próxima etapa após as 4 aulas: Autenticação JWT ou Outras Plataformas? 🚀**
