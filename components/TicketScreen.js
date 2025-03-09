import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicketScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("id");

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

  const sortTickets = (tickets, criteria) => {
    return tickets.sort((a, b) => {
      if (criteria === 'fecha') {
        return new Date(a.fechaHora) - new Date(b.fechaHora);
      } else if (criteria === 'sucursal') {
        return a.sucursal.localeCompare(b.sucursal);
      } else if (criteria === 'id') {
        return a.id.localeCompare(b.id);
      }
      return 0;
    });
  };

  const sortedTickets = sortTickets([...tickets], selectedValue);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.optionsContainer}>
        <Text style={styles.pickerText}>Ordenar:</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="No. Ticket" value="id" />
          <Picker.Item label="Fecha" value="fecha" />
          <Picker.Item label="Sucursal" value="sucursal" />
        </Picker>
      </View>
      <FlatList
        data={sortedTickets}
        keyExtractor={(item) => item.id}
        style={{ width: '98%' }}
        renderItem={({ item }) => (
          <View style={styles.ticketContainer}>
            <View style={styles.ticketTop}>
              <Text style={styles.ticketTitle}>Ticket #{item.id}</Text>
              {/* Botón "Ver más" */}
              <TouchableOpacity onPress={() => navigateToDetails(item)} style={styles.button}>
                <Icon name="info" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>{item.sucursal}</Text>
            <Text style={styles.subtitle}>Fecha Límite: {item.fechaLimite}</Text>
            <Text style={styles.subtitle}>Categoría: {item.categoria}</Text>
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
    alignItems: 'center',
    width: '100%',
    minWidth: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1E3A8A',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pickerText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: '40%',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '60%',
    color: '#1E3A8A',
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  ticketContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#1E3A8A',
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFC107',
    paddingBottom: 6,
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1E3A8A',
    flex: 1,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#374151',
    marginBottom: 2,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1E3A8A',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },

  // Opcionales para campos adicionales
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },
  fieldValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#111827',
    marginBottom: 4,
  },
});


export default TicketScreen;
