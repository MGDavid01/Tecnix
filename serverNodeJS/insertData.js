// importacion de firebase con permisos de admin
const admin = require("firebase-admin");
// Credenciales
const serviceAccount = require("./serviceAccountKey.json");
// Importacion de los datos a insertar
// Agrega el nombre de tu archivo despues de data/
// Mira Location.js para que veas como esta la estructura de los datos
const sampleData = require("./data/.js");
// Inserta el nombre EXACTO de la coleccion
// Si te equivocas por mayuscula se crea otra y valio m
const coleccion = "";
// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Inicialicion de la base de datos con permisos admin
const db = admin.firestore();
// Función para insertar datos
async function insertLocations() {
    const collectionRef = db.collection(coleccion);
    // Por cada data de sample data hace try 
    // Si falla manda un error en terminal
    for (const data of sampleData) {
        try {
            await collectionRef.add(data);
            console.log(`Data "${data.id}" insertada correctamente.`);
        } catch (error) {
            console.error(`Error insertando "${data.id}":`, error);
        }
    }
    console.log("Inserción completada.");
}

// Ejecuta la función
insertLocations();