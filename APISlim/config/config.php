<?php

/**
 * Arquivo de Configuração da API
 * 
 * Este arquivo centraliza todas as configurações da aplicação.
 * Os alunos devem editar aqui as configurações do banco de dados.
 */

// Configurações do Banco de Dados
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');  // Laragon não usa senha por padrão
define('DB_NAME', 'db_prog3_eng_2026_1');  // Ajuste conforme seu banco

// Ambiente (development, testing, production)
define('ENVIRONMENT', 'development');

// Debug Mode
define('DEBUG', true);

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Chave secreta para JWT (gerar com hash aleatório)
define('JWT_SECRET', 'sua_chave_secreta_muito_segura_aqui_mude_isso');

// Configurações de CORS
define('ALLOWED_ORIGINS', ['http://localhost:19000', 'http://localhost:3000', 'http://localhost:8081']);

return [
    'settings' => [
        'displayErrorDetails' => DEBUG,
        'logErrorDetails' => true,
        'db' => [
            'host' => DB_HOST,
            'user' => DB_USER,
            'pass' => DB_PASS,
            'name' => DB_NAME,
        ]
    ]
];
