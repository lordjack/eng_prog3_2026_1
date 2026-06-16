<?php

declare(strict_types=1);

namespace App\Application\Actions\Generic;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpNotFoundException;

/**
 * GenericDeleteAction
 * Action genérica para deletar um registro
 */
class GenericDeleteAction
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

        $existing = $this->repository->findById($id);
        if (!$existing) {
            throw new HttpNotFoundException($request, "{$this->resourceName} não encontrado");
        }

        $success = $this->repository->delete($id);

        if (!$success) {
            throw new \Exception("Falha ao deletar {$this->resourceName}");
        }

        $this->logger->info("{$this->resourceName} deletado. ID: {$id}");

        return $response->withStatus(204);
    }
}
