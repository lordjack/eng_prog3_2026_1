/**
 * api/api.js
 * ============================================================
 * Centraliza todas as chamadas ao WebService PHP.
 *
 * IMPORTANTE: altere BASE_URL para o IP da sua máquina
 * (não use "localhost" — o emulador/celular não encontra).
 *
 * Como descobrir o IP:
 *   Windows → abra o cmd e rode: ipconfig
 *   Procure por "Endereço IPv4", ex.: 192.168.1.10
 * ============================================================
 */

// 🔧 ALTERE AQUI para o IP da máquina que roda o servidor PHP
//
// ⚠️  "localhost" NÃO funciona no celular — aponta pro próprio celular!
//    No Windows: abra o CMD e rode  ipconfig
//    Copie o "Endereço IPv4", ex.: 192.168.1.10
//    Troque abaixo: "http://192.168.1.10/ServicosApi/refatorado"
const BASE_URL = "http://192.168.1.104/ServicosApi/refatorado";

// ─────────────────────────────────────────────
//  CLIENTES
// ─────────────────────────────────────────────

/**
 * Busca todos os clientes no banco de dados.
 * Método: GET
 * Retorna: Array de objetos { idCliente, nmCliente, nmEndereco, ... }
 */
export async function getClientes() {
  // fetch() faz a requisição HTTP. O await pausa até receber a resposta.
  const resposta = await fetch(`${BASE_URL}/clientes.php`);

  // .json() converte o texto JSON em objeto JavaScript
  const dados = await resposta.json();
  return dados;
}

// ─────────────────────────────────────────────
//  SERVIÇOS
// ─────────────────────────────────────────────

/**
 * Busca todos os serviços (com JOIN ao cliente).
 * Método: GET
 * Retorna: Array de objetos { idServico, nmCliente, dtRequisicao, ... }
 */
export async function getServicos() {
  const resposta = await fetch(`${BASE_URL}/servicos.php`);
  const dados = await resposta.json();
  return dados;
}

/**
 * Cadastra um novo serviço.
 * Método: POST — envia os dados no corpo da requisição em formato JSON.
 *
 * @param {object} servico - Objeto com os campos do serviço
 * @param {number} servico.idCliente       - OBRIGATÓRIO
 * @param {string} servico.idPrestador
 * @param {number} servico.vCustoMaterial
 * @param {number} servico.vCustoMaoDeObra
 * @param {string} servico.dtRequisicao    - formato: "YYYY-MM-DD HH:MM:SS"
 * @param {string} servico.dtInicio
 * @param {string} servico.dtFim
 *
 * Retorna: { sucesso: true, idServico: X } ou { sucesso: false, mensagem: "..." }
 */
// ─────────────────────────────────────────────
//  PRESTADORES
// ─────────────────────────────────────────────

/**
 * Busca todos os prestadores de serviço.
 * Método: GET
 * Retorna: Array de objetos { idPrestador, nmPrestador, ... }
 */
export async function getPrestadores() {
  const resposta = await fetch(`${BASE_URL}/prestadores.php`);
  const dados = await resposta.json();
  return dados;
}

export async function cadastrarServico(servico) {
  const resposta = await fetch(`${BASE_URL}/cadastrar_servico.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(servico),
  });
  const dados = await resposta.json();
  return dados;
}

/**
 * Atualiza um serviço existente.
 * Método: PUT
 * @param {object} servico - Objeto com idServico e campos a atualizar
 */
export async function atualizarServico(servico) {
  const resposta = await fetch(`${BASE_URL}/editar_servico.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    // Envia tanto 'id' quanto 'idServico' para compatibilidade com o PHP
    body: JSON.stringify({ ...servico, id: parseInt(servico.idServico) }),
  });
  const dados = await resposta.json();
  return dados;
}

/**
 * Exclui um serviço pelo ID.
 * Método: DELETE
 * @param {number} idServico
 */
export async function excluirServico(idServico) {
  const resposta = await fetch(
    `${BASE_URL}/excluir_servico.php?id=${parseInt(idServico)}`,
    { method: "DELETE" },
  );
  const dados = await resposta.json();
  return dados;
}
