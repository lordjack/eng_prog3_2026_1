<?php

declare(strict_types=1);

namespace App\Application\Actions\Generic;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;

/**
 * GenericCreateAction
 * Action genérica para criar um novo registro
 */
class GenericCreateAction
{
    protected LoggerInterface $logger;
    protected $repository;
    protected string $resourceName = 'registro';
    protected array $requiredFields = [];
    protected array $allowedFields = [];

    public function __construct(LoggerInterface $logger, $repository)
    {
        $this->logger = $logger;
        $this->repository = $repository;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        $data = (array)$request->getParsedBody();

        // Validar campos obrigatórios
        $this->validate($data);

        // Transformar dados se necessário
        $data = $this->transform($data);

        // Criar registro
        $id = $this->repository->create($data);

        // Buscar o registro criado
        $item = $this->repository->findById($id);

        $this->logger->info("{$this->resourceName} criado. ID: {$id}");

        $response->getBody()->write(json_encode($item, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }

    /**
     * Validar dados antes de inserir
     * Sobrescrever em subclasses para validação customizada
     */
    protected function validate(array $data): void
    {
        foreach ($this->requiredFields as $field) {
            if (empty($data[$field])) {
                throw new HttpBadRequestException(
                    null,
                    "Campo obrigatório ausente: {$field}"
                );
            }
        }
    }

    /**
     * Transformar dados antes de salvar
     * Sobrescrever em subclasses para transformações customizadas
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
