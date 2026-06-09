# 🚀 Quick Start - API Slim Framework

## ⚡ Setup Rápido (5 minutos)

### 1️⃣ Configurar Banco de Dados

**Abra o phpMyAdmin** (geralmente em `http://localhost/phpmyadmin`)

1. Selecione seu banco `trabalho`
2. Abra a aba "SQL"
3. Copie e cole o conteúdo de `setup.sql`
4. Execute (clique em "Executar" ou Ctrl+Enter)

Pronto! Tabelas e dados de exemplo criados.

### 2️⃣ Verificar Configuração

Edite `config/config.php` se necessário:

```php
define('DB_HOST', 'localhost');   // Geralmente localhost
define('DB_USER', 'root');         // root para Laragon
define('DB_PASS', '');             // Vazio para Laragon
define('DB_NAME', 'trabalho');     // Seu banco
```

### 3️⃣ Testar a API

Abra seu navegador e acesse:

```
http://localhost/eng_prog3_2026_1/APISlim/public/api/health
```

Você deveria ver algo como:

```json
{
  "status": "online",
  "message": "API está funcionando corretamente",
  "timestamp": "2026-06-08 14:30:45",
  "environment": "development"
}
```

✅ **Se viu isso, a API está pronta!**

### 4️⃣ Instalar Insomnia (ou Postman)

- [Baixar Insomnia](https://insomnia.rest/)
- Criar nova requisição
- GET para `http://localhost/eng_prog3_2026_1/APISlim/public/api/servicos`
- Ver a lista de serviços em JSON

---

## 📚 Próximos Passos

1. **Leia o README.md** - Documentação completa da API
2. **Leia o GUIA_INTEGRACAO.md** - Plano didático das aulas
3. **Explore os Controllers** - Veja como as rotas funcionam
4. **Teste na prática** - Use Insomnia para fazer requisições

---

## 🆘 Problemas?

| Problema | Solução |
|----------|---------|
| API não abre (404) | Verifique se `.htaccess` existe em `public/` |
| Erro de banco de dados | Execute `setup.sql` no phpMyAdmin |
| CORS Error | Adicione a origem em `config/config.php` |
| Dados não aparecem | Verifique se tabelas foram criadas em `setup.sql` |

---

## 📞 Estrutura do Projeto

```
APISlim/
├── public/
│   └── index.php              ← Ponto de entrada (URL principal)
├── src/
│   ├── Controllers/           ← Lógica das rotas
│   ├── Models/                ← Acesso ao banco
│   ├── Middlewares/           ← Processamento de requisições
│   └── Utils/                 ← Funções auxiliares
├── config/
│   └── config.php             ← Configurações (DB, ambiente, etc)
├── README.md                  ← Documentação completa
├── GUIA_INTEGRACAO.md         ← Plano das aulas
└── setup.sql                  ← Script para criar tabelas
```

---

**Tudo certo? Vamos começar a aula! 🎓**
