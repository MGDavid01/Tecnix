import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontsTexts from './FontsTexts';
import { TouchableOpacity } from 'react-native';

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
        <View style={styles.contentDetail}>
          <View>
            <Text style={styles.header}>{item.nameLocal}</Text>
            <Image />
          </View>
          <View style={styles.divider}>
            <Text style={styles.title}>Contact:</Text>
            <Text style={styles.itemText}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.itemText}>Address: {item.street}, {item.settlement}, {item.state}</Text>
          </View>
          <View style={styles.divider}>
            <Text style={styles.title}>Activity:</Text>
            <Text style={styles.itemText}>Opening Hours: {item.openingHours}</Text>
            <Text style={styles.itemText}>Status: {item.status.path}</Text>
          </View>
        </View>
        <View style={styles.contentMore}>
          <View>
            <TouchableOpacity>
              <Text>Divices</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.btn}>
              <Text>Tickets History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignSelf:'center',
    justifyContent:'flex-start',
    minWidth:'100%',
    backgroundColor: '#fff',
  },
  contentDetail: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginTop: "2%",
  },
  img:{

  },
  title: {
    fontSize: 20,
    marginBottom: 5,
  },
  divider: {
    alignSelf: 'center',
    width:"96%",
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 5,
    borderBottomColor: "#FFC107",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  contentMore: {
    justifyContent:'space-around',
    flexDirection: 'row',
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    backgroundColor: "#fff",
    padding: 10,

  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#555',
    marginBottom: 1,
  },
});

export default LocationDetailScreen;
