# Exemplos de Teste com cURL - CRUD de Clientes

## 🔗 URL Base

```
http://localhost/eng_prog3_2026_1/prog3_API_teste/public
```

## 📝 Exemplos de cURL

### 1. Listar Todos os Clientes

```bash
# GET /clientes
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes" \
  -H "Content-Type: application/json"
```

**Resposta esperada (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    ...
  }
]
```

---

### 2. Obter Cliente Específico (ID 1)

```bash
# GET /clientes/1
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/1" \
  -H "Content-Type: application/json"
```

**Resposta esperada (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "(11) 99999-1234",
  "endereco": "Rua das Flores, 123",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01310-100",
  "cpf": "123.456.789-00",
  "cnpj": null,
  "tipo": "fisica",
  "ativo": true,
  "created_at": "2026-06-15 10:30:00",
  "updated_at": "2026-06-15 10:30:00"
}
```

---

### 3. Obter Cliente Inexistente (Erro 404)

```bash
# GET /clientes/9999 (não existe)
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/9999" \
  -H "Content-Type: application/json"
```

**Resposta esperada (404 Not Found):**
```json
{
  "statusCode": 404,
  "error": {
    "type": "HttpNotFoundException",
    "description": "Cliente não encontrado."
  }
}
```

---

### 4. Criar Novo Cliente (Pessoa Física)

```bash
# POST /clientes
curl -X POST "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Oliveira",
    "email": "pedro.oliveira@email.com",
    "telefone": "(31) 99999-8888",
    "endereco": "Rua XV de Novembro, 999",
    "cidade": "Belo Horizonte",
    "estado": "MG",
    "cep": "30140-071",
    "cpf": "111.222.333-44",
    "tipo": "fisica"
  }'
```

**Resposta esperada (201 Created):**
```json
{
  "id": 4,
  "nome": "Pedro Oliveira",
  "email": "pedro.oliveira@email.com",
  "telefone": "(31) 99999-8888",
  "endereco": "Rua XV de Novembro, 999",
  "cidade": "Belo Horizonte",
  "estado": "MG",
  "cep": "30140-071",
  "cpf": "111.222.333-44",
  "cnpj": null,
  "tipo": "fisica",
  "ativo": true,
  "created_at": "2026-06-15 11:15:00",
  "updated_at": "2026-06-15 11:15:00"
}
```

---

### 5. Criar Novo Cliente (Pessoa Jurídica)

```bash
# POST /clientes
curl -X POST "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Tech Solutions LTDA",
    "email": "contato@techsolutions.com.br",
    "telefone": "(85) 3333-4444",
    "endereco": "Avenida Getúlio Vargas, 5000",
    "cidade": "Fortaleza",
    "estado": "CE",
    "cep": "60115-160",
    "cnpj": "12.345.678/0001-90",
    "tipo": "juridica"
  }'
```

**Resposta esperada (201 Created):**
```json
{
  "id": 5,
  "nome": "Tech Solutions LTDA",
  "email": "contato@techsolutions.com.br",
  "telefone": "(85) 3333-4444",
  "endereco": "Avenida Getúlio Vargas, 5000",
  "cidade": "Fortaleza",
  "estado": "CE",
  "cep": "60115-160",
  "cpf": null,
  "cnpj": "12.345.678/0001-90",
  "tipo": "juridica",
  "ativo": true,
  "created_at": "2026-06-15 11:20:00",
  "updated_at": "2026-06-15 11:20:00"
}
```

---

### 6. Criar Cliente Sem Nome (Erro 400)

```bash
# POST /clientes - ERRO: faltam campos obrigatórios
curl -X POST "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes" \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "(11) 99999-1234"
  }'
```

**Resposta esperada (400 Bad Request):**
```json
{
  "statusCode": 400,
  "error": {
    "type": "HttpBadRequestException",
    "description": "Nome e email são obrigatórios"
  }
}
```

---

### 7. Atualizar Cliente (Dados Parciais)

```bash
# PUT /clientes/1
curl -X PUT "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/1" \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "(11) 98888-7777",
    "endereco": "Rua Nova, 456"
  }'
```

**Resposta esperada (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "(11) 98888-7777",
  "endereco": "Rua Nova, 456",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01310-100",
  "cpf": "123.456.789-00",
  "cnpj": null,
  "tipo": "fisica",
  "ativo": true,
  "created_at": "2026-06-15 10:30:00",
  "updated_at": "2026-06-15 12:00:00"
}
```

---

### 8. Atualizar Email do Cliente

```bash
# PUT /clientes/2
curl -X PUT "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/2" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria.santos.nova@email.com"
  }'
```

**Resposta esperada (200 OK):**
```json
{
  "id": 2,
  "nome": "Maria Santos",
  "email": "maria.santos.nova@email.com",
  ...
}
```

---

### 9. Desativar Cliente

```bash
# PUT /clientes/3 - Apenas desativar
curl -X PUT "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/3" \
  -H "Content-Type: application/json" \
  -d '{
    "ativo": false
  }'
```

**Resposta esperada (200 OK):**
```json
{
  "id": 3,
  "nome": "Empresa XYZ LTDA",
  "email": "contato@empresaxyz.com",
  ...
  "ativo": false,
  "updated_at": "2026-06-15 12:05:00"
}
```

---

### 10. Deletar Cliente (Soft Delete)

```bash
# DELETE /clientes/3
curl -X DELETE "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/3" \
  -H "Content-Type: application/json"
