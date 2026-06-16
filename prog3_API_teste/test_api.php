<?php
// Teste da API de Clientes

$baseUrl = 'http://localhost/eng_prog3_2026_1/prog3_API_teste/public';

echo "========================================\n";
echo "TESTE DA API DE CLIENTES\n";
echo "========================================\n\n";

// 1. Listar clientes
echo "1. Testando GET /clientes\n";
echo "   URL: $baseUrl/clientes\n";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "$baseUrl/clientes");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

echo "   Status HTTP: $httpCode\n";
echo "   Resposta:\n";
echo json_encode(json_decode($response), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
echo "\n\n";

// 2. Obter cliente específico
echo "2. Testando GET /clientes/1\n";
echo "   URL: $baseUrl/clientes/1\n";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "$baseUrl/clientes/1");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

echo "   Status HTTP: $httpCode\n";
echo "   Resposta:\n";
echo json_encode(json_decode($response), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
echo "\n\n";

// 3. Criar novo cliente
echo "3. Testando POST /clientes (Criar novo cliente)\n";
echo "   URL: $baseUrl/clientes\n";

$novoCliente = [
    'nome' => 'Cliente Teste ' . date('H:i:s'),
    'email' => 'teste' . time() . '@email.com',
    'telefone' => '(11) 99999-9999',
    'endereco' => 'Rua Teste, 123',
    'cidade' => 'São Paulo',
    'estado' => 'SP',
    'cep' => '01310-100',
    'cpf' => '888.888.888-88',
    'tipo' => 'fisica'
];

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "$baseUrl/clientes");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($novoCliente));

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

echo "   Status HTTP: $httpCode\n";
echo "   Resposta:\n";
echo json_encode(json_decode($response), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
echo "\n\n";

// 4. Testar erro 404
echo "4. Testando GET /clientes/9999 (Erro 404)\n";
echo "   URL: $baseUrl/clientes/9999\n";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "$baseUrl/clientes/9999");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

echo "   Status HTTP: $httpCode\n";
echo "   Resposta:\n";
echo json_encode(json_decode($response), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
echo "\n\n";

echo "========================================\n";
echo "TESTES CONCLUÍDOS\n";
echo "========================================\n";
