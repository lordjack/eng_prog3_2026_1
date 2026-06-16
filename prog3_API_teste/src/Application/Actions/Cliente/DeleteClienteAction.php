<?php

declare(strict_types=1);

namespace App\Application\Actions\Cliente;

use App\Application\Actions\Generic\GenericDeleteAction;

/**
 * DeleteClienteAction
 * DELETE /clientes/{id}
 * Deleta um cliente (soft delete - marca como inativo)
 */
class DeleteClienteAction extends GenericDeleteAction
{
    protected string $resourceName = 'cliente';
}
