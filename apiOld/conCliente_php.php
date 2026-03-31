<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Inclui o script de conexão existente
require_once 'conexao.php';
$con->set_charset("utf8");

// Decodifica entrada JSON (caso precise no futuro, embora ignorado no momento)
json_decode(file_get_contents('php://input'), true);

// SQL ajustado para a tabela 'cliente'
$sql = "SELECT idCliente, nmCliente, nmEndereco, nmContato, nmCPF, nmCNPJ FROM cliente";

$result = $con->query($sql);

$response = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row; 
    }
} else {
    // Retorno padrão caso a tabela esteja vazia
    $response[] = [
        "idCliente" => 0,
        "nmCliente" => "",
        "nmEndereco" => "",
        "nmContato" => "",
        "nmCPF" => "",
        "nmCNPJ" => ""
    ];
}

// Define o cabeçalho para JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response, JSON_UNESCAPED_UNICODE); 

$con->close();
?>