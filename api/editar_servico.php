<?php

/**
 * editar_servico.php
 * ============================================================
 * Endpoint PUT — Atualiza os dados de um serviço existente.
 *
 * Como usar (enviar um JSON no corpo da requisição):
 *   PUT http://localhost/ServicosApi/refatorado/editar_servico.php
 *   Content-Type: application/json
 *
 *   Corpo (JSON):
 *   {
 *     "idServico":       1,                      (OBRIGATÓRIO)
 *     "dtRequisicao":    "2026-03-30 10:00:00",  (opcional)
 *     "dtInicio":        "2026-04-01 08:00:00",  (opcional)
 *     "dtFim":           "2026-04-05 17:00:00",  (opcional)
 *     "vCustoMaterial":  150.00,                 (opcional)
 *     "vCustoMaoDeObra": 300.00,                 (opcional)
 *     "idCliente":       1,                      (opcional)
 *     "idPrestador":     1                       (opcional)
 *   }
 *
 * Apenas os campos enviados serão atualizados.
 * SEGURANÇA: Usamos prepared statements para evitar SQL Injection.
 * ============================================================
 */

header('Content-Type: application/json; charset=utf-8');

require_once 'conexao.php';

// --- 1. Lê e valida o JSON recebido ---
$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'JSON inválido ou ausente no corpo da requisição.']);
    exit;
}

// --- 2. Valida o ID obrigatório ---
$idServico = intval($dados['idServico'] ?? 0);

if ($idServico <= 0) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'O campo idServico é obrigatório e deve ser maior que zero.']);
    exit;
}

// --- 3. Monta dinamicamente apenas os campos enviados ---
$campos     = [];
$parametros = [':idServico' => $idServico];

if (!empty($dados['dtRequisicao'])) {
    $campos[]                     = 'dtRequisicao = :dtRequisicao';
    $parametros[':dtRequisicao']  = date('Y-m-d H:i:s', strtotime($dados['dtRequisicao']));
}
if (!empty($dados['dtInicio'])) {
    $campos[]                  = 'dtInicio = :dtInicio';
    $parametros[':dtInicio']   = date('Y-m-d H:i:s', strtotime($dados['dtInicio']));
}
if (!empty($dados['dtFim'])) {
    $campos[]               = 'dtFim = :dtFim';
    $parametros[':dtFim']   = date('Y-m-d H:i:s', strtotime($dados['dtFim']));
}
if (isset($dados['vCustoMaterial'])) {
    $campos[]                      = 'vCustoMaterial = :vCustoMaterial';
    $parametros[':vCustoMaterial']  = floatval($dados['vCustoMaterial']);
}
if (isset($dados['vCustoMaoDeObra'])) {
    $campos[]                        = 'vCustoMaoDeObra = :vCustoMaoDeObra';
    $parametros[':vCustoMaoDeObra']   = floatval($dados['vCustoMaoDeObra']);
}
if (!empty($dados['idCliente'])) {
    $idCliente = intval($dados['idCliente']);
    if ($idCliente > 0) {
        $campos[]                 = 'idCliente = :idCliente';
        $parametros[':idCliente'] = $idCliente;
    }
}
if (!empty($dados['idPrestador'])) {
    $idPrestador = intval($dados['idPrestador']);
    if ($idPrestador > 0) {
        $campos[]                   = 'idPrestador = :idPrestador';
        $parametros[':idPrestador'] = $idPrestador;
    }
}

if (empty($campos)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Nenhum campo válido para atualizar foi enviado.']);
    exit;
}

// --- 4. Executa o UPDATE ---
try {
    $sql  = 'UPDATE servico SET ' . implode(', ', $campos) . ' WHERE idServico = :idServico';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($parametros);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Serviço não encontrado ou nenhum dado foi alterado.']);
        exit;
    }

    echo json_encode(['sucesso' => true, 'mensagem' => 'Serviço atualizado com sucesso!']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao editar serviço: ' . $e->getMessage()
    ]);
}
