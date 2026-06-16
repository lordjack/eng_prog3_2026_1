<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Prestador;

use App\Infrastructure\Persistence\AbstractRepository;

/**
 * PrestadorRepository
 * Repositório genérico para a tabela 'prestadores'
 * 
 * Herda TODAS as operações CRUD do AbstractRepository:
 * - findAll()
 * - findById()
 * - findBy()
 * - findOneBy()
 * - create()
 * - update()
 * - delete()
 * - search()
 * - count()
 */
class PrestadorRepository extends AbstractRepository
{
    /**
     * Definir o nome da tabela - SÓ ISSO é necessário!
     */
    protected string $tableName = 'prestadores';

    /**
     * Exemplo: Método customizado específico para Prestador
     * 
     * Buscar prestadores por especialidade
     * (se tivesse este campo na tabela)
     */
    public function findByEspecialidade(string $especialidade): ?array
    {
        // Usa o método genérico findBy herdado
        return $this->findBy('especialidade', $especialidade);
    }
}
