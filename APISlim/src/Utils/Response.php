<?php

namespace App\Utils;

use Psr\Http\Message\ResponseInterface;

/**
 * Classe para padronizar respostas da API
 * 
 * Uso:
 * Response::json($response, ['id' => 1, 'nome' => 'Teste'], 200);
 */
class Response
{
    /**
     * Retorna resposta em JSON
     * 
     * @param ResponseInterface $response
     * @param mixed $data Dados a serem retornados
     * @param int $statusCode Código HTTP
     * @return ResponseInterface
     */
    public static function json(ResponseInterface $response, $data, $statusCode = 200)
    {
        $response = $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($statusCode);

        $response->getBody()->write(json_encode($data));
        return $response;
    }

    /**
     * Retorna resposta de sucesso
     * 
     * @param ResponseInterface $response
     * @param mixed $data
     * @param int $statusCode
     * @return ResponseInterface
     */
    public static function success(ResponseInterface $response, $data = null, $statusCode = 200)
    {
        $payload = [
            'success' => true,
            'statusCode' => $statusCode,
            'data' => $data
        ];

        return self::json($response, $payload, $statusCode);
    }

    /**
     * Retorna resposta de erro
     * 
     * @param ResponseInterface $response
     * @param string $message Mensagem de erro
     * @param int $statusCode Código HTTP de erro
     * @return ResponseInterface
     */
    public static function error(ResponseInterface $response, $message = 'Erro na requisição', $statusCode = 400)
    {
        $payload = [
            'success' => false,
            'statusCode' => $statusCode,
            'message' => $message
        ];

        return self::json($response, $payload, $statusCode);
    }

    /**
     * Retorna resposta de validação com erros
     * 
     * @param ResponseInterface $response
     * @param array $errors Array de erros
     * @return ResponseInterface
     */
    public static function validationError(ResponseInterface $response, $errors = [])
    {
        $payload = [
            'success' => false,
            'statusCode' => 422,
            'message' => 'Erro de validação',
            'errors' => $errors
        ];

        return self::json($response, $payload, 422);
    }
}
