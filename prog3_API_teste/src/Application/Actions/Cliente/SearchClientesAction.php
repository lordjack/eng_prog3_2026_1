<?php

declare(strict_types=1);

namespace App\Application\Actions\Cliente;

use App\Application\Actions\Generic\GenericSearchAction;

/**
 * SearchClientesAction
 * GET /clientes/search?q=termo&fields=campo1,campo2
 * Busca clientes por campos específicos
 * 
 * Exemplo:
 *   GET /clientes/search?q=joão
 *   GET /clientes/search?q=silva&fields=nome,endereco
 *   GET /clientes/search?q=test@email&fields=email
 */
class SearchClientesAction extends GenericSearchAction
{
    protected string $resourceName = 'clientes';
    protected array $searchableFields = ['nome', 'email', 'telefone', 'endereco', 'cidade', 'estado', 'cpf', 'cnpj'];
}
