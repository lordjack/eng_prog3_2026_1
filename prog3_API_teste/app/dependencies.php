<?php

declare(strict_types=1);

use App\Application\Settings\SettingsInterface;
use DI\ContainerBuilder;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        LoggerInterface::class => function (ContainerInterface $c) {
            $settings = $c->get(SettingsInterface::class);

            $loggerSettings = $settings->get('logger');
            $logger = new Logger($loggerSettings['name']);

            $processor = new UidProcessor();
            $logger->pushProcessor($processor);

            $handler = new StreamHandler($loggerSettings['path'], $loggerSettings['level']);
            $logger->pushHandler($handler);

            return $logger;
        },

        // Conexão PDO com MySQL
        \PDO::class => function (ContainerInterface $c) {
            $host = 'localhost';
            $db = 'db_prog3_eng_2026_1';
            $user = 'root';
            $password = '';

            $dsn = "mysql:host={$host};dbname={$db};charset=utf8mb4";

            try {
                $pdo = new \PDO($dsn, $user, $password, [
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                    \PDO::ATTR_EMULATE_PREPARES => false,
                ]);
                return $pdo;
            } catch (\PDOException $e) {
                throw new \Exception("Erro de conexão com banco de dados: " . $e->getMessage());
            }
        },
    ]);

    // Registrar Actions de Cliente com injeção de ClienteRepository
    $containerBuilder->addDefinitions([
        \App\Application\Actions\Cliente\ListClientesAction::class => \DI\factory(function (ContainerInterface $c) {
            return new \App\Application\Actions\Cliente\ListClientesAction(
                $c->get(\Psr\Log\LoggerInterface::class),
                $c->get(\App\Domain\Cliente\ClienteRepository::class)
            );
        }),
        \App\Application\Actions\Cliente\ViewClienteAction::class => \DI\factory(function (ContainerInterface $c) {
            return new \App\Application\Actions\Cliente\ViewClienteAction(
                $c->get(\Psr\Log\LoggerInterface::class),
                $c->get(\App\Domain\Cliente\ClienteRepository::class)
            );
        }),
        \App\Application\Actions\Cliente\CreateClienteAction::class => \DI\factory(function (ContainerInterface $c) {
            return new \App\Application\Actions\Cliente\CreateClienteAction(
                $c->get(\Psr\Log\LoggerInterface::class),
                $c->get(\App\Domain\Cliente\ClienteRepository::class)
            );
        }),
        \App\Application\Actions\Cliente\UpdateClienteAction::class => \DI\factory(function (ContainerInterface $c) {
            return new \App\Application\Actions\Cliente\UpdateClienteAction(
                $c->get(\Psr\Log\LoggerInterface::class),
                $c->get(\App\Domain\Cliente\ClienteRepository::class)
            );
        }),
        \App\Application\Actions\Cliente\DeleteClienteAction::class => \DI\factory(function (ContainerInterface $c) {
            return new \App\Application\Actions\Cliente\DeleteClienteAction(
                $c->get(\Psr\Log\LoggerInterface::class),
                $c->get(\App\Domain\Cliente\ClienteRepository::class)
            );
        }),
        \App\Application\Actions\Cliente\SearchClientesAction::class => \DI\factory(function (ContainerInterface $c) {
            return new \App\Application\Actions\Cliente\SearchClientesAction(
                $c->get(\Psr\Log\LoggerInterface::class),
                $c->get(\App\Domain\Cliente\ClienteRepository::class)
            );
        }),
    ]);
};
