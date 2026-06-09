<?php

namespace App\Middlewares;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

/**
 * Middleware para CORS (Cross-Origin Resource Sharing)
 * 
 * Permite que a API seja acessada por aplicações de diferentes origens
 * (como o React Native ou aplicações web em localhost)
 * 
 * Uso: Registrar no index.php com $app->add(new CorsMiddleware());
 */
class CorsMiddleware implements MiddlewareInterface
{
    public function process(Request $request, RequestHandler $handler): Response
    {
        $response = $handler->handle($request);

        // Obter a origem que fez a requisição
        $origin = $request->getHeaderLine('Origin');

        // Verificar se a origem é permitida
        $allowedOrigins = ALLOWED_ORIGINS;
        $isAllowed = in_array($origin, $allowedOrigins);

        if ($isAllowed) {
            $response = $response
                ->withHeader('Access-Control-Allow-Origin', $origin)
                ->withHeader('Access-Control-Allow-Credentials', 'true');
        }

        // Headers CORS padrão
        $response = $response
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        // Tratamento para requisições OPTIONS (preflight)
        if ($request->getMethod() === 'OPTIONS') {
            return $response->withStatus(200);
        }

        return $response;
    }
}