```

**Resposta esperada (204 No Content):**
```
(sem corpo)
```

**Verificação:**
```bash
# O cliente ainda existe no banco, mas está inativo
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/3"
# Retorna 404 porque findAll() filtra apenas ativos (WHERE ativo = TRUE)
```

---

## 🧪 Scripts de Teste Completo

### Testar Fluxo Completo

```bash
#!/bin/bash
# script_teste_completo.sh

BASE_URL="http://localhost/eng_prog3_2026_1/prog3_API_teste/public"

echo "=== 1. Listar clientes iniciais ==="
curl -s -X GET "$BASE_URL/clientes" | jq '.'

echo "\n=== 2. Criar novo cliente ==="
NOVO_CLIENTE=$(curl -s -X POST "$BASE_URL/clientes" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste CLI",
    "email": "teste.cli@email.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua do Teste",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-100",
    "cpf": "999.999.999-99",
    "tipo": "fisica"
  }')

echo "$NOVO_CLIENTE" | jq '.'

# Extrair ID do novo cliente
ID=$(echo "$NOVO_CLIENTE" | jq '.id')
echo "\nID do novo cliente: $ID"

echo "\n=== 3. Buscar cliente criado ==="
curl -s -X GET "$BASE_URL/clientes/$ID" | jq '.'

echo "\n=== 4. Atualizar cliente ==="
curl -s -X PUT "$BASE_URL/clientes/$ID" \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "(11) 88888-8888"
  }' | jq '.'

echo "\n=== 5. Deletar cliente ==="
curl -s -X DELETE "$BASE_URL/clientes/$ID" \
  -H "Content-Type: application/json"

echo "\n=== 6. Tentar buscar cliente deletado ==="
curl -s -X GET "$BASE_URL/clientes/$ID" | jq '.'

echo "\n=== Teste completo finalizado ==="
```

### Usando Postman/Insomnia

1. **Criar Collection**
   - Importar: [EXEMPLOS_CURL.md](EXEMPLOS_CURL.md)
   - Ou criar manualmente:
     - GET /clientes
     - GET /clientes/1
     - POST /clientes
     - PUT /clientes/1
     - DELETE /clientes/1

2. **Usar Variáveis de Ambiente**
   ```json
   {
     "base_url": "http://localhost/eng_prog3_2026_1/prog3_API_teste/public",
     "cliente_id": "1"
   }
   ```

3. **Testar com Pre-scripts e Tests**

---

## 💻 Teste via Terminal PowerShell

```powershell
# PowerShell - Listar clientes
$BASE_URL = "http://localhost/eng_prog3_2026_1/prog3_API_teste/public"

# GET
Invoke-WebRequest -Uri "$BASE_URL/clientes" -Method GET `
  -Headers @{"Content-Type"="application/json"} | ConvertTo-Json

# POST
$body = @{
    nome = "PowerShell Cliente"
    email = "powershell@email.com"
    telefone = "(11) 99999-1234"
    tipo = "fisica"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "$BASE_URL/clientes" -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body

$response.Content | ConvertFrom-Json
```

---

## 🔍 Monitorar Banco de Dados

### Em phpMyAdmin

```sql
-- Ver todos os clientes
SELECT * FROM clientes;

-- Ver apenas ativos
SELECT * FROM clientes WHERE ativo = TRUE;

-- Contar clientes por tipo
SELECT tipo, COUNT(*) FROM clientes GROUP BY tipo;

-- Ver logs de atualização
SELECT id, nome, updated_at FROM clientes ORDER BY updated_at DESC;
```

### Em MySQL Client

```bash
mysql -u root -p db_prog3_eng_2026_1
> SELECT * FROM clientes;
> DESCRIBE clientes;
```

---

## 🚀 Dicas de Desenvolvimento

### 1. Usar jq para Formatação

```bash
# Instalar jq (Windows: https://stedolan.github.io/jq/download/)
curl ... | jq '.'
curl ... | jq '.[] | {id, nome, email}'
```

### 2. Salvar Response em Arquivo

```bash
curl ... -o response.json
cat response.json | jq '.'
```

### 3. Medir Tempo de Resposta

```bash
curl -X GET "..." -w "\nTempo total: %{time_total}s\n"
```

### 4. Debug com Verbose

```bash
curl -X POST "..." -v  # Mostra headers e corpo completos
```

### 5. Usar Alias no .bashrc

```bash
alias curl_clientes='curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes"'

# Usar: curl_clientes | jq '.'
```

---

## 📊 Casos de Teste

### ✅ Testes Positivos

- [x] Listar todos os clientes (200)
- [x] Obter cliente existente (200)
- [x] Criar cliente válido (201)
- [x] Atualizar cliente existente (200)
- [x] Deletar cliente existente (204)

### ❌ Testes Negativos

- [x] Obter cliente inexistente (404)
- [x] Criar sem nome/email (400)
- [x] Email duplicado (409)
- [x] CPF duplicado (409)
- [x] Atualizar cliente inexistente (404)
- [x] Deletar cliente inexistente (404)

---

**Última atualização**: 2026-06-15  
**Versão da API**: 1.0
