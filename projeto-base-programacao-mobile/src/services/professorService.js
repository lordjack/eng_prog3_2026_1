// ================================================
// SERVIÇO DE PROFESSORES
// ================================================
import { listar, buscarPorId, criar, atualizar, excluir } from './firebaseService';

const COLECAO = 'professores';

export const listarProfessores = () => listar(COLECAO);
export const buscarProfessor = (id) => buscarPorId(COLECAO, id);
export const criarProfessor = (dados) => criar(COLECAO, dados);
export const atualizarProfessor = (id, dados) => atualizar(COLECAO, id, dados);
export const excluirProfessor = (id) => excluir(COLECAO, id);
