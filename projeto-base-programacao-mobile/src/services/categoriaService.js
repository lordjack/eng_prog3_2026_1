// ================================================
// SERVIÇO DE CATEGORIAS DE ALUNO
// ================================================
import { listar, buscarPorId, criar, atualizar, excluir } from './firebaseService';

const COLECAO = 'categorias_aluno';

export const listarCategorias = () => listar(COLECAO);
export const buscarCategoria = (id) => buscarPorId(COLECAO, id);
export const criarCategoria = (dados) => criar(COLECAO, dados);
export const atualizarCategoria = (id, dados) => atualizar(COLECAO, id, dados);
export const excluirCategoria = (id) => excluir(COLECAO, id);
