import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TicketDetailsScreen = ({ route }) => {
  const { ticket } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket #{ticket.id}</Text>
      <Text style={styles.subtitle}>Sucursal: {ticket.sucursal}</Text>
      <Text style={styles.subtitle}>Fecha Límite: {ticket.fechaLimite}</Text>
      <Text style={styles.subtitle}>Categoría: {ticket.categoria}</Text>
      <Text style={styles.subtitle}>Estado: {ticket.estado}</Text>
      <Text style={styles.subtitle}>Fecha/Hora: {ticket.fechaHora}</Text>
      {ticket.categoria === 'Otros' && (
        <Text style={styles.subtitle}>Problema: {ticket.problema}</Text>
      )}
      <Text style={styles.subtitle}>Descripción: {ticket.descripcion}</Text>
      <Text style={styles.subtitle}>Asignado a: {ticket.asignadoA}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#555',
    marginBottom: 5,
  },
});

export default TicketDetailsScreen;