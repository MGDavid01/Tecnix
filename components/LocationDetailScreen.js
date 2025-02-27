import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontsTexts from './FontsTexts';

const LocationDetailScreen = () => {
  const route = useRoute();
  const { location } = route.params;

  const devices = [
    { id: '1', name: 'Computer' },
    { id: '2', name: 'Printer' },
    { id: '3', name: 'Ticket Printer' },
  ];

  const issues = [
    { id: '1', description: 'Network issue' },
    { id: '2', description: 'Printer malfunction' },
  ];

  return (
    <FontsTexts>
      <View style={styles.container}>
        <Text style={styles.title}>{location.nameLocal}</Text>
        <Text style={styles.itemText}>Address: {location.street}, {location.settlement}, {location.state}</Text>
        <Text style={styles.itemText}>Phone: {location.phoneNumber}</Text>
        <Text style={styles.itemText}>Opening Hours: {location.openingHours}</Text>
        <Text style={styles.itemText}>Status: {location.status.path}</Text>

        <Text style={styles.sectionTitle}>Devices</Text>
        <FlatList
          data={devices}
          renderItem={({ item }) => <Text style={styles.itemText}>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />

        <Text style={styles.sectionTitle}>Issues</Text>
        <FlatList
          data={issues}
          renderItem={({ item }) => <Text style={styles.itemText}>{item.description}</Text>}
          keyExtractor={(item) => item.id}
        />
      </View>
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default LocationDetailScreen;
