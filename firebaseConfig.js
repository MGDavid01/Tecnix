// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  //Aqui se obtiene lo del firestore

const firebaseConfig = {
  apiKey: "AIzaSyANIW_Rjj0rBYYONuWLYnkpo5qm50u2uSI",
  authDomain: "tecnix-52017.firebaseapp.com",  // Este valor no aparece en tu json, pero sigue este formato
  projectId: "tecnix-52017",
  storageBucket: "tecnix-52017.appspot.com",  // Corrigiendo el formato de storage
  messagingSenderId: "507707479407",
  appId: "1:507707479407:android:0e499811cc7f12a54ec49a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//constante de db para el uso de la base de datos
const db = getFirestore(app);

export { auth };

//Exportacion de db
export { db };