<?php

namespace App\Models;

/**
 * 👤 Model de Cliente
 * 
 * Herda de BaseModel e reutiliza todo CRUD
 * Tabela: clientes
 * Campos: id, nome, cpf, telefone
 */
class Cliente extends BaseModel
{

    protected $table = 'cliente';

    /**
     * 🔍 Buscar cliente por CPF
     */
    public function findByCpf($cpf)
    {
        return $this->findBy('cpf', $cpf);
    }

    /**
     * 🔍 Buscar cliente por nome (com LIKE)
     */
    public function findByNome($nome)
    {
        return $this->search('nome', $nome);
    }

    /**
     * ✅ Validar dados do cliente
     */
    public function validate($dados)
    {
        $erros = [];

        // Validar nome
        if (empty($dados['nome'] ?? null)) {
            $erros[] = "Nome é obrigatório";
        }

        // Validar CPF (11 dígitos)
        $cpf = $dados['cpf'] ?? null;
        if (empty($cpf)) {
            $erros[] = "CPF é obrigatório";
        } elseif (!preg_match('/^\d{11}$/', $cpf)) {
            $erros[] = "CPF deve conter 11 dígitos";
        }

        // Validar telefone
        if (empty($dados['telefone'] ?? null)) {
            $erros[] = "Telefone é obrigatório";
        }

        return $erros;
    }
}
