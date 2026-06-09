<?php

namespace App\Controllers;

use App\Models\Servico;

/**
 * Controller para gerenciar operações com Serviços
 * 
 * Demonstra o padrão MVC com Controllers
 * 
 * Endpoints:
 * GET    /api/servicos          - Lista todos os serviços
 * GET    /api/servicos/{id}     - Obtém um serviço específico
 * POST   /api/servicos          - Cria um novo serviço
 * PUT    /api/servicos/{id}     - Atualiza um serviço
 * DELETE /api/servicos/{id}     - Deleta um serviço
 */
class ServicoController
{
    private $servicoModel;

    /**
     * Construtor - Injeção de dependência
     */
    public function __construct()
    {
        $this->servicoModel = new Servico();
    }

    /**
     * Função auxiliar para retornar JSON de sucesso
     */
    private function successResponse($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        return json_encode([
            'success' => true,
            'statusCode' => $statusCode,
            'data' => $data
        ]);
    }

    /**
     * Função auxiliar para retornar JSON de erro
     */
    private function errorResponse($message, $statusCode = 400, $errors = null)
    {
        http_response_code($statusCode);
        $response = [
            'success' => false,
            'statusCode' => $statusCode,
            'message' => $message
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return json_encode($response);
    }

    /**
     * GET /api/servicos
     * Lista todos os serviços
     */
    public function listarServicos($params = [])
    {
        try {
            $servicos = $this->servicoModel->getAll();
            return $this->successResponse($servicos, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('Erro ao listar serviços: ' . $e->getMessage(), 500);
        }
    }

    /**
     * GET /api/servicos/{id}
     * Obtém um serviço específico
     */
    public function obterServico($params = [])
    {
        try {
            $id = $params['id'] ?? null;

            if (!$id || !is_numeric($id)) {
                return $this->errorResponse('ID inválido', 400);
            }

            $servico = $this->servicoModel->getById($id);

            if (!$servico) {
                return $this->errorResponse('Serviço não encontrado', 404);
            }

            return $this->successResponse($servico, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('Erro ao obter serviço: ' . $e->getMessage(), 500);
        }
    }

    /**
     * POST /api/servicos
     * Cria um novo serviço
     */
    public function criarServico($params = [])
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            // Validar dados recebidos
            if (empty($data)) {
                return $this->errorResponse('Nenhum dado foi enviado', 400);
            }

            // Preencher o modelo
            $this->servicoModel->setTitulo($data['titulo'] ?? '');
            $this->servicoModel->setDescricao($data['descricao'] ?? '');
            $this->servicoModel->setPreco($data['preco'] ?? '');
            $this->servicoModel->setCategoria($data['categoria'] ?? '');
            $this->servicoModel->setIdPrestador($data['id_prestador'] ?? '');

            // Validar os dados
            $validationErrors = $this->servicoModel->validate();
            if ($validationErrors) {
                return $this->errorResponse('Erro de validação', 422, $validationErrors);
            }

            // Criar o serviço
            if ($this->servicoModel->create()) {
                return $this->successResponse([
                    'message' => 'Serviço criado com sucesso'
                ], 201);
            }

            return $this->errorResponse('Erro ao criar serviço', 500);
        } catch (\Exception $e) {
            return $this->errorResponse('Erro ao criar serviço: ' . $e->getMessage(), 500);
        }
    }

    /**
     * PUT /api/servicos/{id}
     * Atualiza um serviço
     */
    public function atualizarServico($params = [])
    {
        try {
            $id = $params['id'] ?? null;

            if (!$id || !is_numeric($id)) {
                return $this->errorResponse('ID inválido', 400);
            }

            // Verificar se serviço existe
            $servico = $this->servicoModel->getById($id);
            if (!$servico) {
                return $this->errorResponse('Serviço não encontrado', 404);
            }

            $data = json_decode(file_get_contents('php://input'), true);

            if (empty($data)) {
                return $this->errorResponse('Nenhum dado foi enviado', 400);
            }

            // Preencher o modelo com dados existentes + novos
            $this->servicoModel->setId($id);
            $this->servicoModel->setTitulo($data['titulo'] ?? $servico['titulo']);
            $this->servicoModel->setDescricao($data['descricao'] ?? $servico['descricao']);
            $this->servicoModel->setPreco($data['preco'] ?? $servico['preco']);
            $this->servicoModel->setCategoria($data['categoria'] ?? $servico['categoria']);

            // Validar
            $validationErrors = $this->servicoModel->validate();
            if ($validationErrors) {
                return $this->errorResponse('Erro de validação', 422, $validationErrors);
            }

            // Atualizar
            if ($this->servicoModel->update()) {
                return $this->successResponse([
                    'message' => 'Serviço atualizado com sucesso'
                ], 200);
            }

            return $this->errorResponse('Erro ao atualizar serviço', 500);
        } catch (\Exception $e) {
            return $this->errorResponse('Erro ao atualizar serviço: ' . $e->getMessage(), 500);
        }
    }

    /**
     * DELETE /api/servicos/{id}
     * Deleta um serviço
     */
    public function deletarServico($params = [])
    {
        try {
            $id = $params['id'] ?? null;

            if (!$id || !is_numeric($id)) {
                return $this->errorResponse('ID inválido', 400);
            }

            // Verificar se serviço existe
            $servico = $this->servicoModel->getById($id);
            if (!$servico) {
                return $this->errorResponse('Serviço não encontrado', 404);
            }

            // Deletar
            if ($this->servicoModel->delete($id)) {
                return $this->successResponse([
                    'message' => 'Serviço deletado com sucesso'
                ], 200);
            }

            return $this->errorResponse('Erro ao deletar serviço', 500);
        } catch (\Exception $e) {
            return $this->errorResponse('Erro ao deletar serviço: ' . $e->getMessage(), 500);
        }
    }
}
