<?php

/**
 * clientes.php
 * ============================================================
 * Endpoint GET — Lista todos os clientes cadastrados.
 *
 * Como usar:
 *   GET http://localhost/ServicosApi/refatorado/clientes.php
 *
 * Retorno esperado (array JSON):
 *   [
 *     { "idCliente": 1, "nmCliente": "João", ... },
 *     ...
 *   ]
 * ============================================================
 */

// Define que a resposta será JSON com suporte a acentos
header('Content-Type: application/json; charset=utf-8');

// Importa a conexão PDO ($pdo)
require_once 'conexao.php';

try {
    // Consulta simples sem filtros — não precisa de prepared statement
    $sql  = "SELECT idCliente, nmCliente, nmEndereco, nmContato, nmCPF, nmCNPJ
             FROM cliente";

    $stmt     = $pdo->query($sql);  // Executa diretamente (sem parâmetros de usuário)
    $clientes = $stmt->fetchAll();  // Retorna todos os registros como array associativo

    echo json_encode($clientes, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao buscar clientes: ' . $e->getMessage()
    ]);
}
