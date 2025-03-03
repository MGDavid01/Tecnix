import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TicketHistoryScreen = () => {
  // Datos de ejemplo
  const ticketHistory = [
    {
      number: '001',
      code: 'TCK123',
      updateDate: '2024-02-14',
      previousState: 'Pending',
      newState: 'In Progress',
      comments: 'Assigned to a technician.',
    },
    {
      number: '002',
      code: 'TCK124',
      updateDate: '2024-02-13',
      previousState: 'In Progress',
      newState: 'Resolved',
      comments: 'Issue fixed, waiting for client confirmation.',
    },
    {
      number: '003',
      code: 'TCK125',
      updateDate: '2024-02-12',
      previousState: 'Pending',
      newState: 'Cancelled',
      comments: 'User requested cancellation.',
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket History</Text>
      <FlatList
        data={ticketHistory}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.ticketNumber}>Ticket #{item.number} - {item.code}</Text>
            <Text style={styles.date}>📅 {item.updateDate}</Text>
            <Text style={styles.state}>
              🔄 {item.previousState} → ✅ {item.newState}
            </Text>
            <Text style={styles.comments}>💬 {item.comments}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ticketNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  date: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 5,
  },
  state: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  comments: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default TicketHistoryScreen;
