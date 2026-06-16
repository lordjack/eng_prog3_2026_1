<?php

declare(strict_types=1);

use App\Application\Actions\Cliente\CreateClienteAction;
use App\Application\Actions\Cliente\DeleteClienteAction;
use App\Application\Actions\Cliente\ListClientesAction;
use App\Application\Actions\Cliente\SearchClientesAction;
use App\Application\Actions\Cliente\UpdateClienteAction;
use App\Application\Actions\Cliente\ViewClienteAction;
use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    // Rota raiz - Info da API
    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write(json_encode([
            'mensagem' => 'API Slim Framework - CRUD de Clientes',
            'versao' => '1.0',
            'endpoints' => [
                'clientes' => [
                    'GET /clientes' => 'Listar todos os clientes',
                    'GET /clientes/{id}' => 'Obter um cliente específico',
                    'POST /clientes' => 'Criar novo cliente',
                    'PUT /clientes/{id}' => 'Atualizar cliente',
                    'DELETE /clientes/{id}' => 'Deletar cliente',
                ],
                'usuarios' => [
                    'GET /users' => 'Listar usuários',
                    'GET /users/{id}' => 'Obter usuário',
                ],
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

        return $response->withHeader('Content-Type', 'application/json');
    });

    // ========== ROTAS DE CLIENTES ==========
    $app->group('/clientes', function (Group $group) {
        $group->get('', ListClientesAction::class);           // GET /clientes
        $group->get('/search', SearchClientesAction::class);  // GET /clientes/search?q=termo&fields=campo1,campo2
        $group->get('/{id}', ViewClienteAction::class);       // GET /clientes/{id}
        $group->post('', CreateClienteAction::class);         // POST /clientes
        $group->put('/{id}', UpdateClienteAction::class);     // PUT /clientes/{id}
        $group->delete('/{id}', DeleteClienteAction::class);  // DELETE /clientes/{id}
    });

    // ========== ROTAS DE USUÁRIOS (compatibilidade) ==========
    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });

    // CORS Pre-Flight OPTIONS Request Handler - DEVE VIR POR ÚLTIMO
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    });
};
