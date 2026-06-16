<?php

declare(strict_types=1);

namespace App\Application\Actions\Prestador;

use App\Application\Actions\Generic\GenericDeleteAction;

/**
 * DeletePrestadorAction
 */
class DeletePrestadorAction extends GenericDeleteAction
{
    protected string $resourceName = 'prestador';
}
