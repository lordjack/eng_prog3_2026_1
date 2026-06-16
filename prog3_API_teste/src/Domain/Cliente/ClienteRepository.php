<?php

declare(strict_types=1);

namespace App\Domain\Cliente;

use App\Domain\Repositories\GenericRepositoryInterface;

/**
 * ClienteRepository
 * 
 * Herda todos os métodos de GenericRepositoryInterface:
 * - findAll(), findById(), findBy(), findOneBy()
 * - create(), update(), delete()
 * - search(), count()
 * 
 * Pode adicionar métodos específicos de Cliente se necessário
 */
interface ClienteRepository extends GenericRepositoryInterface
{
    // Métodos genéricos herdados de GenericRepositoryInterface
    // Adicionar métodos específicos de Cliente aqui se necessário
}
