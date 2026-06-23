import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDlalGnxlb8K_Asvd83nEoca5kdqKet40c',
  authDomain: 'poe-aula-pdcia-2024.firebaseapp.com',
  databaseURL: 'https://poe-aula-pdcia-2024-default-rtdb.firebaseio.com',
  projectId: 'poe-aula-pdcia-2024',
  storageBucket: 'poe-aula-pdcia-2024.firebasestorage.app',
  messagingSenderId: '111407693692',
  appId: '1:111407693692:web:3785f9f9f62e59ca98aef9',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();

export default firebase;
