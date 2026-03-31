<?php

/**
 * buscar_servico.php
 * ============================================================
 * Endpoint GET — Busca um serviço pelo ID.
 *
 * Como usar:
 *   GET http://localhost/ServicosApi/refatorado/buscar_servico.php?id=1
 *
 * Retorno esperado (objeto JSON):
 *   {
 *     "idServico": 1,
 *     "dtRequisicao": "2026-03-30 10:00:00",
 *     "dtInicio": "2026-04-01 08:00:00",
 *     "dtFim": "2026-04-05 17:00:00",
 *     "vCustoMaterial": 150.00,
 *     "vCustoMaoDeObra": 300.00,
 *     "nmCliente": "Jonas",
 *     "nmPrestador": "José"
 *   }
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

// --- 2. Busca o serviço com JOIN nas tabelas cliente e prestador ---
try {
    $sql = "SELECT
                s.idServico,
                s.dtRequisicao,
                s.dtInicio,
                s.dtFim,
                s.vCustoMaterial,
                s.vCustoMaoDeObra,
                s.idCliente,
                c.nmCliente,
                c.nmEndereco,
                c.nmContato AS nmContatoCliente,
                s.idPrestador,
                p.nmPrestador,
                p.nmContato AS nmContatoPrestador
            FROM servico s
            JOIN cliente   c ON s.idCliente   = c.idCliente
            JOIN prestador p ON s.idPrestador = p.idPrestador
            WHERE s.idServico = :idServico";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':idServico' => $idServico]);
    $servico = $stmt->fetch();

    if (!$servico) {
        http_response_code(404);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Serviço não encontrado.']);
        exit;
    }

    echo json_encode($servico, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao buscar serviço: ' . $e->getMessage()
    ]);
}
