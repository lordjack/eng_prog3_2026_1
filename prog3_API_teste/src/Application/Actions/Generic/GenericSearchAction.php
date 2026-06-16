<?php

declare(strict_types=1);

namespace App\Application\Actions\Generic;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;

/**
 * GenericSearchAction
 * Action genérica para buscar registros
 * 
 * Query params:
 * - q: termo de busca
 * - fields: campos para buscar (separados por vírgula)
 */
class GenericSearchAction
{
    protected LoggerInterface $logger;
    protected $repository;
    protected string $resourceName = 'registros';
    protected array $searchableFields = [];

    public function __construct(LoggerInterface $logger, $repository)
    {
        $this->logger = $logger;
        $this->repository = $repository;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        $queryParams = $request->getQueryParams();

        $searchTerm = trim($queryParams['q'] ?? '');
        if (empty($searchTerm)) {
            throw new HttpBadRequestException($request, "Parâmetro 'q' (busca) é obrigatório");
        }

        // Determinar campos a buscar
        $fields = $this->getSearchFields($queryParams);

        if (empty($fields)) {
            throw new HttpBadRequestException($request, "Nenhum campo de busca disponível");
        }

        // Executar busca
        $results = $this->repository->search($fields, $searchTerm);

        $this->logger->info("Busca realizada: '{$searchTerm}' em " . implode(', ', $fields) . ". Resultados: " . count($results));

        $response->getBody()->write(json_encode($results, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response->withHeader('Content-Type', 'application/json');
    }

    /**
     * Obter campos a buscar
     */
    protected function getSearchFields(array $queryParams): array
    {
        // Se enviou campos no query, usar apenas aqueles
        if (isset($queryParams['fields'])) {
            $requestedFields = array_map('trim', explode(',', $queryParams['fields']));
            // Filtrar apenas campos permitidos
            return array_intersect($requestedFields, $this->searchableFields);
        }

        // Usar campos padrão
        return $this->searchableFields;
    }
}
