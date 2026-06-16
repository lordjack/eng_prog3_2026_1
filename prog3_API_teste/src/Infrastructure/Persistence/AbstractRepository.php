<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence;

use App\Domain\Repositories\GenericRepositoryInterface;
use PDO;
use Exception;

/**
 * AbstractRepository
 * Classe abstrata que implementa operações CRUD genéricas
 * 
 * Use: estender esta classe para criar repositórios específicos
 * 
 * Exemplo:
 *   class ClienteRepository extends AbstractRepository {
 *       protected string $tableName = 'clientes';
 *   }
 */
abstract class AbstractRepository implements GenericRepositoryInterface
{
    /**
     * Nome da tabela no banco de dados
     * DEVE ser sobrescrito pela classe filha
     */
    protected string $tableName;

    /**
     * Conexão PDO
     */
    protected PDO $connection;

    /**
     * Construtor
     *
     * @param PDO $connection Conexão PDO com o banco de dados
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;

        if (empty($this->tableName)) {
            throw new Exception("Propriedade tableName não foi definida em " . get_class($this));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        $sql = "SELECT * FROM {$this->tableName}";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * {@inheritdoc}
     */
    public function findById(int $id): ?object
    {
        $sql = "SELECT * FROM {$this->tableName} WHERE id = ? LIMIT 1";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$id]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? (object)$result : null;
    }

    /**
     * {@inheritdoc}
     */
    public function findBy(string $field, $value): ?array
    {
        $sql = "SELECT * FROM {$this->tableName} WHERE {$field} = ?";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$value]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return !empty($results) ? array_map(fn($row) => (object)$row, $results) : null;
    }

    /**
     * {@inheritdoc}
     */
    public function findOneBy(string $field, $value): ?object
    {
        $sql = "SELECT * FROM {$this->tableName} WHERE {$field} = ? LIMIT 1";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$value]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result ? (object)$result : null;
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data): int
    {
        // Construir lista de campos e marcadores
        $campos = implode(', ', array_keys($data));
        $marcadores = implode(', ', array_fill(0, count($data), '?'));

        $sql = "INSERT INTO {$this->tableName} ({$campos}) VALUES ({$marcadores})";

        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute(array_values($data));

            return (int)$this->connection->lastInsertId();
        } catch (\PDOException $e) {
            throw new Exception("Erro ao inserir em {$this->tableName}: " . $e->getMessage());
        }
    }

    /**
     * {@inheritdoc}
     */
    public function update(int $id, array $data): bool
    {
        if (empty($data)) {
            return false;
        }

        // Remover 'id' dos dados se estiver presente
        unset($data['id']);

        if (empty($data)) {
            return false;
        }

        // Construir SET clause: campo1 = ?, campo2 = ?, ...
        $setClause = implode(', ', array_map(fn($field) => "{$field} = ?", array_keys($data)));

        $sql = "UPDATE {$this->tableName} SET {$setClause} WHERE id = ?";

        try {
            $values = array_values($data);
            $values[] = $id;

            $stmt = $this->connection->prepare($sql);
            $result = $stmt->execute($values);

            return $result && $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            throw new Exception("Erro ao atualizar em {$this->tableName}: " . $e->getMessage());
        }
    }

    /**
     * {@inheritdoc}
     */
    public function delete(int $id): bool
    {
        $sql = "DELETE FROM {$this->tableName} WHERE id = ?";

        try {
            $stmt = $this->connection->prepare($sql);
            $result = $stmt->execute([$id]);

            return $result && $stmt->rowCount() > 0;
        } catch (\PDOException $e) {
            throw new Exception("Erro ao deletar em {$this->tableName}: " . $e->getMessage());
        }
    }

    /**
     * {@inheritdoc}
     */
    public function search(array $searchFields, string $value): array
    {
        if (empty($searchFields)) {
            return [];
        }

        // Construir WHERE com múltiplos campos usando OR e LIKE
        $whereConditions = implode(' OR ', array_map(fn($field) => "{$field} LIKE ?", $searchFields));
        $sql = "SELECT * FROM {$this->tableName} WHERE {$whereConditions}";

        try {
            // Preparar valores com % para LIKE
            $values = array_fill(0, count($searchFields), "%{$value}%");

            $stmt = $this->connection->prepare($sql);
            $stmt->execute($values);

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return array_map(fn($row) => (object)$row, $results);
        } catch (\PDOException $e) {
            throw new Exception("Erro ao buscar em {$this->tableName}: " . $e->getMessage());
        }
    }

    /**
     * {@inheritdoc}
     */
    public function count(): int
    {
        $sql = "SELECT COUNT(*) as total FROM {$this->tableName}";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return (int)($result['total'] ?? 0);
    }

    /**
     * Método auxiliar: Executar SQL customizado
     * 
     * @param string $sql SQL a executar
     * @param array $params Parâmetros
     * @return array Resultados
     */
    protected function execute(string $sql, array $params = []): array
    {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);

            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (\PDOException $e) {
            throw new Exception("Erro ao executar query: " . $e->getMessage());
        }
    }
}
