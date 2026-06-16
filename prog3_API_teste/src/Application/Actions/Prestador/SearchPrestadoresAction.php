<?php

declare(strict_types=1);

namespace App\Application\Actions\Prestador;

use App\Application\Actions\Generic\GenericSearchAction;

/**
 * SearchPrestadoresAction
 */
class SearchPrestadoresAction extends GenericSearchAction
{
    protected string $resourceName = 'prestadores';
    protected array $searchableFields = ['nmPrestador', 'nmContato', 'nmCPF', 'nmCNPJ'];
}
