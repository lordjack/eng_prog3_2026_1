# 📖 IMPLEMENTAÇÃO - Como Usar e Estender

## 🏃 Como Usar a API

### Servidor
```bash
cd prog3_API_teste
php -S localhost:8080 -t public
```

### Endpoints Disponíveis

```
GET    /clientes              Listar todos
GET    /clientes/{id}         Obter um
GET    /clientes/search?q=x   Buscar
POST   /clientes              Criar
PUT    /clientes/{id}         Atualizar
DELETE /clientes/{id}         Deletar
```

### Exemplos Práticos

**Criar Cliente**
```bash
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua X, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-100",
    "cpf": "12345678901",
    "tipo": "fisica"
  }'
```

**Atualizar Cliente**
```bash
curl -X PUT http://localhost:8080/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "telefone": "(11) 88888-8888"
  }'
```

---

## 🔄 Como Criar Novo CRUD em 15 Minutos

### Passo 1: Criar Repository

`src/Infrastructure/Persistence/Prestador/PrestadorRepository.php`
```php
<?php
namespace App\Infrastructure\Persistence\Prestador;

use App\Infrastructure\Persistence\AbstractRepository;

class PrestadorRepository extends AbstractRepository {
    protected string $tableName = 'prestadores';
}
```

### Passo 2: Criar Domain Interface

`src/Domain/Prestador/PrestadorRepository.php`
```php
<?php
namespace App\Domain\Prestador;

use App\Domain\Repositories\GenericRepositoryInterface;

interface PrestadorRepository extends GenericRepositoryInterface {}
```

### Passo 3: Criar 6 Actions

Crie em `src/Application/Actions/Prestador/`:

**ListPrestadoresAction.php**
```php
<?php
namespace App\Application\Actions\Prestador;

use App\Application\Actions\Generic\GenericListAction;

class ListPrestadoresAction extends GenericListAction {
    protected string $resourceName = 'prestadores';
}
```

**ViewPrestadorAction.php** - Similar a ListPrestadoresAction  
**SearchPrestadoresAction.php** - Similar com searchableFields  
**CreatePrestadorAction.php** - Com validações específicas  
**UpdatePrestadorAction.php** - Com campos permitidos  
**DeletePrestadorAction.php** - Simples  

### Passo 4: Registrar DI

Em `app/dependencies.php`:
```php
\App\Infrastructure\Persistence\Prestador\PrestadorRepository::class => 
    \DI\autowire(\App\Infrastructure\Persistence\Prestador\PrestadorRepository::class),

\App\Application\Actions\Prestador\ListPrestadoresAction::class => 
    \DI\factory(function (ContainerInterface $c) {
        return new \App\Application\Actions\Prestador\ListPrestadoresAction(
            $c->get(LoggerInterface::class),
            $c->get(\App\Domain\Prestador\PrestadorRepository::class)
        );
    }),
// ... repetir para os outros 5 actions
```

### Passo 5: Adicionar Rotas

Em `app/routes.php`:
```php
$app->group('/prestadores', function (RouteCollectorProxy $group) {
    $group->get('', ListPrestadoresAction::class);
    $group->get('/search', SearchPrestadoresAction::class);
    $group->get('/{id}', ViewPrestadorAction::class);
    $group->post('', CreatePrestadorAction::class);
    $group->put('/{id}', UpdatePrestadorAction::class);
    $group->delete('/{id}', DeletePrestadorAction::class);
});
```

### Passo 6: Testar

```bash
curl http://localhost:8080/prestadores
```

**Pronto!** 🎉 Novo CRUD em 15 minutos com 70 linhas de código.

---

## 🔒 Validações Implementadas

**CreateClienteAction:**
```php
protected array $requiredFields = ['nome', 'email'];
protected array $allowedFields = [
    'nome', 'email', 'telefone', 'endereco', 
    'cidade', 'estado', 'cep', 'cpf', 'cnpj', 'tipo'
];

public function validate(array $data): void {
    // Email validado com filter_var
    // CPF validado (11 dígitos)
    // CNPJ validado (14 dígitos)
}
```

---

## 🛡️ Segurança

✅ **Prepared Statements** - PDO com parâmetros nomeados  
✅ **Validação de Entrada** - Email, CPF, CNPJ  
✅ **Filtro de Campos** - allowedFields previne mass assignment  
✅ **HTTP Status Codes** - 200, 201, 204, 400, 404, 500  
✅ **Exception Handling** - Try/catch com logging  

---

## 📊 Estrutura de Diretórios

```
src/
├── Domain/              (Interfaces)
│   ├── Cliente/
│   │   └── ClienteRepository.php
│   ├── Prestador/
│   │   └── PrestadorRepository.php
│   └── Repositories/
│       └── GenericRepositoryInterface.php
│
├── Infrastructure/      (Implementação)
│   └── Persistence/
│       ├── AbstractRepository.php  (170 linhas - Base)
│       ├── Cliente/
│       │   └── ClienteRepository.php
│       └── Prestador/
│           └── PrestadorRepository.php
│
└── Application/         (Lógica)
    └── Actions/
        ├── Generic/     (6 base classes)
        ├── Cliente/     (6 actions específicas)
        └── Prestador/   (6 actions específicas)

app/
├── dependencies.php     (DI Container)
├── repositories.php     (Mapeamento interfaces)
├── routes.php           (Rotas da API)
└── settings.php         (Configurações)
```

---

## 🚀 Próximos Passos

1. **Paginação** - Editar `GenericListAction` para LIMIT/OFFSET
2. **Autenticação JWT** - Middleware em `app/middleware.php`
3. **Filtros Avançados** - WHERE dinâmicos na `AbstractRepository`
4. **Cache** - Redis para queries frequentes

---

**Tempo de implementação:** 15-30 min por novo CRUD  
**Reutilização:** 83% (6 Generic classes + AbstractRepository)
