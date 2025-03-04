import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontsTexts from './FontsTexts';

const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.divider} />
      <Text style={styles.itemText}>Phone: {item.id}</Text>
    </View>
  );

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
  const data = [
    {
      title: "Divices",
      data: devices
    },
    {
      title: "Issues",
      data: issues
    }
  ];

  return (
    <FontsTexts>
      <View style={styles.container}>
          <View>
            <Text style={styles.title}>{location.nameLocal}</Text>
            <Text style={styles.itemText}>Address: {location.street}, {location.settlement}, {location.state}</Text>
            <Text style={styles.itemText}>Phone: {location.phoneNumber}</Text>
            <Text style={styles.itemText}>Opening Hours: {location.openingHours}</Text>
            <Text style={styles.itemText}>Status: {location.status.path}</Text>
          </View>
          <View>
            <SectionList
              sections={data}
              keyExtractor={(item, index) => item + index}
              renderItem={renderItem}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
          </View>
        
      </View>
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  card: {
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
    alignSelf: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFC107",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#555',
    marginBottom: 5,
  },
});

export default LocationDetailScreen;
