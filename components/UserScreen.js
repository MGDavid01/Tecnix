import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';     //se importa el db del archivo de configuracion de firebase
import { collection, getDocs } from "firebase/firestore";   //se importan cosas de firestore

const UsersScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  //use effecto para obtener los datos de la coleccion de User
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "User"));    //db y la coleccion
        const listaUsuarios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Error obteniendo usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>

        
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : usuarios.length === 0 ? (
        <Text style={styles.emptyText}>No hay usuarios disponibles</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.firstname}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Azul claro como fondo
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D47A1", // Azul oscuro
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF", // Tarjetas blancas
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Sombra para Android
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565C0", // Azul medio
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});

export default UsersScreen;
