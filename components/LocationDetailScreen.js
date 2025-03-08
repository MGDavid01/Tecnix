import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FontsTexts from './FontsTexts';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.header}>{item.nameLocal}</Text>
          <View style={styles.imageContainer}>
            {/*Imagen provisional, siguiente funcion es automatizar
              el mostrar la imagen de la sucursal correspondiente
              y posible funcion de utilizar api drive para subir las imagenes
              y recuperarla desde ahi
            */}
            <Image style={styles.img} source={require('../assets/imgLocations/Sucursal1.jpg')} />
          </View>
        </View>
        <View style={styles.contentDetail}>
          <View style={styles.divider}>
            <Text style={styles.title}>Contact:</Text>
            <Text style={styles.itemText}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.itemText}>Address: {item.street}, {item.settlement}, {item.state}</Text>
          </View>
          <View style={styles.divider}>
            <Text style={styles.title}>Activity:</Text>
            <Text style={styles.itemText}>Opening Hours: {item.openingHours}</Text>
            {/* Posibilidad no funcional de actualizar esta info automaticamente
              con firabase functions */}
            <Text style={styles.itemText}>Status: {item.status}</Text>
          </View>
          <View style={styles.divider}>
            <Text style={styles.title}>More:</Text>
            <View style={styles.columns}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtBtn}>Divices</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.txtBtn}>Tickets History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "2%",
    flex: 1,
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
  },
  contentDetail: {
    alignSelf: 'center',
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  imageContainer: {
    alignSelf: 'center',
    alignItems:'center',
    width: 380,
    height: 200,
    marginBottom: "2%",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  divider: {
    alignSelf: 'center',
    width: "100%",
    padding: 15,
    borderBottomWidth: 5,
    borderBottomColor: "#FFC107",
  },
  columns: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  btn: {
    minWidth: "45%",
    backgroundColor: "#1E3A8A",
    padding: 5,
    borderRadius: 5,
  },
  txtBtn: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: "#FFFFFF",
    textAlign: "center",
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#555',
    marginBottom: 1,
  },
});

export default LocationDetailScreen;
