<?php

declare(strict_types=1);

/**
 * EXEMPLO DE ROTAS COM PRESTADOR
 * 
 * Este arquivo mostra como adicionar endpoints para uma nova tabela
 * Usar este padrão para criar novos CRUDs rapidamente
 */

use App\Application\Actions\Cliente\{
    CreateClienteAction,
    DeleteClienteAction,
    ListClientesAction,
    UpdateClienteAction,
    ViewClienteAction,
};

use App\Application\Actions\Prestador\{
    CreatePrestadorAction,
    DeletePrestadorAction,
    ListPrestadoresAction,
    SearchPrestadoresAction,
    UpdatePrestadorAction,
    ViewPrestadorAction,
};

use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {
    // Middleware CORS
    $app->options('/{routes:.+}', function ($request, $response) {
        return $response;
    });

    // Rota padrão
    $app->get('/', function ($request, $response) {
        $response->getBody()->write('{"status":"API está rodando"}');
        return $response->withHeader('Content-Type', 'application/json');
    });

    // ===============================================
    // GRUPO: CLIENTES
    // ===============================================
    $app->group('/clientes', function (RouteCollectorProxy $group) {
        // Listar todos os clientes
        $group->get('', ListClientesAction::class);

        // Visualizar cliente específico
        $group->get('/{id}', ViewClienteAction::class);

        // Criar novo cliente
        $group->post('', CreateClienteAction::class);

        // Atualizar cliente
        $group->put('/{id}', UpdateClienteAction::class);

        // Deletar cliente
        $group->delete('/{id}', DeleteClienteAction::class);
    });

    // ===============================================
    // GRUPO: PRESTADORES
    // ===============================================
    $app->group('/prestadores', function (RouteCollectorProxy $group) {
        // Listar todos os prestadores
        $group->get('', ListPrestadoresAction::class);

        // Buscar prestadores (GET /prestadores/search?q=termo)
        $group->get('/search', SearchPrestadoresAction::class);

        // Visualizar prestador específico
        $group->get('/{id}', ViewPrestadorAction::class);

        // Criar novo prestador
        $group->post('', CreatePrestadorAction::class);

        // Atualizar prestador
        $group->put('/{id}', UpdatePrestadorAction::class);

        // Deletar prestador
        $group->delete('/{id}', DeletePrestadorAction::class);
    });

    // ===============================================
    // PADRÃO PARA NOVO CRUD
    // ===============================================
    /*
    
    $app->group('/novo-recurso', function (RouteCollectorProxy $group) {
        use App\Application\Actions\NovoRecurso\{
            ListNovoRecursoAction,
            ViewNovoRecursoAction,
            CreateNovoRecursoAction,
            UpdateNovoRecursoAction,
            DeleteNovoRecursoAction,
            SearchNovoRecursoAction,
        };

        $group->get('', ListNovoRecursoAction::class);
        $group->get('/search', SearchNovoRecursoAction::class);
        $group->get('/{id}', ViewNovoRecursoAction::class);
        $group->post('', CreateNovoRecursoAction::class);
        $group->put('/{id}', UpdateNovoRecursoAction::class);
        $group->delete('/{id}', DeleteNovoRecursoAction::class);
    });
    
    */
};
