import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TicketScreen = () => {
  const navigation = useNavigation();

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
    {
      id: '003',
      empleadoId: 'E54322',
      sucursal: 'Sucursal Este',
      computadoraId: 'PC-018',
      estado: 'PRO',
      fechaHora: '2024-02-13 10:15',
      categoria: 'Otros',
      problema: 'Falla en teclado',
      descripcion: 'Algunas teclas no responden al presionarlas.',
      asignadoA: 'Soporte 3',
      fechaLimite: '2024-02-20',
    },
    {
      id: '004',
      empleadoId: 'E54322',
      sucursal: 'Sucursal Este',
      computadoraId: 'PC-018',
      estado: 'PRO',
      fechaHora: '2024-02-13 10:15',
      categoria: 'Otros',
      problema: 'Falla en teclado',
      descripcion: 'Algunas teclas no responden al presionarlas.',
      asignadoA: 'Soporte 3',
      fechaLimite: '2024-02-20',
    },
    {
      id: '005',
      empleadoId: 'E54322',
      sucursal: 'Sucursal Este',
      computadoraId: 'PC-018',
      estado: 'PRO',
      fechaHora: '2024-02-13 10:15',
      categoria: 'Otros',
      problema: 'Falla en teclado',
      descripcion: 'Algunas teclas no responden al presionarlas.',
      asignadoA: 'Soporte 3',
      fechaLimite: '2024-02-20',
    },
  ];

  const navigateToDetails = (ticket) => {
    navigation.navigate('Ticket Details', { ticket });
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketContainer}>
            <Text style={styles.ticketTitle}>Ticket #{item.id}</Text>
            <Text style={styles.subtitle}>{item.sucursal}</Text>
            <Text style={styles.subtitle}>Fecha Límite: {item.fechaLimite}</Text>
            <Text style={styles.subtitle}>Categoría: {item.categoria}</Text>

            {/* Botón "Ver más" */}
            <TouchableOpacity onPress={() => navigateToDetails(item)} style={styles.button}>
              <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
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
    width: '100%',
    minWidth: '100%',
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
    width: '100%',
    minWidth: '100%',
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
  button: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#1E3A8A",
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
});

export default TicketScreen;
