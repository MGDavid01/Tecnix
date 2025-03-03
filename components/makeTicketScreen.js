import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

//Guardar la informacion puesta en el formulario
const MakeTicketScreen = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [technical, setTechnical] = useState('');
  const [equipment, setEquipment] = useState('');


  //Obtener la fecha de hoy
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    setDate(today);
  }, []);
  
  // --Por lo mientras -- Muestra la info puesta en el formulario
  const handleSubmit = () => {
    alert(
      `Name: ${name}\n` +
      `Date: ${date}\n` +
      `Priority: ${priority}\n` +
      `Description: ${description}\n` +
      `Technical: ${technical}\n` +
      `Equipment: ${equipment}`
    );
  };
  
  //Formulario
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Make a Ticket</Text>

      
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />

      <Text style={styles.label}>Today's Date:</Text>
      <TextInput style={styles.input} value={date} editable={false} />

      <Text style={styles.label}>Priority:</Text>
      <TextInput style={styles.input} placeholder="Priority" value={priority} onChangeText={setPriority} />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Technical:</Text>
      <TextInput style={styles.input} placeholder="Technical" value={technical} onChangeText={setTechnical} />

      <Text style={styles.label}>Equipment:</Text>
      <TextInput style={styles.input} placeholder="Equipment" value={equipment} onChangeText={setEquipment} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5DADE2', // Azul claro
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MakeTicketScreen;