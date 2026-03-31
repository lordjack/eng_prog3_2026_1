<?php

/**
 * servicos.php
 * ============================================================
 * Endpoint GET — Lista todos os serviços com dados do cliente.
 *
 * Utiliza JOIN para combinar as tabelas "servico" e "cliente".
 *
 * Como usar:
 *   GET http://localhost/ServicosApi/refatorado/servicos.php
 *
 * Retorno esperado (array JSON):
 *   [
 *     {
 *       "idServico": 1,
 *       "dtRequisicao": "2026-01-10 08:00:00",
 *       "nmCliente": "João Silva",
 *       ...
 *     },
 *     ...
 *   ]
 * ============================================================
 */

header('Content-Type: application/json; charset=utf-8');

require_once 'conexao.php';

try {
    // JOIN une as duas tabelas pelo campo idCliente em comum
    $sql = "SELECT
                s.idServico,
                s.dtRequisicao,
                s.dtInicio,
                s.dtFim,
                s.vCustoMaterial,
                s.vCustoMaoDeObra,
                s.idPrestador,
                p.nmPrestador,
                c.nmCliente,
                c.nmEndereco,
                c.nmContato,
                c.nmCPF,
                c.nmCNPJ
            FROM servico s
            JOIN cliente c ON s.idCliente = c.idCliente
            LEFT JOIN prestador p ON s.idPrestador = p.idPrestador";

    $stmt    = $pdo->query($sql);
    $servicos = $stmt->fetchAll();

    echo json_encode($servicos, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Erro ao buscar serviços: ' . $e->getMessage()
    ]);
}
