// ================================================
// SERVIÇO DE MATRÍCULAS
// ================================================
import { listar, buscarPorId, criar, atualizar, excluir } from './firebaseService';

const COLECAO = 'matriculas';

export const listarMatriculas = () => listar(COLECAO);
export const buscarMatricula = (id) => buscarPorId(COLECAO, id);
export const criarMatricula = (dados) => criar(COLECAO, dados);
export const atualizarMatricula = (id, dados) => atualizar(COLECAO, id, dados);
export const excluirMatricula = (id) => excluir(COLECAO, id);
