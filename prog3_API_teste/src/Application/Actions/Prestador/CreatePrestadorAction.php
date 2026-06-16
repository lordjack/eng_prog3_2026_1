<?php

declare(strict_types=1);

namespace App\Application\Actions\Prestador;

use App\Application\Actions\Generic\GenericCreateAction;

/**
 * CreatePrestadorAction
 * 
 * Exemplo: Customizar com validação específica
 */
class CreatePrestadorAction extends GenericCreateAction
{
    protected string $resourceName = 'prestador';

    protected array $requiredFields = ['nmPrestador', 'nmContato'];
    protected array $allowedFields = ['nmPrestador', 'nmContato', 'nmCPF', 'nmCNPJ'];

    /**
     * Validação customizada
     */
    protected function validate(array $data): void
    {
        // Chamar validação de campos obrigatórios
        parent::validate($data);

        // Validação específica: se tiver CPF, verificar formato
        if (!empty($data['nmCPF'])) {
            // Aqui colocaria validação real de CPF
            if (strlen(preg_replace('/\D/', '', $data['nmCPF'])) !== 11) {
                throw new \Exception("CPF inválido");
            }
        }

        // Validação específica: se tiver CNPJ, verificar formato
        if (!empty($data['nmCNPJ'])) {
            if (strlen(preg_replace('/\D/', '', $data['nmCNPJ'])) !== 14) {
                throw new \Exception("CNPJ inválido");
            }
        }
    }
}
