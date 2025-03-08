import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native"; // Importa Platform para detectar el entorno
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyANIW_Rjj0rBYYONuWLYnkpo5qm50u2uSI",
  authDomain: "tecnix-52017.firebaseapp.com",
  projectId: "tecnix-52017",
  storageBucket: "tecnix-52017.appspot.com",
  messagingSenderId: "507707479407",
  appId: "1:507707479407:android:0e499811cc7f12a54ec49a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar Auth según el entorno
let auth;
if (Platform.OS === "web") {
  // En la web, usa getAuth sin persistencia personalizada
  const { getAuth } = require("firebase/auth");
  auth = getAuth(app);
} else {
  // En React Native, usa initializeAuth con persistencia
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// Obtener Firestore
const db = getFirestore(app);

// Exportar auth y db
export { auth, db };