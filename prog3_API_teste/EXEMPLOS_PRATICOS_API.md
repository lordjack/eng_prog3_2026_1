# 🧪 Exemplos Práticos - Como Usar a API

---

## 📝 Listar Todos os Prestadores

### cURL

```bash
curl -X GET http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores \
  -H "Content-Type: application/json"
```

### JavaScript (Fetch)

```javascript
fetch('http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Python

```python
import requests

url = 'http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores'
response = requests.get(url)
print(response.json())
```

### Resposta (200 OK)

```json
[
  {
    "id": 1,
    "nmPrestador": "João Silva",
    "nmContato": "João",
    "nmCPF": "123.456.789-00",
    "nmCNPJ": null
  },
  {
    "id": 2,
    "nmPrestador": "Empresa XYZ Ltda",
    "nmContato": "Maria",
    "nmCPF": null,
    "nmCNPJ": "12.345.678/0001-90"
  }
]
```

---

## 👁️ Obter Um Prestador

### cURL

```bash
curl -X GET http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/1 \
  -H "Content-Type: application/json"
```

### JavaScript

```javascript
const id = 1;
fetch(`http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/${id}`)
  .then(res => res.json())
  .then(data => console.log(data));
```

### Resposta (200 OK)

```json
{
  "id": 1,
  "nmPrestador": "João Silva",
  "nmContato": "João",
  "nmCPF": "123.456.789-00",
  "nmCNPJ": null
}
```

### Erro (404 Not Found)

```json
{
  "error": "prestador não encontrado"
}
```

---

## ➕ Criar Novo Prestador

### cURL

```bash
curl -X POST http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores \
  -H "Content-Type: application/json" \
  -d '{
    "nmPrestador": "Pedro Eletricista",
    "nmContato": "Pedro",
    "nmCPF": "987.654.321-00"
  }'
```

### JavaScript

```javascript
const prestador = {
  nmPrestador: "Pedro Eletricista",
  nmContato: "Pedro",
  nmCPF: "987.654.321-00"
};

fetch('http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(prestador)
})
.then(res => res.json())
.then(data => console.log(data));
```

### Resposta (201 Created)

```json
{
  "id": 3,
  "nmPrestador": "Pedro Eletricista",
  "nmContato": "Pedro",
  "nmCPF": "987.654.321-00",
  "nmCNPJ": null
}
```

### Erro (400 Bad Request) - Campos Obrigatórios

```json
{
  "error": "Campo obrigatório ausente: nmPrestador"
}
```

---

## ✏️ Atualizar Prestador

### cURL

```bash
curl -X PUT http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nmPrestador": "João Silva - Atualizado",
    "nmContato": "João Silva"
  }'
```

### JavaScript

```javascript
const id = 1;
const updates = {
  nmPrestador: "João Silva - Atualizado",
  nmContato: "João Silva"
};

