<?php

/**
 * Arquivo Principal da API - Versão Simplificada
 * Sem dependência de Composer (funciona direto!)
 * 
 * Este é o ponto de entrada de toda a aplicação.
 */

// Carregar arquivo de configuração
require_once __DIR__ . '/../config/config.php';

/**
 * ============================================================
 * AUTOLOADER SIMPLES (sem Composer)
 * ============================================================
 */
function autoload($class)
{
    $prefix = 'App\\';
    $len = strlen($prefix);

    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = __DIR__ . '/../src/' . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
}

spl_autoload_register('autoload');

/**
 * ============================================================
 * ROTEADOR SIMPLES (sem Slim)
 * ============================================================
 */

class SimpleRouter
{
    private $routes = [];
    private $method;
    private $uri;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];

        // Extrair URI do REQUEST_URI
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Remover /eng_prog3_2026_1/APISlim/public da URI
        $basePaths = [
            '/eng_prog3_2026_1/APISlim/public/index.php',
            '/eng_prog3_2026_1/APISlim/public',
            '/APISlim/public/index.php',
            '/APISlim/public',
        ];

        foreach ($basePaths as $basePath) {
            if (strpos($uri, $basePath) === 0) {
                $uri = substr($uri, strlen($basePath));
                break;
            }
        }

        // Garantir que comece com /
        if (empty($uri)) {
            $uri = '/';
        } elseif ($uri[0] !== '/') {
            $uri = '/' . $uri;
        }

        // Remove trailing slash e query string
        $uri = rtrim($uri, '/') ?: '/';
        $this->uri = $uri;
    }

    public function get($path, $callback)
    {
        $this->register('GET', $path, $callback);
    }

    public function post($path, $callback)
    {
        $this->register('POST', $path, $callback);
    }

    public function put($path, $callback)
    {
        $this->register('PUT', $path, $callback);
    }

    public function delete($path, $callback)
    {
        $this->register('DELETE', $path, $callback);
    }

    public function options($path, $callback)
    {
        $this->register('OPTIONS', $path, $callback);
    }

    private function register($method, $path, $callback)
    {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'callback' => $callback
        ];
    }

    public function dispatch()
    {
        // Tratar requisições OPTIONS (CORS preflight)
        if ($this->method === 'OPTIONS') {
            $this->sendCorsHeaders();
            http_response_code(200);
            return;
        }

        // Procurar a rota
        foreach ($this->routes as $route) {
            if ($route['method'] !== $this->method) {
                continue;
            }

            $params = $this->matchPath($route['path'], $this->uri);
            if ($params !== false) {
                $this->sendCorsHeaders();
                return call_user_func($route['callback'], $params);
            }
        }

        // Rota não encontrada
        $this->sendCorsHeaders();
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'statusCode' => 404,
            'message' => 'Rota não encontrada: ' . $this->method . ' ' . $this->uri
        ]);
    }

    private function matchPath($pattern, $uri)
    {
        // Converter padrão /api/servicos/{id} para regex
        $regex = preg_replace('/\{([^}]+)\}/', '(?P<$1>[^/]+)', $pattern);
        $regex = '^' . $regex . '$';

        if (preg_match('#' . $regex . '#', $uri, $matches)) {
            // Remover matches numéricos
            return array_filter($matches, function ($key) {
                return !is_numeric($key);
            }, ARRAY_FILTER_USE_KEY);
        }

        return false;
    }

    private function sendCorsHeaders()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Content-Type: application/json');
    }
}

/**
 * ============================================================
 * INICIALIZAR ROTEADOR
 * ============================================================
 */

$router = new SimpleRouter();

/**
 * Rota de teste - verificar se API está funcionando
 * GET /api/health
 */
$router->get('/api/health', function ($params) {
    return json_encode([
        'success' => true,
        'statusCode' => 200,
        'data' => [
            'status' => 'online',
            'message' => 'API está funcionando corretamente!',
            'timestamp' => date('Y-m-d H:i:s'),
            'environment' => ENVIRONMENT
        ]
    ]);
});

/**
 * ============================================================
 * ROTAS DE SERVIÇOS
 * ============================================================
 */

use App\Controllers\ServicoController;

$servicoController = new ServicoController();

// GET /api/servicos - Listar todos os serviços
$router->get('/api/servicos', function ($params) use ($servicoController) {
    return $servicoController->listarServicos($params);
});

// GET /api/servicos/{id} - Obter um serviço específico
$router->get('/api/servicos/{id}', function ($params) use ($servicoController) {
    return $servicoController->obterServico($params);
});

// POST /api/servicos - Criar um novo serviço
$router->post('/api/servicos', function ($params) use ($servicoController) {
    return $servicoController->criarServico($params);
});

// PUT /api/servicos/{id} - Atualizar um serviço
$router->put('/api/servicos/{id}', function ($params) use ($servicoController) {
    return $servicoController->atualizarServico($params);
});

// DELETE /api/servicos/{id} - Deletar um serviço
$router->delete('/api/servicos/{id}', function ($params) use ($servicoController) {
    return $servicoController->deletarServico($params);
});

/**
 * ============================================================
 * EXECUTAR ROTEADOR
 * ============================================================
 */

echo $router->dispatch();
