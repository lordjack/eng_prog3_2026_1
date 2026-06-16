<?php

declare(strict_types=1);

use App\Domain\Cliente\ClienteRepository;
use App\Domain\Prestador\PrestadorRepository;
use App\Domain\User\UserRepository;
use App\Infrastructure\Persistence\Cliente\ClienteRepository as ClienteRepositoryImpl;
use App\Infrastructure\Persistence\Prestador\PrestadorRepository as PrestadorRepositoryImpl;
use App\Infrastructure\Persistence\User\InMemoryUserRepository;
use DI\ContainerBuilder;

return function (ContainerBuilder $containerBuilder) {
    // Registrar repositórios de domínio
    $containerBuilder->addDefinitions([
        // Repositório de Usuários (in-memory, para testes)
        UserRepository::class => \DI\autowire(InMemoryUserRepository::class),

        // Repositório de Clientes (MySQL/PDO)
        ClienteRepository::class => \DI\autowire(ClienteRepositoryImpl::class),

        // Repositório de Prestadores (MySQL/PDO)
        PrestadorRepository::class => \DI\autowire(PrestadorRepositoryImpl::class),
    ]);
};
