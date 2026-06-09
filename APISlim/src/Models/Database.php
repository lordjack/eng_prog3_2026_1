<?php

namespace App\Models;

use PDO;
use PDOException;

/**
 * Classe para gerenciar conexão com banco de dados
 * 
 * Esta classe implementa o padrão Singleton para garantir
 * apenas uma conexão com o banco de dados.
 * 
 * Uso:
 * $db = Database::getInstance();
 * $stmt = $db->prepare("SELECT * FROM servicos WHERE id = ?");
 */
class Database
{
    private static $instance = null;
    private $connection;

    /**
     * Construtor privado - impede instanciação direta
     */
    private function __construct()
    {
        try {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
            $this->connection = new PDO($dsn, DB_USER, DB_PASS);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            if (DEBUG) {
                die("✗ Erro ao conectar ao banco de dados: " . $e->getMessage());
            }
            throw $e;
        }
    }

    /**
     * Obtém a instância única da conexão
     * 
     * @return Database
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Obtém a conexão PDO
     * 
     * @return PDO
     */
    public function getConnection()
    {
        return $this->connection;
    }

    /**
     * Prepara uma consulta SQL
     * 
     * @param string $sql
     * @return \PDOStatement
     */
    public function prepare($sql)
    {
        return $this->connection->prepare($sql);
    }

    /**
     * Executa uma consulta e retorna o resultado
     * 
     * @param string $sql
     * @param array $params
     * @return mixed
     */
    public function execute($sql, $params = [])
    {
        $stmt = $this->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    /**
     * Obtém um registro
     * 
     * @param string $sql
     * @param array $params
     * @return array|null
     */
    public function fetch($sql, $params = [])
    {
        $stmt = $this->execute($sql, $params);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Obtém vários registros
     * 
     * @param string $sql
     * @param array $params
     * @return array
     */
    public function fetchAll($sql, $params = [])
    {
        $stmt = $this->execute($sql, $params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Obtém ID da última inserção
     * 
     * @return string
     */
    public function lastInsertId()
    {
        return $this->connection->lastInsertId();
    }

    /**
     * Impede clonagem da instância
     */
    private function __clone() {}

    /**
     * Impede deserialização
     */
    public function __wakeup()
    {
        throw new \Exception("Não é permitido desserializar Database");
    }
}
