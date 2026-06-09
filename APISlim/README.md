# API REST com Slim Framework

Uma base educacional para ensino de desenvolvimento de API REST com PHP e Slim Framework, integrada com React Native.

## 📋 Estrutura do Projeto

```
APISlim/
├── config/
│   └── config.php           # Configurações da aplicação
├── src/
│   ├── Controllers/         # Controllers (lógica das rotas)
│   │   └── ServicoController.php
│   ├── Models/              # Modelos (acesso a dados)
│   │   ├── Database.php
│   │   └── Servico.php
│   ├── Middlewares/         # Middlewares (CORS, autenticação, etc)
│   │   └── CorsMiddleware.php
│   └── Utils/               # Classes utilitárias
│       └── Response.php
├── public/
│   ├── index.php            # Ponto de entrada da aplicação
│   └── .htaccess            # Reescrita de URLs
├── composer.json            # Dependências do projeto
└── README.md                # Este arquivo
```

## 🚀 Instalação

### Pré-requisitos
- PHP 7.4+
- MySQL/MariaDB
- Composer (opcional, mas recomendado)

### Passos

1. **Verificar configuração do banco de dados**

Edite o arquivo `config/config.php` e ajuste as credenciais:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'trabalho');
```

2. **Preparar o banco de dados**

Certifique-se de que as tabelas existem. Você pode usar o script em `database/myDB.sql`:

```sql
CREATE TABLE IF NOT EXISTS servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    id_prestador INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. **Acessar a API**

A API estará disponível em:
```
http://localhost/eng_prog3_2026_1/APISlim/public/
```

## 📚 Endpoints da API

### Health Check
```
GET /api/health
```
Verifica se a API está funcionando.

**Resposta:**
```json
{
  "status": "online",
  "message": "API está funcionando corretamente",
  "timestamp": "2026-06-08 14:30:45",
  "environment": "development"
}
```

### Listar Serviços
```
GET /api/servicos
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "titulo": "Conserto de Notebook",
      "descricao": "Conserto rápido de componentes eletrônicos",
      "preco": "150.00",
      "categoria": "Eletrônicos",
      "id_prestador": 5,
      "data_criacao": "2026-06-08 10:30:00"
    }
  ]
}
```

### Obter Serviço por ID
```
GET /api/servicos/{id}
```

**Exemplo:**
```
GET /api/servicos/1
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": 1,
    "titulo": "Conserto de Notebook",
    "descricao": "Conserto rápido de componentes eletrônicos",
    "preco": "150.00",
    "categoria": "Eletrônicos",
    "id_prestador": 5,
    "data_criacao": "2026-06-08 10:30:00"
  }
}
```

**Erro (404 Not Found):**
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Serviço não encontrado"
}
```

### Criar Serviço
```
POST /api/servicos
```

**Body (JSON):**
```json
{
  "titulo": "Encanamento Residencial",
  "descricao": "Serviço de encanamento para residências e pequenos estabelecimentos",
  "preco": 200.00,
  "categoria": "Hidráulica",
  "id_prestador": 3
}
```

**Resposta (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "message": "Serviço criado com sucesso",
    "id": null
  }
}
```

**Erro de Validação (422):**
```json
{
  "success": false,
  "statusCode": 422,
  "message": "Erro de validação",
  "errors": {
    "titulo": "O título deve ter no mínimo 3 caracteres",
    "preco": "O preço deve ser um número positivo"
  }
}
```

### Atualizar Serviço
```
PUT /api/servicos/{id}
```

**Exemplo:**
```
PUT /api/servicos/1
```

**Body (JSON):**
```json
{
  "titulo": "Conserto de Notebook - Atualizado",
  "descricao": "Descrição atualizada",
  "preco": 180.00,
  "categoria": "Eletrônicos"
}
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "message": "Serviço atualizado com sucesso"
  }
}
```

### Deletar Serviço
```
DELETE /api/servicos/{id}
```

**Exemplo:**
```
DELETE /api/servicos/1
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "message": "Serviço deletado com sucesso"
  }
}
```

