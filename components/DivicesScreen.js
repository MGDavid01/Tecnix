import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DivicesScreen = () => {
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
        style={{ width: '100%' }}
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
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minWidth: '100%',
    backgroundColor: '#1E3A8A',
    color: '#fff',
  },
  pickerText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    width: '40%',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: "60%",
    color: '#000',
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#f9f9f9',
  },
  flatListContainer: {
    width: '100%',
    minWidth: '100%',
    paddingHorizontal: 10,
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
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minWidth: '100%',
    borderBottomWidth: 1,
    borderBottomColor: "#FFC107",
    paddingBottom: 5,
  },
  ticketTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
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

export default DivicesScreen;
