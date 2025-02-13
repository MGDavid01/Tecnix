import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const TicketDetailsScreen = ({ route }) => {
  const { ticket } = route.params;

  const details = [
    { label: 'Sucursal', value: ticket.sucursal },
    { label: 'Fecha Límite', value: ticket.fechaLimite },
    { label: 'Categoría', value: ticket.categoria },
    { label: 'Estado', value: ticket.estado },
    { label: 'Fecha/Hora', value: ticket.fechaHora },
    ...(ticket.categoria === 'Otros' ? [{ label: 'Problema', value: ticket.problema }] : []),
    { label: 'Descripción', value: ticket.descripcion },
    { label: 'Asignado a', value: ticket.asignadoA },
  ];

  const openWhatsApp = (phoneNumber, message) => {
    const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    Linking.canOpenURL(appUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(appUrl);
        } else {
          return Linking.openURL(webUrl); // Si no puede abrir la app, usa WhatsApp Web
        }
      })
      .catch((err) => console.error("Error al abrir WhatsApp", err));
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ticket #{ticket.id}</Text>
      <View style={styles.detailsBox}>
        {details.map((detail, index) => (
          <View key={index} style={styles.detailContainer}>
            <Text style={styles.label}>{detail.label}:</Text>
            <Text style={styles.value}>{detail.value}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => openWhatsApp('526631646442', `Hola, tengo una consulta sobre el ticket #${ticket.id}`)}
      >
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    flex: 2,
  },
  chatButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignSelf: 'center',
  },
  chatButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});

export default TicketDetailsScreen;