fetch(`http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updates)
})
.then(res => res.json())
.then(data => console.log(data));
```

### Resposta (200 OK)

```json
{
  "id": 1,
  "nmPrestador": "João Silva - Atualizado",
  "nmContato": "João Silva",
  "nmCPF": "123.456.789-00",
  "nmCNPJ": null
}
```

**Nota:** Não precisa enviar todos os campos, apenas os que vai atualizar!

---

## 🗑️ Deletar Prestador

### cURL

```bash
curl -X DELETE http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/3 \
  -H "Content-Type: application/json"
```

### JavaScript

```javascript
const id = 3;
fetch(`http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/${id}`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' }
})
.then(res => {
  if (res.status === 204) {
    console.log('Deletado com sucesso!');
  }
});
```

### Resposta (204 No Content)

```
(sem corpo na resposta)
```

---

## 🔍 Buscar Prestadores

### Busca Simples

```bash
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/search?q=joão" \
  -H "Content-Type: application/json"
```

### Busca em Campos Específicos

```bash
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/search?q=123&fields=nmCPF" \
  -H "Content-Type: application/json"
```

### Busca em Múltiplos Campos

```bash
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/search?q=silva&fields=nmPrestador,nmContato" \
  -H "Content-Type: application/json"
```

### JavaScript

```javascript
const searchTerm = "joão";
const fields = "nmPrestador,nmContato"; // opcional

const query = new URLSearchParams({
  q: searchTerm,
  fields: fields
});

fetch(`http://localhost/eng_prog3_2026_1/prog3_API_teste/public/prestadores/search?${query}`)
  .then(res => res.json())
  .then(data => console.log(data));
```

### Resposta (200 OK)

```json
[
  {
    "id": 1,
    "nmPrestador": "João Silva",
    "nmContato": "João",
    "nmCPF": "123.456.789-00",
    "nmCNPJ": null
  }
]
```

### Erro (400 Bad Request) - Sem parâmetro 'q'

```json
{
  "error": "Parâmetro 'q' (busca) é obrigatório"
}
```

---

## 📊 Status de Respostas HTTP

| Status | Significado | Caso de Uso |
|--------|------------|-----------|
| **200 OK** | Sucesso | GET (list/view), PUT (update) |
| **201 Created** | Criado com sucesso | POST (create) |
| **204 No Content** | Sucesso sem corpo | DELETE |
| **400 Bad Request** | Erro na requisição | Validação falhou |
| **404 Not Found** | Recurso não existe | GET/PUT/DELETE de ID inexistente |
| **500 Server Error** | Erro no servidor | Exceção não tratada |

---

## 🛠️ Ferramenta: Postman

### Importar Coleção

Arquivo: `EXEMPLO_POSTMAN.json` (criar conforme necessário)

### Variáveis

```
base_url: http://localhost/eng_prog3_2026_1/prog3_API_teste/public
```

### Requests Pré-configuradas

1. **[GET] Listar Prestadores**
   ```
   {{base_url}}/prestadores
   ```

2. **[GET] Obter Prestador**
   ```
   {{base_url}}/prestadores/1
   ```

3. **[POST] Criar Prestador**
   ```
   {{base_url}}/prestadores
   Body: {"nmPrestador": "Teste", "nmContato": "Teste"}
   ```

4. **[PUT] Atualizar Prestador**
   ```
   {{base_url}}/prestadores/1
   Body: {"nmPrestador": "Atualizado"}
   ```

5. **[DELETE] Deletar Prestador**
   ```
   {{base_url}}/prestadores/1
   ```

6. **[GET] Buscar Prestadores**
   ```
   {{base_url}}/prestadores/search?q=silva
   ```

---

## 🎯 Testar com Clientes

Mesmo padrão para `/clientes`:

```bash
# Listar
curl -X GET http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes

# Obter
curl -X GET http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/1

# Criar
curl -X POST http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste", "email": "teste@email.com"}'

# Atualizar
curl -X PUT http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste Atualizado"}'

# Deletar
curl -X DELETE http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/1

# Buscar
curl -X GET "http://localhost/eng_prog3_2026_1/prog3_API_teste/public/clientes/search?q=teste"
```

---

## ⚡ Dicas Importantes

### 1. Content-Type Sempre

```bash
-H "Content-Type: application/json"
```

### 2. Formato JSON

```bash
# ✅ CERTO
-d '{"nome": "teste", "email": "test@email.com"}'

# ❌ ERRADO
-d '{nome: teste, email: test@email.com}'
```

### 3. URL sem barra final

```bash
# ✅ CERTO
/prestadores
/prestadores/1

# ❌ EVITAR (pode gerar erro)
/prestadores/
/prestadores/1/
```

### 4. Parâmetros de Query

```bash
# ✅ CERTO
?q=valor
?q=valor&fields=campo1,campo2

# ❌ ERRADO
?q=
?q=valor&fields=
```

---

## 🔐 Segurança

### ✅ O que está protegido

- Prepared Statements (SQL Injection protegido)
- Validação de entrada (requiredFields)
- Tratamento de exceções
- Logging de operações

### ⚠️ O que adicionar (próximo)

- Autenticação (JWT)
- CORS (apenas domínios permitidos)
- Rate Limiting
- Sanitização de entrada

---

## 📚 Referência Rápida - Endpoints

```
Prestadores:
  GET    /prestadores                 → Listar todos
  GET    /prestadores/search?q=termo  → Buscar
  GET    /prestadores/{id}            → Obter um
  POST   /prestadores                 → Criar
  PUT    /prestadores/{id}            → Atualizar
  DELETE /prestadores/{id}            → Deletar

Clientes:
  GET    /clientes                    → Listar todos
  GET    /clientes/search?q=termo     → Buscar
  GET    /clientes/{id}               → Obter um
  POST   /clientes                    → Criar
  PUT    /clientes/{id}               → Atualizar
  DELETE /clientes/{id}               → Deletar
```

---

## 🎓 Exercícios Propostos

### Nível 1 - Básico

1. Listar todos os prestadores
2. Obter prestador ID 1
3. Contar quantos prestadores existem (usando Length)

### Nível 2 - Intermediário

1. Criar novo prestador
2. Atualizar nome do prestador criado
3. Buscar por nome
4. Deletar o prestador criado

### Nível 3 - Avançado

1. Criar rotina que cria 10 prestadores em loop
2. Buscar por CPF
3. Atualizar múltiplos campos
4. Implementar paginação com offset

### Nível 4 - Expert

1. Criar novo CRUD para tabela "Serviços"
2. Integrar com React/React Native
3. Adicionar autenticação JWT
4. Implementar cache

---

**Pronto para testar! 🚀**
