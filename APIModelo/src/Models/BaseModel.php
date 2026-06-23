<?php

namespace App\Models;

use PDO;

/**
 * 🔵 Classe base com CRUD genérico
 * 
 * Todas as models herdam dela
 * Fornece: all(), findById(), create(), update(), delete(), count()
 */
class BaseModel
{

    protected $table;
    protected $pdo;

    /**
     * Construtor - conecta ao banco
     */
    public function __construct()
    {
        $this->pdo = Database::getInstance()->getPDO();
    }

    /**
     * 📖 Listar todos os registros
     */
    public function all()
    {
        $sql = "SELECT * FROM {$this->table}";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    /**
     * 🔍 Buscar por ID
     */
    public function findById($id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch();
    }

    /**
     * 🔍 Buscar por campo
     */
    public function findBy($campo, $valor)
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$campo} = :valor";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':valor' => $valor]);
        return $stmt->fetch();
    }

    /**
     * ✅ Criar novo registro
     */
    public function create($dados)
    {
        $campos = implode(', ', array_keys($dados));
        $placeholders = implode(', ', array_map(fn($k) => ":{$k}", array_keys($dados)));

        $sql = "INSERT INTO {$this->table} ({$campos}) VALUES ({$placeholders})";
        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute($dados);
    }

    /**
     * ✏️ Atualizar registro
     */
    public function update($id, $dados)
    {
        $set = implode(', ', array_map(fn($k) => "{$k} = :{$k}", array_keys($dados)));
        $dados[':id'] = $id;

        $sql = "UPDATE {$this->table} SET {$set} WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute($dados);
    }

    /**
     * 🗑️ Deletar registro
     */
    public function delete($id)
    {
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute([':id' => $id]);
    }

    /**
     * 📊 Contar registros
     */
    public function count()
    {
        $sql = "SELECT COUNT(*) as total FROM {$this->table}";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetch()['total'];
    }

    /**
     * 🔎 Buscar com LIKE
     */
    public function search($campo, $valor)
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$campo} LIKE :valor";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':valor' => "%{$valor}%"]);
        return $stmt->fetchAll();
    }
}
