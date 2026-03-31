<?php

/**
 * excluir_servico.php
 * ============================================================
 * Endpoint DELETE — Remove um serviço pelo ID.
 *
 * Como usar:
 *   DELETE http://localhost/ServicosApi/refatorado/excluir_servico.php?id=1
 *
 * Retorno esperado (objeto JSON):
 *   { "sucesso": true, "mensagem": "Serviço excluído com sucesso!" }
 *
 * SEGURANÇA: Usamos prepared statements para evitar SQL Injection.
 * ============================================================
 */

header('Content-Type: application/json; charset=utf-8');

require_once 'conexao.php';

// --- 1. Lê e valida o parâmetro da URL ---
$idServico = intval($_GET['id'] ?? 0);

if ($idServico <= 0) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Parâmetro "id" é obrigatório e deve ser maior que zero.']);
    exit;
}

// --- 2. Executa o DELETE ---
try {
    $sql  = 'DELETE FROM servico WHERE idServico = :idServico';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':idServico' => $idServico]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Serviço não encontrado.']);
        exit;
    }

    echo json_encode(['sucesso' => true, 'mensagem' => 'Serviço excluído com sucesso!']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao excluir serviço: ' . $e->getMessage()
    ]);
}
