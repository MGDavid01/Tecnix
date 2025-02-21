import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import FontsTexts from './FontsTexts';
import "../firebaseConfig";

const LocationScreen = () => {
  const [locations, setLocations] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchLocations = async () => {
      const locationCollection = await getDocs(collection(db, 'Location'));
      const locationsList = locationCollection.docs.map(doc => doc.data());
      setLocations(locationsList);
    };

    fetchLocations();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Name: {item.nameLocal}</Text>
      <Text style={styles.itemText}>Neighborhood: {item.neighborhood}</Text>
      <Text style={styles.itemText}>Phone: {item.phone}</Text>
      <Text style={styles.itemText}>Status: {item.statusLocal.path}</Text>
      <Text style={styles.itemText}>Street: {item.street}</Text>
      <Text style={styles.itemText}>Street Number: {item.streetNumber}</Text>
    </View>
  );

  return (
    <FontsTexts>
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default LocationScreen;
