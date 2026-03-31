<?php

/**
 * conexao.php
 * ============================================================
 * Arquivo de conexão com o banco de dados usando PDO.
 *
 * PDO (PHP Data Objects) é a forma moderna e recomendada de
 * conectar ao banco. Vantagens:
 *   - Suporta múltiplos bancos (MySQL, SQLite, PostgreSQL...)
 *   - Usa prepared statements de verdade (mais seguro)
 *   - Lança exceções em caso de erro (fácil de tratar)
 * ============================================================
 */

// --- Configurações do banco de dados ---
define('DB_HOST',    'localhost');
define('DB_NAME',    'db_prog3_web_service');
define('DB_USER',    'root');
define('DB_PASS',    '');
define('DB_CHARSET', 'utf8');

// DSN = Data Source Name (endereço + nome do banco + charset)
$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

// Opções do PDO:
$opcoes = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Lança PDOException em caso de erro
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // fetchAll() retorna array associativo
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Usa prepared statements reais
];

// Tenta criar a conexão; se falhar, retorna um JSON de erro e encerra
try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $opcoes);
} catch (PDOException $e) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(500);
    die(json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro de conexão com o banco: ' . $e->getMessage()
    ]));
}
