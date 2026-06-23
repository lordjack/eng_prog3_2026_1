<?php

/**
 * 🚀 PONTO DE ENTRADA DA API
 *
 * Arquivo: public/index.php
 *
 * Roteador principal que distribui requisições para controllers
 *
 * Endpoints suportados:
 * GET    /clientes                 → Listar todos
 * GET    /clientes?id=5            → Buscar um
 * GET    /clientes?cpf=12345678901 → Buscar por CPF
 * GET    /clientes?nome=João       → Buscar por nome
 * POST   /clientes                 → Criar novo
 * PUT    /clientes?id=5            → Atualizar
 * DELETE /clientes?id=5            → Deletar
 */

// ============================================================================
// 1️⃣ CONFIGURAÇÕES CORS E HEADERS
// ============================================================================

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Responder a preflight requests (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// ============================================================================
// 2️⃣ DEFINIR TIMEZONE E TRATAMENTO DE ERROS
// ============================================================================

date_default_timezone_set('America/Sao_Paulo');
ini_set('display_errors', 0);
error_reporting(E_ALL);

// ============================================================================
// 3️⃣ AUTOLOAD DE CLASSES
// ============================================================================

require_once __DIR__ . '/../src/Models/Database.php';
require_once __DIR__ . '/../src/Models/BaseModel.php';
require_once __DIR__ . '/../src/Models/Cliente.php';

require_once __DIR__ . '/../src/Controllers/BaseController.php';
require_once __DIR__ . '/../src/Controllers/ClienteController.php';

use App\Controllers\ClienteController;

// ============================================================================
// 4️⃣ CONFIGURAÇÃO DE ROTAS
// ============================================================================

class Router
{
    private $metodo;
    private $rota;
    private $controller;

    public function __construct()
    {
        $this->metodo = $_SERVER['REQUEST_METHOD'];
        $this->parseRoute();
    }

    /**
     * Extrai a rota da URL
     * /clientes → clientes
     * /clientes?id=5 → clientes
     */
    private function parseRoute()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Remove /APIModelo/public/ do caminho
        $uri = str_replace('/APIModelo/public', '', $uri);

        // Remove leading/trailing slashes
        $uri = trim($uri, '/');

        //  var_dump( $uri);
        //  exit;
        // Extrai primeira parte como rota
        $this->rota = explode('/', $uri)[0] ?: '';
    }

    /**
     * Executa a requisição apropriada
     */
    public function executar()
    {
        //var_dump($this->rota);
        // exit;
        // Se rota vazia, retorna erro
        if (empty($this->rota)) {
            return $this->erroRota('Nenhuma rota especificada');
        }

        // Mapear rotas para controllers
        switch ($this->rota) {
            case 'cliente':
                $this->controller = new ClienteController();
                $this->executarController();
                break;

            default:
                $this->erroRota("Rota '{$this->rota}' não encontrada");
        }
    }

    /**
     * Executa o método apropriado no controller
     */
    private function executarController()
    {
        try {
            // Verificar se há busca por CPF
            if (isset($_GET['cpf']) && $this->metodo === 'GET') {
                $this->controller->buscaPorCpf();
            }

            // Verificar se há busca por nome
            if (
                isset($_GET['nome']) &&
                $this->metodo === 'GET' &&
                !isset($_GET['cpf'])
            ) {
                $this->controller->buscaPorNome();
            }

            // Executar métodos padrão
            switch ($this->metodo) {
                case 'GET':
                    $this->controller->index();
                    break;
                case 'POST':
                    $this->controller->store();
                    break;
                case 'PUT':
                    $this->controller->update();
                    break;
                case 'DELETE':
                    $this->controller->destroy();
                    break;
                default:
                    $this->erroMetodo();
            }
        } catch (Exception $e) {
            $this->erroInterno($e->getMessage());
        }
    }

    /**
     * Erro de rota não encontrada
     */
    private function erroRota($mensagem)
    {
        http_response_code(404);
        echo json_encode(
            [
                'sucesso' => false,
                'codigo' => 404,
                'erro' => $mensagem,
                'timestamp' => date('Y-m-d H:i:s'),
                'dica' => 'Rotas disponíveis: /cliente',
            ],
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Erro de método não permitido
     */
    private function erroMetodo()
    {
        http_response_code(405);
        echo json_encode(
            [
                'sucesso' => false,
                'codigo' => 405,
                'erro' => "Método HTTP '{$this->metodo}' não permitido",
                'timestamp' => date('Y-m-d H:i:s'),
            ],
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Erro interno do servidor
     */
    private function erroInterno($mensagem)
    {
        http_response_code(500);
        echo json_encode(
            [
                'sucesso' => false,
                'codigo' => 500,
                'erro' => 'Erro interno: ' . $mensagem,
                'timestamp' => date('Y-m-d H:i:s'),
            ],
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
        );
    }
}

// ============================================================================
// 5️⃣ EXECUTAR ROTEADOR
// ============================================================================

$router = new Router();
$router->executar();
