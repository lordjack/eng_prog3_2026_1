// ================================================
// SERVIÇO DE CURSOS
// ================================================
import { listar, buscarPorId, criar, atualizar, excluir } from './firebaseService';

const COLECAO = 'cursos';

export const listarCursos = () => listar(COLECAO);
export const buscarCurso = (id) => buscarPorId(COLECAO, id);
export const criarCurso = (dados) => criar(COLECAO, dados);
export const atualizarCurso = (id, dados) => atualizar(COLECAO, id, dados);
export const excluirCurso = (id) => excluir(COLECAO, id);
