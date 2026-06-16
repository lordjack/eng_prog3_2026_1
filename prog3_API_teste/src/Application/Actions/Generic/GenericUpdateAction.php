<?php

declare(strict_types=1);

namespace App\Application\Actions\Generic;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpNotFoundException;

/**
 * GenericUpdateAction
 * Action genérica para atualizar um registro
 */
class GenericUpdateAction
{
    protected LoggerInterface $logger;
    protected $repository;
    protected string $resourceName = 'registro';
    protected array $allowedFields = [];

    public function __construct(LoggerInterface $logger, $repository)
    {
        $this->logger = $logger;
        $this->repository = $repository;
    }

    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $id = (int)($args['id'] ?? 0);
        $data = (array)$request->getParsedBody();

        // Verificar se existe
        $existing = $this->repository->findById($id);
        if (!$existing) {
            throw new HttpNotFoundException($request, "{$this->resourceName} não encontrado");
        }

        // Validar dados
        $this->validate($data);

        // Transformar dados
        $data = $this->transform($data);

        // Atualizar
        $success = $this->repository->update($id, $data);

        if (!$success) {
            throw new \Exception("Falha ao atualizar {$this->resourceName}");
        }

        // Buscar atualizado
        $item = $this->repository->findById($id);

        $this->logger->info("{$this->resourceName} atualizado. ID: {$id}");

        $response->getBody()->write(json_encode($item, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response->withHeader('Content-Type', 'application/json');
    }

    /**
     * Validar dados antes de atualizar
     * Sobrescrever em subclasses
     */
    protected function validate(array $data): void
    {
        // Override em subclasses se necessário
    }

    /**
     * Transformar dados antes de salvar
     * Sobrescrever em subclasses
     */
    protected function transform(array $data): array
    {
        // Se allowedFields definido, filtrar dados
        if (!empty($this->allowedFields)) {
            return array_intersect_key($data, array_flip($this->allowedFields));
        }

        return $data;
    }
}
