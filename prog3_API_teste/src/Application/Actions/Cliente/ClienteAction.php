<?php

declare(strict_types=1);

namespace App\Application\Actions\Cliente;

/**
 * ClienteAction
 * 
 * ⚠️ DEPRECADO - Classe mantida apenas para compatibilidade
 * 
 * As Actions de Cliente agora herdam diretamente das GenericActions:
 * - ListClientesAction extends GenericListAction
 * - ViewClienteAction extends GenericViewAction
 * - CreateClienteAction extends GenericCreateAction
 * - UpdateClienteAction extends GenericUpdateAction
 * - DeleteClienteAction extends GenericDeleteAction
 * - SearchClientesAction extends GenericSearchAction
 * 
 * As GenericActions já fazem injeção de dependências via DI Container.
 */
class ClienteAction
{
    // Classe mantida vazia - não mais utilizada
    // Remova quando terminar migração de código antigo
}
