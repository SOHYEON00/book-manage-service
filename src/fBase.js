import firebase from 'firebase/app';
import 'firebase/firestore';

// const firebase = require('firebase');
// require('firebase/firestore');

// initialize cloud firestore
const firebaseConfig = ({
    apiKey: "AIzaSyApwNDBtMuLCeVLIrIuKHEA8rXHNzSaZM8",
    authDomain: "book-management-95041.firebaseapp.com",
    projectId: "book-management-95041",
    storageBucket: "book-management-95041.appspot.com",
    messagingSenderId: "385551841011",
    appId: "1:385551841011:web:4ab782c1fef95095afa986"
});

export default firebase.initializeApp(firebaseConfig);

export const dbService = firebase.firestore();