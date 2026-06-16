<?php
// Script para criar o banco de dados e tabela de clientes

try {
    // Conectar ao MySQL sem banco específico
    $pdo = new PDO('mysql:host=localhost', 'root', '');

    // Ler o arquivo SQL
    $sql = file_get_contents(__DIR__ . '/database/clientes_setup.sql');

    // Executar cada comando
    $commands = explode(';', $sql);
    foreach ($commands as $command) {
        $command = trim($command);
        if (!empty($command)) {
            $pdo->exec($command);
        }
    }

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Banco de dados e tabela criados com sucesso!',
        'banco' => 'db_prog3_eng_2026_1',
        'tabela' => 'clientes'
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode([
        'sucesso' => false,
        'erro' => $e->getMessage()
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit(1);
}
