#!/usr/bin/env powershell

Write-Host "TESTE COMPLETO DO CRUD CLIENTE" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8080"
$createdId = $null

Write-Host "TEST 1: GET /clientes" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/clientes" -Method GET -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Clientes: $($data.Count)" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "TEST 2: GET /clientes/1" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/clientes/1" -Method GET -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Nome: $($data.nome)" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "TEST 3: GET /clientes/search" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/clientes/search?q=silva" -Method GET -UseBasicParsing
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Resultados: $($data.Count)" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "TEST 4: POST /clientes" -ForegroundColor Yellow
try {
    $timestamp = (Get-Date).Ticks
    $newClient = @{
        nome     = "Cliente Teste $timestamp"
        email    = "teste_$timestamp@api.com"
        telefone = "(11) 99999-9999"
        endereco = "Rua Teste 999"
        cidade   = "Sao Paulo"
        estado   = "SP"
        cep      = "01310-100"
        cpf      = "12345678901"
        tipo     = "fisica"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$baseUrl/clientes" -Method POST -UseBasicParsing -ContentType "application/json" -Body $newClient
    $data = $response.Content | ConvertFrom-Json
    $createdId = $data.id
    
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "ID Criado: $($data.id)" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: $_" -ForegroundColor Red
}
Write-Host ""

if ($createdId) {
    Write-Host "TEST 5: PUT /clientes/$createdId" -ForegroundColor Yellow
    try {
        $updateData = @{
            telefone = "(11) 88888-8888"
            endereco = "Rua Atualizada 888"
        } | ConvertTo-Json

        $response = Invoke-WebRequest -Uri "$baseUrl/clientes/$createdId" -Method PUT -UseBasicParsing -ContentType "application/json" -Body $updateData
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "ID Atualizado: $createdId" -ForegroundColor Green
    }
    catch {
        Write-Host "ERRO: $_" -ForegroundColor Red
    }
    Write-Host ""

    Write-Host "TEST 6: DELETE /clientes/$createdId" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/clientes/$createdId" -Method DELETE -UseBasicParsing
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "ID Deletado: $createdId" -ForegroundColor Green
    }
    catch {
        Write-Host "ERRO: $_" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "TESTES CONCLUIDOS" -ForegroundColor Green
