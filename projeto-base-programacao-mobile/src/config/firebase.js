// ================================================
// CONFIGURAÇÃO DO FIREBASE v8
// ================================================
// No Firebase v8 importamos o app principal e depois
// os módulos que vamos usar (firestore, storage).
// ================================================

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDlalGnxlb8K_Asvd83nEoca5kdqKet40c",
    authDomain: "poe-aula-pdcia-2024.firebaseapp.com",
    databaseURL: "https://poe-aula-pdcia-2024-default-rtdb.firebaseio.com",
    projectId: "poe-aula-pdcia-2024",
    storageBucket: "poe-aula-pdcia-2024.appspot.com",
    messagingSenderId: "111407693692",
    appId: "1:111407693692:web:ef48ce903346c5b198aef9"
};

// Evita inicializar mais de uma vez (hot reload do Expo)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Exporta o Realtime Database
export const db = firebase.database();

// Exporta o Storage para armazenar fotos
export const storage = firebase.storage();

export default firebase;
