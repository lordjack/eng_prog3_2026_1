<?php

declare(strict_types=1);

namespace App\Application\Actions\Cliente;

use App\Application\Actions\Generic\GenericListAction;

/**
 * ListClientesAction
 * GET /clientes
 * Retorna lista de todos os clientes
 */
class ListClientesAction extends GenericListAction
{
    protected string $resourceName = 'clientes';
}
