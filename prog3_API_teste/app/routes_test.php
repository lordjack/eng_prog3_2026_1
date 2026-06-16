<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

return function (App $app) {
    // Rota raiz - Info da API
    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write(json_encode([
            'mensagem' => 'API Slim Framework - CRUD de Clientes',
            'versao' => '1.0',
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

        return $response->withHeader('Content-Type', 'application/json');
    });

    // Rota de teste simples
    $app->get('/test', function (Request $request, Response $response) {
        $response->getBody()->write(json_encode([
            'sucesso' => true,
            'mensagem' => 'Teste simples funcionando!',
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

        return $response->withHeader('Content-Type', 'application/json');
    });

    // Rota de clientes com closure simples
    $app->get('/clientes-test', function (Request $request, Response $response) {
        $response->getBody()->write(json_encode([
            'sucesso' => true,
            'mensagem' => 'Rota de clientes funcionando!',
            'clientes' => [
                ['id' => 1, 'nome' => 'João Silva'],
                ['id' => 2, 'nome' => 'Maria Santos'],
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

        return $response->withHeader('Content-Type', 'application/json');
    });

    // CORS Pre-Flight OPTIONS Request Handler
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    });
};
