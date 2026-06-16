<?php

declare(strict_types=1);

namespace App\Application\Actions\Prestador;

use App\Application\Actions\Generic\GenericUpdateAction;

/**
 * UpdatePrestadorAction
 */
class UpdatePrestadorAction extends GenericUpdateAction
{
    protected string $resourceName = 'prestador';
    protected array $allowedFields = ['nmPrestador', 'nmContato', 'nmCPF', 'nmCNPJ'];
}
