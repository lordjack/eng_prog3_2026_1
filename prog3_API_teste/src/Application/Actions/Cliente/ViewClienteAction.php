<?php

declare(strict_types=1);

namespace App\Application\Actions\Cliente;

use App\Application\Actions\Generic\GenericViewAction;

/**
 * ViewClienteAction
 * GET /clientes/{id}
 * Retorna um cliente específico pelo ID
 */
class ViewClienteAction extends GenericViewAction
{
    protected string $resourceName = 'cliente';
}
