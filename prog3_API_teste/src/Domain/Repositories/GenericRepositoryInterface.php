<?php

declare(strict_types=1);

namespace App\Domain\Repositories;

/**
 * GenericRepositoryInterface
 * Interface genérica para operações CRUD
 * 
 * Todos os repositórios devem implementar esta interface
 * para manter consistência em toda a aplicação
 */
interface GenericRepositoryInterface
{
    /**
     * Retorna todos os registros da tabela
     *
     * @return array Array de objetos
     */
    public function findAll(): array;

    /**
     * Busca um registro por ID
     *
     * @param int $id
     * @return object|null Objeto encontrado ou null
     */
    public function findById(int $id): ?object;

    /**
     * Busca registros por um campo específico
     *
     * @param string $field Nome do campo
     * @param mixed $value Valor a buscar
     * @return array|null Array de objetos ou null
     */
    public function findBy(string $field, $value): ?array;

    /**
     * Busca um registro por um campo específico (retorna apenas um)
     *
     * @param string $field Nome do campo
     * @param mixed $value Valor a buscar
     * @return object|null Objeto encontrado ou null
     */
    public function findOneBy(string $field, $value): ?object;

    /**
     * Insere um novo registro
     *
     * @param array $data Array associativo [campo => valor]
     * @return int ID do registro inserido
     */
    public function create(array $data): int;

    /**
     * Atualiza um registro existente
     *
     * @param int $id ID do registro
     * @param array $data Array associativo [campo => valor]
     * @return bool Sucesso da operação
     */
    public function update(int $id, array $data): bool;

    /**
     * Deleta um registro
     *
     * @param int $id ID do registro
     * @return bool Sucesso da operação
     */
    public function delete(int $id): bool;

    /**
     * Busca por múltiplos campos usando LIKE (search)
     *
     * @param array $searchFields Array de campos para buscar [campo1, campo2, ...]
     * @param string $value Valor a buscar
     * @return array Array de resultados
     */
    public function search(array $searchFields, string $value): array;

    /**
     * Retorna o total de registros
     *
     * @return int Total de registros
     */
    public function count(): int;
}
