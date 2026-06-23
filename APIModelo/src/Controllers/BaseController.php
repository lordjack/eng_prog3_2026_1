<?php

namespace App\Controllers;

use Exception;

/**
 * 🎯 Classe base para todos os controllers
 *
 * Implementa CRUD genérico para qualquer model
 * Cada controller específico herda dela e define a model
 */
abstract class BaseController
{
    protected $model;

    /**
     * Deve ser implementado em cada controller específico
     * Define qual model será usada
     */
    abstract protected function initModel();

    /**
     * 📖 GET - Listar todos ou um específico
     * GET /clientes          → Lista todos
     * GET /clientes/5        → Um específico (id=5)
     */
    public function index()
    {
        $this->initModel();
        $id = $_GET['id'] ?? null;

        if ($id) {
            $dados = $this->model->findById($id);
            if (!$dados) {
                return $this->notFound('Registro não encontrado');
            }
        } else {
            $dados = $this->model->all();
        }

        return $this->success($dados);
    }

    /**
     * ✅ POST - Criar novo
     * POST /clientes
     * Body: {"nome": "João", "cpf": "12345678901", "telefone": "11999999999"}
     */
    public function store()
    {
        $this->initModel();
        $dados = $this->getRequestData();
        if (!$dados) {
            return $this->error('Dados vazios', 400);
        }
        // Validar se existe método validate na model
        if (method_exists($this->model, 'validate')) {
            $erros = $this->model->validate($dados);
            if (!empty($erros)) {
                return $this->error(
                    'Validação falhou: ' . implode(', ', $erros),
                    400
                );
            }
        }
        try {
            $this->model->create($dados);
            return $this->success(
                ['mensagem' => 'Registro criado com sucesso'],
                201
            );
        } catch (Exception $e) {
            return $this->error('Erro ao criar: ' . $e->getMessage(), 400);
        }
    }

    /**
     * ✏️ PUT - Atualizar
     * PUT /clientes?id=5
     * Body: {"nome": "João Silva", "telefone": "11988888888"}
     */
    public function update()
    {
        $this->initModel();
        $id = $_GET['id'] ?? null;
        $dados = $this->getRequestData();

        if (!$id) {
            return $this->error('ID obrigatório (?id=X)', 400);
        }

        if (!$dados) {
            return $this->error('Dados vazios', 400);
        }

        try {
            $this->model->update($id, $dados);
            return $this->success([
                'mensagem' => 'Registro atualizado com sucesso',
            ]);
        } catch (Exception $e) {
            return $this->error('Erro ao atualizar: ' . $e->getMessage(), 400);
        }
    }

    /**
     * 🗑️ DELETE - Remover
     * DELETE /clientes?id=5
     */
    public function destroy()
    {
        $this->initModel();
        $id = $_GET['id'] ?? null;

        if (!$id) {
            return $this->error('ID obrigatório (?id=X)', 400);
        }

        try {
            $model = $this->model->findById($id);

            if (!$model) {
                throw new Exception("Erro ID $id não Existe");
            }

            $this->model->delete($id);
            return $this->success([
                'mensagem' => 'Registro deletado com sucesso',
            ]);
        } catch (Exception $e) {
            return $this->error('Erro ao deletar: ' . $e->getMessage(), 400);
        }
    }

    /**
     * Lê dados JSON do request
     */
    protected function getRequestData()
    {
        $json = file_get_contents('php://input');
        if (!$json) {
            return null;
        }

        $dados = json_decode($json, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('JSON inválido: ' . json_last_error_msg());
        }

        return $dados;
    }

    /**
     * ✅ Resposta de sucesso padronizada
     */
    protected function success($dados, $codigo = 200)
    {
        http_response_code($codigo);
        echo json_encode(
            [
                'sucesso' => true,
                'codigo' => $codigo,
                'dados' => $dados,
                'timestamp' => date('Y-m-d H:i:s'),
            ],
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        );
        exit();
    }

    /**
     * ❌ Resposta de erro padronizada
     */
    protected function error($mensagem, $codigo = 500)
    {
        http_response_code($codigo);
        echo json_encode(
            [
                'sucesso' => false,
                'codigo' => $codigo,
                'erro' => $mensagem,
                'timestamp' => date('Y-m-d H:i:s'),
            ],
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        );
        exit();
    }

    /**
     * ❌ Erro 404
     */
    protected function notFound($mensagem)
    {
        return $this->error($mensagem, 404);
    }
}
