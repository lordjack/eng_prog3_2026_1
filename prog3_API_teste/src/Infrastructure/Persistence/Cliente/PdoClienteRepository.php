<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Cliente;

use App\Infrastructure\Persistence\AbstractRepository;

/**
 * ClienteRepository
 * Repositório para a tabela 'clientes'
 * 
 * Herda todas as operações CRUD do AbstractRepository
 * Pode ser estendido com métodos específicos da tabela
 */
class ClienteRepository extends AbstractRepository
{
    /**
     * Nome da tabela no banco de dados
     */
    protected string $tableName = 'clientes';

    /**
     * Exemplo de método específico do Cliente
     * Buscar clientes ativos
     * 
     * @return array
     */
    public function findActive(): array
    {
        $sql = "SELECT * FROM {$this->tableName} WHERE ativo = 1";
        return $this->execute($sql);
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
     * Buscar cliente por CPF
     * 
     * @param string $cpf
     * @return object|null
     */
    public function findByCpf(string $cpf): ?object
    {
        return $this->findOneBy('cpf', $cpf);
    }

    /**
     * Buscar cliente por CNPJ
     * 
     * @param string $cnpj
     * @return object|null
     */
    public function findByCnpj(string $cnpj): ?object
    {
        return $this->findOneBy('cnpj', $cnpj);
    }

    /**
     * Buscar cliente por email
     * 
     * @param string $email
     * @return object|null
     */
    public function findByEmail(string $email): ?object
    {
        return $this->findOneBy('email', $email);
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
