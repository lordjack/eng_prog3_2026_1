<?php

declare(strict_types=1);

namespace App\Application\Actions\Generic;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;

/**
 * GenericListAction
 * Action genérica para listar todos os registros
 */
class GenericListAction
{
    protected LoggerInterface $logger;
    protected $repository;
    protected string $resourceName = 'registros';

    public function __construct(LoggerInterface $logger, $repository)
    {
        $this->logger = $logger;
        $this->repository = $repository;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        $items = $this->repository->findAll();

        $this->logger->info("Lista de {$this->resourceName} visualizada. Total: " . count($items));

        $response->getBody()->write(json_encode($items, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
