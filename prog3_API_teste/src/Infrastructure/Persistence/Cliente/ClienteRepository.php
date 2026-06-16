<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Cliente;

use App\Infrastructure\Persistence\AbstractRepository;

/**
 * ClienteRepository
 * 
 * Repositório para a tabela 'clientes'
 * Herda TODOS os métodos CRUD de AbstractRepository:
 * - findAll(), findById(), findBy(), findOneBy()
 * - create(), update(), delete()
 * - search(), count()
 * 
 * Este repositório adiciona métodos específicos para Cliente
 */
class ClienteRepository extends AbstractRepository
{
    /**
     * Define a tabela gerenciada por este repositório
     */
    protected string $tableName = 'clientes';

    /**
     * Buscar clientes ativos
     * 
     * @return array|null Array com clientes onde ativo=1
     */
    public function findAtivos(): ?array
    {
        return $this->findBy('ativo', 1);
    }

    /**
     * Buscar cliente por email
     * 
     * @param string $email
     * @return array|null Primeiro cliente encontrado ou null
     */
    public function findByEmail(string $email): ?array
    {
        return $this->findOneBy('email', $email);
    }

    /**
     * Buscar cliente por CPF
     * 
     * @param string $cpf
     * @return array|null
     */
    public function findByCpf(string $cpf): ?array
    {
        return $this->findOneBy('cpf', $cpf);
    }

    /**
     * Buscar clientes por tipo (física ou jurídica)
     * 
     * @param string $tipo 'fisica' ou 'juridica'
     * @return array|null
     */
    public function findByTipo(string $tipo): ?array
    {
        return $this->findBy('tipo', $tipo);
    }

    /**
     * Buscar clientes por cidade
     * 
     * @param string $cidade
     * @return array|null
     */
    public function findByCidade(string $cidade): ?array
    {
        return $this->findBy('cidade', $cidade);
    }
}
