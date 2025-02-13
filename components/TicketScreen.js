import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const TicketScreen = () => {
  const [expandedTicket, setExpandedTicket] = useState(null);

  const tickets = [
    {
      id: '001',
      empleadoId: 'E12345',
      sucursal: 'Sucursal Norte',
      computadoraId: 'PC-001',
      estado: 'PRO',
      fechaHora: '2024-02-12 14:30',
      categoria: 'Software',
      problema: 'No abre el sistema',
      descripcion: 'El sistema de facturación no carga después del inicio de sesión.',
      asignadoA: 'Soporte 1',
      fechaLimite: '2024-02-14',
    },
    {
      id: '002',
      empleadoId: 'E54321',
      sucursal: 'Sucursal Sur',
      computadoraId: 'PC-017',
      estado: 'PRO',
      fechaHora: '2024-02-11 10:15',
      categoria: 'Hardware',
      problema: 'Falla en teclado',
      descripcion: 'Algunas teclas no responden al presionarlas.',
      asignadoA: 'Soporte 2',
      fechaLimite: '2024-02-13',
    },
  ];

  const toggleExpand = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Tickets Pendientes</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketContainer}>
            <Text style={styles.ticketTitle}>Ticket #{item.id}</Text>
            <Text style={styles.subtitle}>{item.sucursal}</Text>
            <Text style={styles.description}>
              {item.descripcion.length > 30 ? item.descripcion.substring(0, 30) + "..." : item.descripcion}
            </Text>

            {/* Botón "Ver más" */}
            <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.button}>
              <Text style={styles.buttonText}>{expandedTicket === item.id ? "Ver menos" : "Ver más"}</Text>
            </TouchableOpacity>

            {/* Sección expandida con más detalles */}
            {expandedTicket === item.id && (
              <View style={styles.details}>
                <Text><Text style={styles.bold}>Estado:</Text> {item.estado}</Text>
                <Text><Text style={styles.bold}>Fecha/Hora:</Text> {item.fechaHora}</Text>
                <Text><Text style={styles.bold}>Categoría:</Text> {item.categoria}</Text>
                {item.categoria === 'Otros' && (
                  <Text><Text style={styles.bold}>Problema:</Text> {item.problema}</Text>
                )}
                <Text><Text style={styles.bold}>Descripción:</Text> {item.descripcion}</Text>
                <Text><Text style={styles.bold}>Asignado a:</Text> {item.asignadoA}</Text>
                <Text><Text style={styles.bold}>Fecha Límite:</Text> {item.fechaLimite}</Text>

                {/* Botón de Chat (sin función aún) */}
                <TouchableOpacity style={styles.chatButton}>
                  <Text style={styles.chatButtonText}>Chat</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ticketContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%', // 🔹 El tamaño se mantiene fijo
    alignSelf:"center",
  },
  ticketTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#FFC107",
    paddingBottom: 5,
    width: "100%,"
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    width: "100%",
  },
  button: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignSelf: 'flex-end', // 🔹 Alinea el botón a la derecha
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  details: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: "100%", // 🔹 Evita que el ancho cambie al expandir
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  chatButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#28a745",
    borderRadius: 5,
    alignItems: "center",
  },
  chatButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});

export default TicketScreen;
