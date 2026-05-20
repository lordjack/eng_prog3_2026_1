// ================================================
// CONFIGURAÇÃO DO CLOUDINARY
// ================================================
// Serviço gratuito de armazenamento de imagens.
// Plano gratuito: 25 GB de armazenamento + 25 GB/mês de banda.
//
// COMO CONFIGURAR:
//   1. Crie uma conta gratuita em: https://cloudinary.com
//   2. No painel, vá em Settings → Upload
//   3. Clique em "Add upload preset" e defina o modo como "Unsigned"
//   4. Preencha as constantes abaixo com seus dados
// ================================================

export const CLOUDINARY_CLOUD_NAME = 'dr7que2pe'; // Ex: 'meu-app-mobile'
export const CLOUDINARY_UPLOAD_PRESET = 'assets'; // Ex: 'fotos_alunos'

// URL base da API de upload
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
