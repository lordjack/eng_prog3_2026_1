// ================================================
// SERVIÇO DE ALUNOS (Firebase v8)
// ================================================
import {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
} from './firebaseService';
import { storage } from '../config/firebase';

import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
} from '../config/cloudinary';

const COLECAO = 'alunos';

// Lista todos os alunos
export const listarAlunos = () => listar(COLECAO);

// Busca aluno pelo ID
export const buscarAluno = (id) => buscarPorId(COLECAO, id);

// Cria um novo aluno
export const criarAluno = (dados) => criar(COLECAO, dados);

// Atualiza dados do aluno
export const atualizarAluno = (id, dados) => atualizar(COLECAO, id, dados);

// Exclui um aluno
export const excluirAluno = (id) => excluir(COLECAO, id);

// Faz upload da foto do aluno para o Cloudinary e retorna a URL pública
export const uploadFotoAluno = async (id, imagemUri) => {
  // Monta o FormData com o arquivo e as credenciais do Cloudinary
  const formData = new FormData();
  formData.append('file', {
    uri: imagemUri,
    type: 'image/jpeg',
    name: `aluno_${id}.jpg`,
  });
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  // public_id define o nome/caminho do arquivo no Cloudinary
  formData.append('public_id', `fotos_alunos/aluno_${id}`);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(
      erro?.error?.message || 'Falha no upload para o Cloudinary.'
    );
  }

  const json = await response.json();
  // secure_url é a URL pública HTTPS da imagem no Cloudinary
  return json.secure_url;
};

/*
// Faz upload da foto do aluno e retorna a URL (Firebase v8)
export const uploadFotoAluno = async (id, imagemUri) => {
    // Converte a imagem para blob (formato binário)
    const response = await fetch(imagemUri);
    const blob = await response.blob();

    // Define o caminho no Firebase Storage
    const storageRef = storage.ref(`fotos_alunos/${id}.jpg`);

    // Faz o upload
    await storageRef.put(blob);

    // Retorna a URL pública da foto
    const url = await storageRef.getDownloadURL();
    return url;
};

*/
