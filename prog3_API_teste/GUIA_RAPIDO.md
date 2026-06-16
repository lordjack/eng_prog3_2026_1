# ⚡ Guia Rápido - Referência

## 🚀 Iniciar

```bash
cd prog3_API_teste
php -S localhost:8080 -t public
```

## 🧪 Testar

```bash
curl http://localhost:8080/clientes
```

## 📚 Documentação

1. **README.md** - Visão geral (5 min)
2. **IMPLEMENTACAO.md** - Como usar (15 min)
3. **PADROES.md** - Técnico (20 min)

## 🎯 Criar Novo CRUD

→ Ver **IMPLEMENTACAO.md** seção "Como Criar Novo CRUD em 15 Minutos"

## 📞 Erro?

- Porta 8080 ocupada? Use: `php -S localhost:8000 -t public`
- Banco não conecta? Verificar credenciais em `app/settings.php`
- Validação falhou? Verificar `src/Application/Actions/Cliente/CreateClienteAction.php`

---

**Status:** ✅ Production Ready  
**Testes:** 6/6 Aprovados  
**Código:** Simplificado
