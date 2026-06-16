<?php

declare(strict_types=1);

namespace App\Application\Actions\Cliente;

use App\Application\Actions\Generic\GenericUpdateAction;

/**
 * UpdateClienteAction
 * PUT /clientes/{id}
 * Atualiza um cliente existente
 *
 * Campos que podem ser atualizados:
 * - nome, email, telefone, endereco, cidade, estado
 * - cep, cpf, cnpj, tipo, ativo
 */
class UpdateClienteAction extends GenericUpdateAction
{
    protected string $resourceName = 'cliente';
    protected array $allowedFields = ['nome', 'email', 'telefone', 'endereco', 'cidade', 'estado', 'cep', 'cpf', 'cnpj', 'tipo', 'ativo'];
}
