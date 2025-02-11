import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import SideMenu from './components/SideMenu';  // Importar el menú lateral
import { FontsTexts } from "./components/FontsTexts";



// Pantallas de la aplicación
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido "Nombre"</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
}

// Definir el DrawerNavigator
const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <FontsTexts>
      <NavigationContainer style={styles.content}>
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <SideMenu {...props} />}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
        <StatusBar style="auto" translucent={false} backgroundColor='#faec5c'/>
      </NavigationContainer>
    </FontsTexts>
  );
}

const styles = StyleSheet.create({
  content: {
    fontFamily: "Poppins-Regular",
    fontSize: 2,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Cambiado para alinear elementos arriba
    alignItems: 'center',
    backgroundColor: "rgb(255 255 255)",
  },
  textMain: {
    fontFamily: "Poppins-Bold",
    fontSize: 50,
    textAlign: "center",
    marginTop: 5, // Ajusta la separación desde arriba
  },
});
