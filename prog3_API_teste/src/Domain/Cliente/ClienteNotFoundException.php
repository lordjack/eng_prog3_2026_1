<?php

declare(strict_types=1);

namespace App\Domain\Cliente;

use App\Domain\DomainException\DomainRecordNotFoundException;

/**
 * Exceção: Cliente não encontrado
 */
class ClienteNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'Cliente não encontrado.';
}
