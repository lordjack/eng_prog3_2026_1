<?php
// Teste simples da rota raiz

$baseUrl = 'http://localhost/eng_prog3_2026_1/prog3_API_teste/public';

echo "Testando GET /\n";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "$baseUrl/");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

echo "HTTP Code: $httpCode\n";
echo "Response:\n";
echo $response . "\n";
