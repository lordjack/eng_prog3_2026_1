# Exemplos de Testes - Comandos cURL

Use estes comandos no terminal PowerShell para testar a API.

## 🔧 Configuração

Defina a URL base como variável:

```powershell
$API = "http://localhost/eng_prog3_2026_1/APISlim/public/api"
```

---

## ✅ Health Check

Verificar se a API está funcionando:

```powershell
curl "$API/health"
```

**Resposta esperada:**
```json
{
  "status": "online",
  "message": "API está funcionando corretamente",
  "timestamp": "2026-06-08 14:30:45",
  "environment": "development"
}
```

---

## 📖 Listar Serviços

Obter todos os serviços cadastrados:

```powershell
curl "$API/servicos"
```

**ou com prettier:**

```powershell
curl "$API/servicos" | ConvertFrom-Json | ConvertTo-Json
```

---

## 🔍 Obter um Serviço Específico

Buscar serviço com ID 1:

```powershell
curl "$API/servicos/1"
```

---

## ➕ Criar um Novo Serviço

```powershell
$body = @{
    titulo = "Serviço de Limpeza"
    descricao = "Limpeza profissional de residências e comércios"
    preco = 180.00
    categoria = "Limpeza"
    id_prestador = 2
} | ConvertTo-Json

curl -X POST "$API/servicos" `
     -H "Content-Type: application/json" `
     -Body $body
```

**Resposta esperada:**
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

---

## ✏️ Atualizar um Serviço

Atualizar serviço com ID 1:

```powershell
$body = @{
    titulo = "Conserto de Notebook - Atualizado"
    descricao = "Conserto rápido com garantia"
    preco = 200.00
    categoria = "Eletrônicos"
} | ConvertTo-Json

curl -X PUT "$API/servicos/1" `
     -H "Content-Type: application/json" `
     -Body $body
```

---

## 🗑️ Deletar um Serviço

Deletar serviço com ID 1:

```powershell
curl -X DELETE "$API/servicos/1"
```

---

## 🧪 Script Completo de Teste

Salve como `test-api.ps1` e execute:

```powershell
# Script de teste completo da API

$API = "http://localhost/eng_prog3_2026_1/APISlim/public/api"

Write-Host "=== Testando API Slim ===" -ForegroundColor Green

# 1. Health Check
Write-Host "`n1. Health Check..." -ForegroundColor Yellow
curl "$API/health" | ConvertFrom-Json | ConvertTo-Json

# 2. Listar serviços
Write-Host "`n2. Listando serviços..." -ForegroundColor Yellow
curl "$API/servicos" | ConvertFrom-Json | ConvertTo-Json

# 3. Obter serviço específico
Write-Host "`n3. Obtendo serviço #1..." -ForegroundColor Yellow
curl "$API/servicos/1" | ConvertFrom-Json | ConvertTo-Json

# 4. Criar novo serviço
Write-Host "`n4. Criando novo serviço..." -ForegroundColor Yellow
$body = @{
    titulo = "Serviço de Teste"
    descricao = "Este é um serviço de teste da API"
    preco = 99.99
    categoria = "Teste"
    id_prestador = 1
} | ConvertTo-Json

curl -X POST "$API/servicos" `
     -H "Content-Type: application/json" `
     -Body $body | ConvertFrom-Json | ConvertTo-Json

# 5. Atualizar serviço
Write-Host "`n5. Atualizando serviço #1..." -ForegroundColor Yellow
$updateBody = @{
    titulo = "Conserto de Notebook - Editado"
    descricao = "Novo preço e descrição"
    preco = 175.00
    categoria = "Eletrônicos"
} | ConvertTo-Json

curl -X PUT "$API/servicos/1" `
     -H "Content-Type: application/json" `
     -Body $updateBody | ConvertFrom-Json | ConvertTo-Json

# 6. Deletar serviço (comentado para não deletar dados reais)
# Write-Host "`n6. Deletando serviço #5..." -ForegroundColor Yellow
# curl -X DELETE "$API/servicos/5" | ConvertFrom-Json | ConvertTo-Json

Write-Host "`n=== Testes Completos ===" -ForegroundColor Green
```

---

## 📋 Tabela de Endpoints

| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| GET | `/api/health` | Verificar status | - |
| GET | `/api/servicos` | Listar todos | - |
| GET | `/api/servicos/{id}` | Obter um | - |
| POST | `/api/servicos` | Criar novo | JSON |
| PUT | `/api/servicos/{id}` | Atualizar | JSON |
| DELETE | `/api/servicos/{id}` | Deletar | - |

---

## ⚠️ Códigos de Resposta

| Código | Significado | Exemplo |
|--------|-------------|---------|
| 200 | OK - Sucesso | GET, PUT, DELETE |
| 201 | Created - Criado | POST com sucesso |
| 400 | Bad Request - Erro | Dados inválidos |
| 404 | Not Found - Não encontrado | ID não existe |
| 422 | Unprocessable - Validação | Erro de validação |
| 500 | Server Error - Erro interno | Erro no servidor |

---

## 🔐 Testando Validação

Tentar criar serviço sem dados obrigatórios:

```powershell
$body = @{
    titulo = ""  # Vazio - vai dar erro
} | ConvertTo-Json

curl -X POST "$API/servicos" `
     -H "Content-Type: application/json" `
     -Body $body
```

**Resposta esperada (422):**
```json
{
  "success": false,
  "statusCode": 422,
  "message": "Erro de validação",
  "errors": {
    "titulo": "O título deve ter no mínimo 3 caracteres",
    "descricao": "A descrição é obrigatória",
    "preco": "O preço deve ser um número positivo",
    "categoria": "A categoria é obrigatória",
    "id_prestador": "O prestador é obrigatório"
  }
}
```

---

## 💡 Dicas

1. **Copie e Cole**: Copie os comandos acima e execute no PowerShell
2. **Variáveis**: Use `$API` para não repetir a URL
3. **JSON Bonito**: Pipe com `| ConvertFrom-Json | ConvertTo-Json` para ler melhor
4. **Insomnia**: Para interface gráfica, use Insomnia (mais fácil que PowerShell)
5. **Debug**: Se algo não funciona, verifique:
   - A URL está correta?
   - O método HTTP está correto?
   - O JSON está bem formatado?
   - A API está rodando?

---

**Happy Testing! 🚀**
