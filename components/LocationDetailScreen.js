import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontsTexts from './FontsTexts';

const renderItem = ({ item, section }) => {
  if (section.title === "Location Detail") {
    return (
      <View>
        <Text style={styles.title}>{item.nameLocal}</Text>
        <Text style={styles.itemText}>Address: {item.street}, {item.settlement}, {item.state}</Text>
        <Text style={styles.itemText}>Phone: {item.phoneNumber}</Text>
        <Text style={styles.itemText}>Opening Hours: {item.openingHours}</Text>
        <Text style={styles.itemText}>Status: {item.status.path}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.divider} />
        <Text style={styles.itemText}>Id: {item.id}</Text>
      </View>
    );
  }
};


const LocationDetailScreen = () => {
  const route = useRoute();
  const { item } = route.params;

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
      title: "Location Detail",
      data: [item]
    },
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
            <SectionList
              sections={data}
              keyExtractor={(item, index) => item + index}
              renderItem={renderItem}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
      </View>
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 10,
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
    marginBottom: 8,
  },
});

export default LocationDetailScreen;
