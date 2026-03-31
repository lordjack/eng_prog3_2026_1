<?php

/**
 * prestadores.php
 * ============================================================
 * Endpoint GET — Lista todos os prestadores cadastrados.
 *
 * Como usar:
 *   GET http://localhost/ServicosApi/refatorado/prestadores.php
 *
 * Retorno esperado (array JSON):
 *   [
 *     { "idPrestador": 1, "nmPrestador": "José", ... },
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
    $sql  = "SELECT idPrestador, nmPrestador, nmContato, nmCPF, nmCNPJ
             FROM prestador";

    $stmt        = $pdo->query($sql);  // Executa diretamente (sem parâmetros de usuário)
    $prestadores = $stmt->fetchAll();  // Retorna todos os registros como array associativo

    echo json_encode($prestadores, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao buscar prestadores: ' . $e->getMessage()
    ]);
}
