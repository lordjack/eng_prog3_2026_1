<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Inclui a conexão com o banco
require_once 'conexao.php';
$con->set_charset("utf8");

// SQL com JOIN para buscar dados do Serviço + Cliente
$sql = "SELECT 
            s.idServico,
            s.dtRequisicao, 
            s.dtInicio, 
            s.dtFim, 
            s.vCustoMaterial, 
            s.vCustoMaoDeObra, 
            c.nmCliente,
            c.nmEndereco,
            c.nmContato,
            c.nmCPF,
            c.nmCNPJ,
            s.idPrestador
        FROM servico s
        JOIN cliente c ON s.idCliente = c.idCliente";

$result = $con->query($sql);

$response = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    // Retorno padrão caso a consulta não encontre registros
    $response[] = [
        "idServico" => 0,
        "dtRequisicao" => "",
        "dtInicio" => "",
        "dtFim" => "",
        "vCustoMaterial" => "0.00",
        "vCustoMaoDeObra" => "0.00",
        "nmCliente" => "Nenhum cliente encontrado",
        "nmEndereco" => "",
        "nmContato" => "",
        "nmCPF" => "",
        "nmCNPJ" => "",
        "idPrestador" => ""
    ];
}

// Cabeçalho para saída JSON
header('Content-Type: application/json; charset=utf-8');

// Encode garantindo que acentos e caracteres especiais não sejam quebrados
echo json_encode($response, JSON_UNESCAPED_UNICODE);

$con->close();
?>