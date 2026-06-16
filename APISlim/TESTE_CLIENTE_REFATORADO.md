# 🧪 Teste Rápido - CRUD Cliente Refatorado

## 🚀 Começar o servidor

Abra um terminal na pasta `prog3_API_teste`:

```bash
cd c:\laragon\www\eng_prog3_2026_1\prog3_API_teste
php -S localhost:8000 -t public
```

Teste básico:
```bash
curl http://localhost:8000
```

Deve retornar JSON com lista de endpoints.

---

## 📋 Exemplos de Uso

### 1️⃣ **Listar todos os clientes**
```bash
curl -X GET http://localhost:8000/clientes
```

**Resposta esperada (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "11999999999",
    ...
  }
]
```

---

### 2️⃣ **Buscar um cliente específico**
```bash
curl -X GET http://localhost:8000/clientes/1
```

**Resposta esperada (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  ...
}
```

**Se não encontrar (404 Not Found):**
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Cliente não encontrado"
}
```

---

### 3️⃣ **Buscar clientes por termo**
```bash
# Busca por termo em qualquer campo searchable
curl -X GET "http://localhost:8000/clientes/search?q=silva"

# Busca em campos específicos
curl -X GET "http://localhost:8000/clientes/search?q=joao&fields=nome,endereco"

# Busca por email
curl -X GET "http://localhost:8000/clientes/search?q=joao@email.com&fields=email"
```

**Resposta esperada (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    ...
  }
]
```

---

### 4️⃣ **Criar novo cliente**
```bash
curl -X POST http://localhost:8000/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "email": "maria@email.com",
    "telefone": "11988888888",
    "endereco": "Rua A, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-100",
    "cpf": "12345678901",
    "tipo": "fisica"
  }'
```

**Resposta esperada (201 Created):**
```json
{
  "id": 5,
  "nome": "Maria Santos",
  "email": "maria@email.com",
  ...
}
```

**Se email inválido (400 Bad Request):**
```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Email inválido: mariainvalido"
}
```

**Se CPF inválido (400 Bad Request):**
```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "CPF deve ter 11 dígitos"
}
```

---

### 5️⃣ **Atualizar cliente**
```bash
curl -X PUT http://localhost:8000/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "11999999998",
    "endereco": "Rua B, 456"
  }'
```

**Resposta esperada (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999998",
  "endereco": "Rua B, 456",
  ...
}
```

---

### 6️⃣ **Deletar cliente**
```bash
curl -X DELETE http://localhost:8000/clientes/1
```

**Resposta esperada (204 No Content):**
- Sem corpo (apenas headers)

**Se não encontrar (404 Not Found):**
```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Cliente não encontrado"
}
```

---

## 🧬 Validações Implementadas

### Validação ao **CRIAR** cliente:
- ✅ `nome` obrigatório
- ✅ `email` obrigatório e validado (format)
- ✅ `cpf` opcional mas validado se fornecido (11 dígitos)
- ✅ `cnpj` opcional mas validado se fornecido (14 dígitos)
- ✅ `tipo` tem padrão 'fisica' se não fornecido

### Filtro de campos na **CRIAÇÃO/ATUALIZAÇÃO**:
- ✅ Apenas campos `allowedFields` são processados
- ✅ Protege contra mass assignment attacks
- ✅ Campos bloqueados automaticamente ignorados

---

## 📦 Teste com Postman (Opcional)

1. Abra Postman
2. Importe a coleção (se existir) ou crie manual:
   - GET `http://localhost:8000/clientes`
   - GET `http://localhost:8000/clientes/1`
   - POST `http://localhost:8000/clientes` (com JSON body)
   - PUT `http://localhost:8000/clientes/1` (com JSON body)
   - DELETE `http://localhost:8000/clientes/1`
   - GET `http://localhost:8000/clientes/search?q=termo`

---

## 🐛 Troubleshooting

### ❌ "404 Not Found" em qualquer rota
- ✅ Verifique se o servidor está rodando: `http://localhost:8000`
- ✅ Verifique a rota: `/clientes` vs `/clientes/`
- ✅ Verifique o método HTTP: GET, POST, PUT, DELETE

### ❌ "500 Internal Server Error"
- ✅ Verifique se o banco de dados está acessível
- ✅ Verifique as credenciais em `app/dependencies.php`
- ✅ Confira no `debug-logs` do VS Code

### ❌ JSON inválido no corpo da requisição
- ✅ Verifique aspas duplas: `"nome": "valor"`
- ✅ Verifique vírgulas entre campos
- ✅ Use `curl -X ... -d '{...}'` ou adicione `-H "Content-Type: application/json"`

---

## 🎉 Checklist de Validação

Ao rodar os testes, confirme:

- [ ] GET /clientes retorna 200 OK com array
- [ ] GET /clientes/{id} retorna 200 OK com objeto
- [ ] GET /clientes/search?q=termo retorna 200 OK com array
- [ ] POST /clientes com dados válidos retorna 201 Created
- [ ] POST /clientes com email inválido retorna 400 Bad Request
- [ ] PUT /clientes/{id} com dados válidos retorna 200 OK
- [ ] DELETE /clientes/{id} retorna 204 No Content
- [ ] GET /clientes/{id-nao-existe} retorna 404 Not Found

**Se todos passarem ✅:** Refatoração validada com sucesso!

---

## 📚 Documentação Relacionada

- `REFATORACAO_CLIENTE_CONCLUIDA.md` - Resumo da refatoração
- `EXEMPLOS_PRATICOS_API.md` - Exemplos mais completos
- `GUIA_NOVO_CRUD_GENERICO.md` - Como criar novo CRUD
- `COMECE_AQUI.md` - Guia geral de início
