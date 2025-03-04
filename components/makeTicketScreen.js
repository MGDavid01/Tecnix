import React, { useReducer, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig';  
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

// Estado inicial del formulario
const initialState = {
  name: '',
  date: '',
  priority: 'Low',
  description: '',
  technical: '',
  equipment: ''
};

// Reducer para manejar el estado del formulario
const reducer = (state, action) => {
  if (action.type === "reset") {
    return initialState; // Reiniciar formulario
  }
  return { ...state, [action.name]: action.value };
};

// Componente reutilizable para Inputs
const InputField = ({ label, value, onChange, placeholder, multiline = false }) => (
  <>
    <Text style={styles.label}>{label}:</Text>
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      multiline={multiline}
    />
  </>
);

const MakeTicketScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [technicians, setTechnicians] = useState([]);
  const [equipments, setEquipments] = useState([]);

  // Obtener fecha de hoy y cargar técnicos y equipos desde Firebase
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    dispatch({ name: 'date', value: today });

    const fetchTechnicians = async () => {
      try {
        const technicianList = [];
        const querySnapshot = await getDocs(collection(db, 'Technical'));
        querySnapshot.forEach((doc) => {
          technicianList.push({ id: doc.id, firstName: doc.data().firstName });
        });
        setTechnicians(technicianList);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    const fetchEquipments = async () => {
      try {
        const equipmentList = [];
        const querySnapshot = await getDocs(collection(db, 'Equipment'));
        querySnapshot.forEach((doc) => {
          equipmentList.push({ id: doc.id, name: doc.data().name });
        });
        setEquipments(equipmentList);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchTechnicians();
    fetchEquipments();
  }, []);

  // Guardar información en Firebase
  const handleSubmit = async () => {
    if (!state.name || !state.description || !state.equipment || !state.technical) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'SupportRequest'), {
        name: state.name,
        date: state.date,
        priority: state.priority,
        description: state.description,
        technical: state.technical,
        equipment: state.equipment,
        tracking_history: {
          comments: "Ticket created",
          previous_state: "N/A",
          new_state: "Open",
          update_date: serverTimestamp()
        }
      });

      alert('The request has been successfully created.');


      dispatch({ type: "reset" }); // Limpiar formulario

    } catch (error) {
      console.error('Error adding document:', error);
      alert('Error', 'There was a problem submitting the request.');

    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Make a Ticket</Text>

      <InputField label="Name" value={state.name} onChange={(text) => dispatch({ name: 'name', value: text })} placeholder="Enter your name" />
      <InputField label="Description" value={state.description} onChange={(text) => dispatch({ name: 'description', value: text })} placeholder="Enter description" multiline={true} />

      <Text style={styles.label}>Equipment:</Text>
      <Picker selectedValue={state.equipment} onValueChange={(value) => dispatch({ name: 'equipment', value })} style={styles.picker}>
        <Picker.Item label="Select an equipment" value="" />
        {equipments.map((eq) => (
          <Picker.Item key={eq.id} label={eq.name} value={eq.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Priority:</Text>
      <Picker selectedValue={state.priority} onValueChange={(value) => dispatch({ name: 'priority', value })} style={styles.picker}>
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>

      <Text style={styles.label}>Technical:</Text>
      {technicians.length > 0 ? (
        <Picker selectedValue={state.technical} onValueChange={(value) => dispatch({ name: 'technical', value })} style={styles.picker}>
          <Picker.Item label="Select a technician" value="" />
          {technicians.map((tech) => (
            <Picker.Item key={tech.id} label={tech.firstName} value={tech.id} />
          ))}
        </Picker>
      ) : (
        <Text style={styles.errorText}>No technicians available</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#5DADE2',
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
