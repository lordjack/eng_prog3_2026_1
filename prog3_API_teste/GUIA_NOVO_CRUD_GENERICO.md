# 🚀 Guia: Criar Novo CRUD Genericamente

Este guia mostra como criar um novo CRUD usando a arquitetura genérica simplificada.

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Passo 1: Criar Entidade (Opcional)](#passo-1-criar-entidade-opcional)
3. [Passo 2: Criar Interface do Repositório](#passo-2-criar-interface-do-repositório)
4. [Passo 3: Criar Implementação do Repositório](#passo-3-criar-implementação-do-repositório)
5. [Passo 4: Criar Actions Específicas](#passo-4-criar-actions-específicas)
6. [Passo 5: Registrar Dependências](#passo-5-registrar-dependências)
7. [Passo 6: Registrar Rotas](#passo-6-registrar-rotas)
8 [Exemplos Prontos](#exemplos-prontos)

---

## 👁️ Visão Geral

A arquitetura genérica oferece:

- **AbstractRepository** (base genérica)
  - `findAll()` - Listar todos
  - `findById(int)` - Buscar por ID
  - `findBy(field, value)` - Buscar por campo
  - `findOneBy(field, value)` - Buscar um por campo
  - `create(array)` - Criar
  - `update(int, array)` - Atualizar
  - `delete(int)` - Deletar
  - `search(fields[], value)` - Buscar com LIKE
  - `count()` - Contar registros

- **Actions Genéricas** (reutilizáveis)
  - `GenericListAction` - GET /recurso
  - `GenericViewAction` - GET /recurso/{id}
  - `GenericCreateAction` - POST /recurso
  - `GenericUpdateAction` - PUT /recurso/{id}
  - `GenericDeleteAction` - DELETE /recurso/{id}
  - `GenericSearchAction` - GET /recurso/search

---

## ⚡ Passo 1: Criar Entidade (Opcional)

Se precisar de uma entidade com lógica específica:

```php
<?php
// src/Domain/MeuRecurso/MeuRecurso.php

namespace App\Domain\MeuRecurso;

class MeuRecurso implements JsonSerializable
{
    private int $id;
    private string $nome;
    // ... campos específicos

    public function __construct(int $id, string $nome)
    {
        $this->id = $id;
        $this->nome = $nome;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
        ];
    }
}
```

**Mas pode ser simples mesmo!** Se não precisar de lógica, apenas use arrays/objetos simples.

---

## 🏗️ Passo 2: Criar Interface do Repositório

Arquivo: `src/Domain/MeuRecurso/MeuRecursoRepository.php`

```php
<?php
namespace App\Domain\MeuRecurso;

use App\Domain\Repositories\GenericRepositoryInterface;

/**
 * MeuRecursoRepository
 * Herda todos os métodos de GenericRepositoryInterface
 */
interface MeuRecursoRepository extends GenericRepositoryInterface
{
    // Adicionar métodos específicos se necessário
    // Exemplo:
    // public function findByStatus(string $status): ?array;
}
```

---

## 💾 Passo 3: Criar Implementação do Repositório

Arquivo: `src/Infrastructure/Persistence/MeuRecurso/MeuRecursoRepository.php`

```php
<?php
namespace App\Infrastructure\Persistence\MeuRecurso;

use App\Infrastructure\Persistence\AbstractRepository;

class MeuRecursoRepository extends AbstractRepository
{
    // SÓ ISSO é necessário!
    protected string $tableName = 'meu_recurso';

    // Métodos específicos opcionais
    public function findByStatus(string $status): ?array
    {
        return $this->findBy('status', $status);
    }
}
```

---

## 🎬 Passo 4: Criar Actions Específicas

### 4.1 - List Action

Arquivo: `src/Application/Actions/MeuRecurso/ListMeuRecursoAction.php`

```php
<?php
namespace App\Application\Actions\MeuRecurso;

use App\Application\Actions\Generic\GenericListAction;

class ListMeuRecursoAction extends GenericListAction
{
    protected string $resourceName = 'meu_recurso';
}
```

### 4.2 - View Action

Arquivo: `src/Application/Actions/MeuRecurso/ViewMeuRecursoAction.php`

```php
<?php
namespace App\Application\Actions\MeuRecurso;

use App\Application\Actions\Generic\GenericViewAction;

class ViewMeuRecursoAction extends GenericViewAction
{
    protected string $resourceName = 'meu_recurso';
}
```

### 4.3 - Create Action (com Validação Customizada)

Arquivo: `src/Application/Actions/MeuRecurso/CreateMeuRecursoAction.php`

```php
<?php
namespace App\Application\Actions\MeuRecurso;

use App\Application\Actions\Generic\GenericCreateAction;

class CreateMeuRecursoAction extends GenericCreateAction
{
    protected string $resourceName = 'meu_recurso';
    protected array $requiredFields = ['nome', 'email'];
    protected array $allowedFields = ['nome', 'email', 'telefone', 'status'];

    protected function validate(array $data): void
    {
        parent::validate($data); // Valida campos obrigatórios

        // Adicionar validações customizadas
        if (!filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Email inválido");
        }
    }
}
```

### 4.4 - Update, Delete e Search Actions

```php
<?php
// src/Application/Actions/MeuRecurso/UpdateMeuRecursoAction.php
use App\Application\Actions\Generic\GenericUpdateAction;

class UpdateMeuRecursoAction extends GenericUpdateAction
{
    protected string $resourceName = 'meu_recurso';
    protected array $allowedFields = ['nome', 'email', 'telefone'];
}

// src/Application/Actions/MeuRecurso/DeleteMeuRecursoAction.php
use App\Application\Actions\Generic\GenericDeleteAction;

class DeleteMeuRecursoAction extends GenericDeleteAction
{
    protected string $resourceName = 'meu_recurso';
}

// src/Application/Actions/MeuRecurso/SearchMeuRecursoAction.php
use App\Application\Actions\Generic\GenericSearchAction;

class SearchMeuRecursoAction extends GenericSearchAction
{
    protected string $resourceName = 'meu_recursos';
    protected array $searchableFields = ['nome', 'email', 'telefone'];
}
```

---

## 🔌 Passo 5: Registrar Dependências

Arquivo: `app/repositories.php`

```php
<?php
use App\Domain\MeuRecurso\MeuRecursoRepository;
use App\Infrastructure\Persistence\MeuRecurso\MeuRecursoRepository as MeuRecursoRepositoryImpl;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        // ... outros repositórios ...
        
        MeuRecursoRepository::class => \DI\autowire(MeuRecursoRepositoryImpl::class),
    ]);
};
```

---

## 🛣️ Passo 6: Registrar Rotas

Arquivo: `app/routes.php`

```php
<?php
use App\Application\Actions\MeuRecurso\{
    ListMeuRecursoAction,
    ViewMeuRecursoAction,
    CreateMeuRecursoAction,
    UpdateMeuRecursoAction,
    DeleteMeuRecursoAction,
    SearchMeuRecursoAction,
};

return function (App $app) {
    // ... outras rotas ...

    $app->group('/meu-recurso', function (Group $group) {
        $group->get('', ListMeuRecursoAction::class);
        $group->get('/search', SearchMeuRecursoAction::class);
        $group->get('/{id}', ViewMeuRecursoAction::class);
        $group->post('', CreateMeuRecursoAction::class);
        $group->put('/{id}', UpdateMeuRecursoAction::class);
        $group->delete('/{id}', DeleteMeuRecursoAction::class);
    });
};
```

---

## ✅ Exemplos Prontos

### Exemplo 1: Prestador (Genérico)

Estrutura mínima, todos os CRUDs prontos:

```
src/
├── Domain/Prestador/
│   └── PrestadorRepository.php           (Interface simples)
└── Infrastructure/Persistence/Prestador/
    └── PrestadorRepository.php            (Classe: só define tableName!)

src/Application/Actions/Prestador/
├── ListPrestadoresAction.php              (1 linha!)
├── ViewPrestadorAction.php                (1 linha!)
├── CreatePrestadorAction.php              (Com validação)
├── UpdatePrestadorAction.php              (1 linha!)
├── DeletePrestadorAction.php              (1 linha!)
└── SearchPrestadoresAction.php            (Com campos de busca)
```

**Arquivo `PrestadorRepository.php` inteiro:**
```php
<?php
namespace App\Infrastructure\Persistence\Prestador;
use App\Infrastructure\Persistence\AbstractRepository;

class PrestadorRepository extends AbstractRepository
{
    protected string $tableName = 'prestadores';
}
```

**Pronto! ✅**

### Exemplo 2: Cliente (Com Customizações)

```
src/Application/Actions/Cliente/
├── ListClientesAction.php
├── ViewClienteAction.php
├── CreateClienteAction.php                (Validação customizada)
├── UpdateClienteAction.php
├── DeleteClienteAction.php
└── SearchClientesAction.php               (Campos de busca: nome, email, cidade)
```

---

## 📊 Comparação: Antes vs Depois

### ❌ ANTES (Específico para Cliente)

```
ClienteRepository: 180 linhas de código (findAll, findById, create, update, delete, hydrate, etc)
ListClientesAction: 15 linhas
ViewClienteAction: 15 linhas
CreateClienteAction: 25 linhas
UpdateClienteAction: 35 linhas
DeleteClienteAction: 15 linhas
```

**TOTAL: ~280 linhas**

### ✅ DEPOIS (Genérico)

```
AbstractRepository: 200 linhas (compartilhado por todas as tabelas!)
ClienteRepository: 15 linhas (só herda!)
CreateClienteAction: 10 linhas (só herda!)
ListClientesAction: 5 linhas
```

**TOTAL por novo CRUD: ~30 linhas** (90% menos!)

---

## 🎓 Conceitos

### Interface GenericRepositoryInterface
- Define contrato CRUD genérico
- Implementado por AbstractRepository
- Todas as operações básicas

### AbstractRepository
- Implementação genérica usando PDO
- Métodos prepared statements seguro
- Métodos protected execute() para queries customizadas

### Actions Genéricas
- Reutilizáveis por qualquer tabela
- Extensíveis: sobrescrever `validate()` e `transform()`
- Logging automático

---

## 🔧 Customizações Comuns

### 1. Validação Customizada

```php
class CreateMeuRecursoAction extends GenericCreateAction
{
    protected function validate(array $data): void
    {
        parent::validate($data); // Validar obrigatórios
        
        // Sua validação aqui
        if ($data['idade'] < 18) {
            throw new \Exception("Deve ter 18 anos ou mais");
        }
    }
}
```

### 2. Filtrar Campos na Atualização

```php
class UpdateMeuRecursoAction extends GenericUpdateAction
{
    protected array $allowedFields = ['nome', 'email']; // Não permite alterar 'role'
}
```

### 3. Métodos Específicos no Repositório

```php
class MeuRecursoRepository extends AbstractRepository
{
    protected string $tableName = 'meu_recurso';

    // Método customizado
    public function findRecentos(): array
    {
        $sql = "SELECT * FROM {$this->tableName} ORDER BY created_at DESC LIMIT 10";
        return $this->execute($sql);
    }
}
```

### 4. Query Customizada

```php
protected function execute(string $sql, array $params = []): array
{
    try {
        $stmt = $this->connection->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    } catch (\PDOException $e) {
        throw new Exception("Erro: " . $e->getMessage());
    }
}
```

---

## 📝 Checklist: Criar Novo CRUD

```
☑ Criar tabela no MySQL (database/migrations.sql)
☑ Criar interface em src/Domain/
☑ Criar repositório em src/Infrastructure/Persistence/
  ☑ Estender AbstractRepository
  ☑ Definir $tableName
  ☑ Adicionar métodos específicos (findByXyz)
☑ Criar Actions em src/Application/Actions/
  ☑ Estender GenericListAction
  ☑ Estender GenericViewAction
  ☑ Estender GenericCreateAction (com validação se necessário)
  ☑ Estender GenericUpdateAction
  ☑ Estender GenericDeleteAction
  ☑ Estender GenericSearchAction
☑ Registrar repositório em app/repositories.php
☑ Registrar rotas em app/routes.php
☑ Testar com cURL ou Postman
```

---

## 🚀 Próximos Passos

1. **Copiar estrutura do Prestador** - Já pronto como exemplo
2. **Adicionar SQL para sua tabela** - Execute setup_database.php
3. **Criar Repositório** - Copiar template e trocar `tableName`
4. **Criar Actions** - Copiar e customizar conforme necessário
5. **Registrar e Testar** - Testar endpoints

---

**Ganho de Produtividade:**
- Novo CRUD simples: **5 minutos**
- Novo CRUD com validação: **15 minutos**
- Antes (código específico): **2-3 horas**

🎉 **Isso é arquitetura bem planejada!**
