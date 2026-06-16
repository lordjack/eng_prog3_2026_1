<?php

declare(strict_types=1);

namespace App\Application\Actions\Generic;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpNotFoundException;

/**
 * GenericViewAction
 * Action genérica para visualizar um registro por ID
 */
class GenericViewAction
{
    protected LoggerInterface $logger;
    protected $repository;
    protected string $resourceName = 'registro';

    public function __construct(LoggerInterface $logger, $repository)
    {
        $this->logger = $logger;
        $this->repository = $repository;
    }

    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $id = (int)($args['id'] ?? 0);

        $item = $this->repository->findById($id);

        if (!$item) {
            throw new HttpNotFoundException($request, "{$this->resourceName} não encontrado");
        }

        $this->logger->info("{$this->resourceName} visualizado. ID: {$id}");

        $response->getBody()->write(json_encode($item, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
