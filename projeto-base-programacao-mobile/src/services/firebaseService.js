// ================================================
// SERVIÇO GENÉRICO DE CRUD - REALTIME DATABASE (Firebase v8)
// ================================================
// Este arquivo centraliza as operações básicas
// de banco de dados. Cada entidade o reutiliza.
//
// Estrutura no Realtime Database:
//   /nomeColecao
//     /<id-gerado-pelo-firebase>
//       campo1: valor
//       campo2: valor
//       criadoEm: timestamp (número em ms)
// ================================================

import { db } from '../config/firebase';
import firebase from '../config/firebase';

// Timestamp do servidor (Realtime Database)
const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;

// Listar todos os registros de uma coleção
export const listar = async (nomeColecao) => {
    const snapshot = await db.ref(nomeColecao).once('value');
    const val = snapshot.val();
    if (!val) return [];
    // Converte objeto { id: {dados} } em array [{ id, ...dados }]
    const lista = Object.entries(val).map(([id, dados]) => ({ id, ...dados }));
    // Ordena localmente por criadoEm (mais recentes primeiro)
    return lista.sort((a, b) => (b.criadoEm ?? 0) - (a.criadoEm ?? 0));
};

// Buscar um único registro por ID
export const buscarPorId = async (nomeColecao, id) => {
    const snapshot = await db.ref(nomeColecao).child(id).once('value');
    if (snapshot.exists()) {
        return { id: snapshot.key, ...snapshot.val() };
    }
    return null;
};

// Criar um novo registro (Firebase gera o ID automaticamente)
export const criar = async (nomeColecao, dados) => {
    const ref = await db.ref(nomeColecao).push({
        ...dados,
        criadoEm: TIMESTAMP,
        atualizadoEm: TIMESTAMP,
    });
    return ref.key;
};

// Atualizar um registro existente
export const atualizar = async (nomeColecao, id, dados) => {
    await db.ref(nomeColecao).child(id).update({
        ...dados,
        atualizadoEm: TIMESTAMP,
    });
};

// Excluir um registro
export const excluir = async (nomeColecao, id) => {
    await db.ref(nomeColecao).child(id).remove();
};

