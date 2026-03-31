<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define o cabeçalho para JSON
header('Content-Type: application/json');

// Inclui a conexão (certifique-se de que o arquivo existe e define a variável $con)
require_once 'conexao.php';
$con->set_charset("utf8");

// Obtém o input JSON
$jsonParam = json_decode(file_get_contents('php://input'), true);

if (!$jsonParam) {
    echo json_encode(['success' => false, 'message' => 'Dados JSON inválidos ou ausentes.']);
    exit;
}

/**
 * Extração e Formatação dos Dados
 */
// Datas (Formatando para o padrão MySQL: YYYY-MM-DD HH:MM:SS)
$dtRequisicao    = !empty($jsonParam['dtRequisicao']) ? date('Y-m-d H:i:s', strtotime($jsonParam['dtRequisicao'])) : date('Y-m-d H:i:s');
$dtInicio        = !empty($jsonParam['dtInicio']) ? date('Y-m-d H:i:s', strtotime($jsonParam['dtInicio'])) : null;
$dtFim           = !empty($jsonParam['dtFim']) ? date('Y-m-d H:i:s', strtotime($jsonParam['dtFim'])) : null;

// Valores Decimais (usando floatval para garantir o tipo numérico)
$vCustoMaterial  = isset($jsonParam['vCustoMaterial']) ? floatval($jsonParam['vCustoMaterial']) : 0.00;
$vCustoMaoDeObra = isset($jsonParam['vCustoMaoDeObra']) ? floatval($jsonParam['vCustoMaoDeObra']) : 0.00;

// Chaves e Strings
$idCliente       = intval($jsonParam['idCliente'] ?? 0);
$idPrestador     = trim($jsonParam['idPrestador'] ?? '');

// Validação básica de campos obrigatórios
if ($idCliente <= 0) {
    echo json_encode(['success' => false, 'message' => 'idCliente e idPrestador são obrigatórios.']);
    exit;
}

/**
 * Preparação da Query
 */
$sql = "INSERT INTO servico (dtRequisicao, dtInicio, dtFim, vCustoMaterial, vCustoMaoDeObra, idCliente, idPrestador) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $con->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Erro ao preparar a consulta: ' . $con->error]);
    exit;
}

/**
 * Bind de Parâmetros:
 * s = string (usado para datas e strings)
 * d = double (usado para campos decimais/float)
 * i = integer
 * * Ordem: dtReq(s), dtIni(s), dtFim(s), custoMat(d), custoMao(d), idCli(i), idPres(s)
 */
$stmt->bind_param("sssddis", 
    $dtRequisicao, 
    $dtInicio, 
    $dtFim, 
    $vCustoMaterial, 
    $vCustoMaoDeObra, 
    $idCliente, 
    $idPrestador
);

// Executa e retorna o resultado
if ($stmt->execute()) {
    echo json_encode([
        'success' => true, 
        'message' => 'Serviço registrado com sucesso!',
        'idServico' => $stmt->insert_id
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro no registro do serviço: ' . $stmt->error]);
}

$stmt->close();
$con->close();

?>