## 🧪 Testando a API

### Com Insomnia ou Postman

1. Importe ou crie as requisições acima
2. Ajuste a URL base para `http://localhost/eng_prog3_2026_1/APISlim/public/`
3. Configure o header `Content-Type: application/json` para requisições POST/PUT

### Com cURL

```bash
# Health Check
curl http://localhost/eng_prog3_2026_1/APISlim/public/api/health

# Listar serviços
curl http://localhost/eng_prog3_2026_1/APISlim/public/api/servicos

# Criar serviço
curl -X POST http://localhost/eng_prog3_2026_1/APISlim/public/api/servicos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Novo Serviço",
    "descricao": "Descrição do serviço",
    "preco": 100.00,
    "categoria": "Geral",
    "id_prestador": 1
  }'
```

## 📱 Consumindo a API no React Native

### Exemplo com Fetch API

```javascript
// Listar serviços
fetch('http://localhost/eng_prog3_2026_1/APISlim/public/api/servicos')
  .then(response => response.json())
  .then(data => {
    console.log('Serviços:', data.data);
  })
  .catch(error => console.error('Erro:', error));

// Criar serviço
fetch('http://localhost/eng_prog3_2026_1/APISlim/public/api/servicos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    titulo: 'Novo Serviço',
    descricao: 'Descrição detalhada',
    preco: 150.00,
    categoria: 'Categoria',
    id_prestador: 1
  })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Serviço criado com sucesso!');
    }
  })
  .catch(error => console.error('Erro:', error));
```

### Exemplo com Axios

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost/eng_prog3_2026_1/APISlim/public/api';

// Listar serviços
axios.get(`${API_BASE}/servicos`)
  .then(response => {
    console.log('Serviços:', response.data.data);
  })
  .catch(error => console.error('Erro:', error));

// Criar serviço
axios.post(`${API_BASE}/servicos`, {
  titulo: 'Novo Serviço',
  descricao: 'Descrição detalhada',
  preco: 150.00,
  categoria: 'Categoria',
  id_prestador: 1
})
  .then(response => {
    if (response.data.success) {
      console.log('Serviço criado!');
    }
  })
  .catch(error => console.error('Erro:', error));
```

## 🎓 Conceitos Ensinados

### Aula 1 - Fundamentos (09/06)
- [ ] Conceitos de API REST
- [ ] Métodos HTTP (GET, POST, PUT, DELETE)
- [ ] Códigos de status HTTP
- [ ] JSON como formato de dados

### Aula 2 - Desenvolvimento da API (16/06)
- [ ] Padrão MVC com Controllers
- [ ] Modelos e acesso a banco de dados
- [ ] Validação de dados
- [ ] Tratamento de erros
- [ ] Middleware CORS

### Aula 3 - Integração com React Native (23/06)
- [ ] Consumir API com Fetch/Axios
- [ ] Gerenciar estados com dados da API
- [ ] Tratamento de erros na mobile
- [ ] Loading states

### Aula 4 - Apresentação (30/06)
- [ ] Aplicação completa funcionando
- [ ] Documentação da API
- [ ] Boas práticas de código

## 📝 Boas Práticas

1. **Validação de Dados**: Sempre validar entrada do usuário
2. **Tratamento de Erros**: Retornar mensagens claras de erro
3. **Segurança**: Usar prepared statements para evitar SQL Injection
4. **Padrão de Resposta**: Manter um padrão consistente
5. **Documentação**: Comentar o código para os alunos aprender

## 🔐 Próximos Passos

Após este projeto base, os alunos podem aprender:

1. **Autenticação JWT** - Para proteger rotas
2. **Relacionamentos** - Tabelas com FK
3. **Paginação** - Listar muitos registros
4. **Upload de Arquivos** - Fotos/documentos
5. **Testes Unitários** - Garantir qualidade do código

## 📞 Suporte

Para dúvidas, consulte a [documentação do Slim Framework](https://www.slimframework.com/).

---

**Desenvolvido para fins educacionais - Turma Engenharia de Controle e Automação**
