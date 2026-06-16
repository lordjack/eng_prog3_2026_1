<?php

declare(strict_types=1);

namespace App\Application\Actions\Cliente;

use App\Application\Actions\Generic\GenericCreateAction;
use Slim\Exception\HttpBadRequestException;

/**
 * CreateClienteAction
 * POST /clientes
 * Cria um novo cliente
 *
 * Campos obrigatórios no JSON:
 * - nome (string)
 * - email (string)
 *
 * Campos opcionais:
 * - telefone, endereco, cidade, estado, cep, cpf, cnpj, tipo
 */
class CreateClienteAction extends GenericCreateAction
{
    protected string $resourceName = 'cliente';
    protected array $requiredFields = ['nome', 'email'];
    protected array $allowedFields = ['nome', 'email', 'telefone', 'endereco', 'cidade', 'estado', 'cep', 'cpf', 'cnpj', 'tipo'];

    /**
     * Validação customizada para Cliente
     */
    protected function validate(array $data): void
    {
        // Validar campos obrigatórios
        parent::validate($data);

        // Validar formato de email
        if (!filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
            throw new HttpBadRequestException(
                null,
                "Email inválido: {$data['email']}"
            );
        }

        // Validar CPF se fornecido (formato básico)
        if (!empty($data['cpf'])) {
            $cpf = preg_replace('/\D/', '', $data['cpf']);
            if (strlen($cpf) !== 11) {
                throw new HttpBadRequestException(null, "CPF deve ter 11 dígitos");
            }
        }

        // Validar CNPJ se fornecido (formato básico)
        if (!empty($data['cnpj'])) {
            $cnpj = preg_replace('/\D/', '', $data['cnpj']);
            if (strlen($cnpj) !== 14) {
                throw new HttpBadRequestException(null, "CNPJ deve ter 14 dígitos");
            }
        }
    }

    /**
     * Transformar dados antes de salvar
     */
    protected function transform(array $data): array
    {
        // Chamar transformação da classe pai (filtrar fields)
        $data = parent::transform($data);

        // Adicionar tipo padrão se não fornecido
        if (empty($data['tipo'])) {
            $data['tipo'] = 'fisica';
        }

        return $data;
    }
}
