<?php

namespace App\Controllers;

use App\Models\Cliente;

/**
 * 👤 Controller de Cliente
 * 
 * Herda de BaseController e reutiliza todo CRUD
 * Acrescenta métodos específicos conforme necessário
 */
class ClienteController extends BaseController
{

    /**
     * Inicializa a model de Cliente
     */
    protected function initModel()
    {
        $this->model = new Cliente();
    }

    /**
     * 🔍 Buscar cliente por CPF (método adicional)
     */
    public function buscaPorCpf()
    {
        $this->initModel();
        $cpf = $_GET['cpf'] ?? null;

        if (!$cpf) {
            return $this->error("CPF obrigatório", 400);
        }

        $dados = $this->model->findByCpf($cpf);
        if (!$dados) {
            return $this->notFound("Cliente não encontrado com este CPF");
        }

        return $this->success($dados);
    }

    /**
     * 🔍 Buscar cliente por nome (método adicional)
     */
    public function buscaPorNome()
    {
        $this->initModel();
        $nome = $_GET['nome'] ?? null;

        if (!$nome) {
            return $this->error("Nome obrigatório", 400);
        }

        $dados = $this->model->findByNome($nome);
        if (empty($dados)) {
            return $this->notFound("Nenhum cliente encontrado com este nome");
        }

        return $this->success($dados);
    }
}
