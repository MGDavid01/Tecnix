require('dotenv').config();
// importacion de firebase con permisos de admin
const admin = require("firebase-admin");

// Credenciales
const serviceAccount = {
    type: "service_account",
    project_id: "tecnix-52017",
    private_key_id: "81347e2f3e53fc384a0226e719c0912f74d53965",
    // Formato necesario
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_CERT_URL,
    universe_domain: "googleapis.com"
};

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Inicialicion de la base de datos con permisos admin
const db = admin.firestore();

// Importacion de los datos a insertar
// Agrega el nombre de tu archivo despues de data/
// Mira Location.js para que veas como esta la estructura de los datos
const sampleData = require("./data/.js");

// Inserta el nombre EXACTO de la coleccion
// Si te equivocas por mayuscula se crea otra y valio m
const coleccion = "";

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