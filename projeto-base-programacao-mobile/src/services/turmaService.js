// ================================================
// SERVIÇO DE TURMAS
// ================================================
import { listar, buscarPorId, criar, atualizar, excluir } from './firebaseService';

const COLECAO = 'turmas';

export const listarTurmas = () => listar(COLECAO);
export const buscarTurma = (id) => buscarPorId(COLECAO, id);
export const criarTurma = (dados) => criar(COLECAO, dados);
export const atualizarTurma = (id, dados) => atualizar(COLECAO, id, dados);
export const excluirTurma = (id) => excluir(COLECAO, id);
