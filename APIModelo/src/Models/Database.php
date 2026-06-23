<?php

namespace App\Models;

use PDO;
use PDOException;

/**
 * ⭐ Singleton para Conexão PDO
 * 
 * Garante apenas uma conexão por execução
 * Uso: $pdo = Database::getInstance()->getPDO();
 */
class Database
{

    private static $instance = null;
    private $pdo;

    // Configurações do Banco de Dados
    private $host = 'localhost';
    private $user = 'root';
    private $password = '';
    private $dbname = 'db_prog3_2026_1';
    private $port = '3306';
    private $charset = 'utf8';

    /**
     * Singleton - evita múltiplas conexões
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Construtor privado - só pode ser chamado via getInstance()
     */
    private function __construct()
    {
        $this->connect();
    }

    /**
     * Cria conexão PDO
     */
    private function connect()
    {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname};port={$this->port};charset={$this->charset}";

            $this->pdo = new PDO($dsn, $this->user, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);

            error_log("✅ Conectado ao banco '{$this->dbname}' com sucesso");
        } catch (PDOException $e) {
            error_log("❌ Erro na conexão: " . $e->getMessage());
            throw new PDOException("Erro ao conectar ao banco de dados: " . $e->getMessage());
        }
    }

    /**
     * Retorna a conexão PDO
     */
    public function getPDO()
    {
        return $this->pdo;
    }

    /**
     * Impede clonagem
     */
    private function __clone() {}

    /**
     * Impede desserialização
     */
    private function __wakeup() {}
}
