<?php

namespace App\Models;

class Servico
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function getAll(): array
    {
        return $this->db
            ->query("SELECT * FROM servicos ORDER BY data_criacao DESC")
            ->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getById(int $id): array|false
    {
        $stmt = $this->db->prepare("SELECT * FROM servicos WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function getByPrestador(int $id_prestador): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM servicos WHERE id_prestador = :id ORDER BY data_criacao DESC"
        );
        $stmt->execute([':id' => $id_prestador]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            "INSERT INTO servicos (titulo, descricao, preco, categoria, id_prestador)
             VALUES (:titulo, :descricao, :preco, :categoria, :id_prestador)"
        );
        $stmt->execute([
            ':titulo'       => trim($data['titulo']),
            ':descricao'    => $data['descricao']    ?? '',
            ':preco'        => (float) $data['preco'],
            ':categoria'    => $data['categoria']    ?? '',
            ':id_prestador' => (int)   $data['id_prestador'],
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare(
            "UPDATE servicos
             SET titulo = :titulo, descricao = :descricao,
                 preco  = :preco,  categoria = :categoria
             WHERE id = :id"
        );
        return $stmt->execute([
            ':titulo'    => trim($data['titulo']),
            ':descricao' => $data['descricao'] ?? '',
            ':preco'     => (float) $data['preco'],
            ':categoria' => $data['categoria'] ?? '',
            ':id'        => $id,
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM servicos WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function validate(array $data): array
    {
        $errors = [];

        if (empty($data['titulo']) || strlen($data['titulo']) < 3) {
            $errors['titulo'] = 'O título deve ter no mínimo 3 caracteres';
        }
        if (empty($data['descricao']) || strlen($data['descricao']) < 10) {
            $errors['descricao'] = 'A descrição deve ter no mínimo 10 caracteres';
        }
        if (empty($data['preco']) || !is_numeric($data['preco']) || $data['preco'] <= 0) {
            $errors['preco'] = 'O preço deve ser um número positivo';
        }
        if (empty($data['categoria'])) {
            $errors['categoria'] = 'A categoria é obrigatória';
        }
        if (empty($data['id_prestador'])) {
            $errors['id_prestador'] = 'O prestador é obrigatório';
        }

        return $errors;
    }
}
