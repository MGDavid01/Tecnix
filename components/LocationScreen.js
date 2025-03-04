import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import "../firebaseConfig";
import FontsTexts from './FontsTexts';
import { LocationContext } from '../context/LocationContext';

const LocationScreen = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const db = getFirestore();
  const navigation = useNavigation();

  const { setLocation } = useContext(LocationContext);
  useEffect(() => {
    const fetchLocations = async () => {
      const locationCollection = await getDocs(collection(db, 'Locations'));
      const locationsList = locationCollection.docs.map(doc => doc.data());
      setLocations(locationsList);
      setFilteredLocations(locationsList);
    };

    fetchLocations();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = locations.filter(location => 
      location.nameLocal.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    navigation.navigate('Location Detail');
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nameLocal}</Text>
      <View style={styles.divider} />
      <Text style={styles.itemText}>Phone: {item.phoneNumber}</Text>
      <Text style={styles.itemText}>Status: {item.status.path}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLocationSelect(item)}
      >
        <Text style={styles.buttonText}>View More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FontsTexts>
      <SafeAreaView style={styles.screenContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name"
          value={search}
          onChangeText={handleSearch}
        />
        
        <FlatList
          style={styles.listContainer}
          data={filteredLocations}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </FontsTexts>
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
  searchBar: {
    height: "5%",
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  listContainer: {
    width: "100%",
    height: "95%",
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

export default LocationScreen;
