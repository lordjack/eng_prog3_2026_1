<?php

/**
 * cadastrar_servico.php
 * ============================================================
 * Endpoint POST — Cadastra um novo serviço no banco de dados.
 *
 * Como usar (enviar um JSON no corpo da requisição):
 *   POST http://localhost/refatorado/cadastrar_servico.php
 *   Content-Type: application/json
 *
 *   Corpo (JSON):
 *   {
 *     "dtRequisicao":    "2026-03-30 10:00:00",  (opcional, padrão = agora)
 *     "dtInicio":        "2026-04-01 08:00:00",  (opcional, padrão = agora)
 *     "dtFim":           "2026-04-05 17:00:00",  (opcional, padrão = agora)
 *     "vCustoMaterial":  150.00,                 (opcional, padrão = 0)
 *     "vCustoMaoDeObra": 300.00,                 (opcional, padrão = 0)
 *     "idCliente":       1,                      (OBRIGATÓRIO)
 *     "idPrestador":     1                       (OBRIGATÓRIO)
 *   }
 *
 * SEGURANÇA: Usamos prepared statements com parâmetros nomeados
 * (:nome) para evitar SQL Injection.
 * ============================================================
 */

header('Content-Type: application/json; charset=utf-8');

require_once 'conexao.php';

// --- 1. Lê e valida o JSON recebido ---
$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados) {
    http_response_code(400); // Bad Request
    echo json_encode(['sucesso' => false, 'mensagem' => 'JSON inválido ou ausente no corpo da requisição.']);
    exit;
}

// --- 2. Extrai e formata cada campo ---
// date() converte para o formato que o MySQL espera: YYYY-MM-DD HH:MM:SS
$dtRequisicao    = !empty($dados['dtRequisicao'])    ? date('Y-m-d H:i:s', strtotime($dados['dtRequisicao'])) : date('Y-m-d H:i:s');
$dtInicio        = !empty($dados['dtInicio'])        ? date('Y-m-d H:i:s', strtotime($dados['dtInicio']))     : date('Y-m-d H:i:s');
$dtFim           = !empty($dados['dtFim'])           ? date('Y-m-d H:i:s', strtotime($dados['dtFim']))        : date('Y-m-d H:i:s');
$vCustoMaterial  = isset($dados['vCustoMaterial'])  ? floatval($dados['vCustoMaterial'])  : 0.00;
$vCustoMaoDeObra = isset($dados['vCustoMaoDeObra']) ? floatval($dados['vCustoMaoDeObra']) : 0.00;
$idCliente       = intval($dados['idCliente']   ?? 0);
$idPrestador     = intval($dados['idPrestador'] ?? 0);

// --- 3. Valida campos obrigatórios ---
if ($idCliente <= 0) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'O campo idCliente é obrigatório e deve ser maior que zero.']);
    exit;
}

if ($idPrestador <= 0) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'O campo idPrestador é obrigatório e deve ser maior que zero.']);
    exit;
}

// --- 4. Prepared Statement com parâmetros nomeados (:nome) ---
try {
    $sql = "INSERT INTO servico
                (dtRequisicao, dtInicio, dtFim, vCustoMaterial, vCustoMaoDeObra, idCliente, idPrestador)
            VALUES
                (:dtRequisicao, :dtInicio, :dtFim, :vCustoMaterial, :vCustoMaoDeObra, :idCliente, :idPrestador)";

    $stmt = $pdo->prepare($sql); // Prepara a query no banco

    // Associa os valores aos parâmetros nomeados (protege contra SQL Injection)
    $stmt->execute([
        ':dtRequisicao'    => $dtRequisicao,
        ':dtInicio'        => $dtInicio,
        ':dtFim'           => $dtFim,
        ':vCustoMaterial'  => $vCustoMaterial,
        ':vCustoMaoDeObra' => $vCustoMaoDeObra,
        ':idCliente'       => $idCliente,
        ':idPrestador'     => $idPrestador,
    ]);

    // Retorna sucesso com o ID do registro recém-criado
    echo json_encode([
        'sucesso'   => true,
        'mensagem'  => 'Serviço cadastrado com sucesso!',
        'idServico' => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao cadastrar serviço: ' . $e->getMessage()
    ]);
}
