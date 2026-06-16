<?php

declare(strict_types=1);

namespace App\Application\Actions\Prestador;

use App\Application\Actions\Generic\GenericListAction;

/**
 * ListPrestadoresAction
 * 
 * Usa a Action genérica sem modificações
 * Pode adicionar lógica específica se necessário
 */
class ListPrestadoresAction extends GenericListAction
{
    protected string $resourceName = 'prestadores';
}
