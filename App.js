import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import SideMenu from './components/SideMenu';
import { FontsTexts } from "./components/FontsTexts";
import { NavigationContainer } from '@react-navigation/native';

// Pantallas de la aplicación
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido "Nombre"</Text>
    </View>
  );
}

function TicketsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function ReportsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Reports Screen</Text>
    </View>
  );
}

function SettingScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
}



// 🔹 Arreglo con las opciones de navegación
const screens = [
  { name: "Home", component: HomeScreen, title: "Home"},
  { name: "Pending Tickets", component: TicketsScreen, title: "Pending Tickets"},
  { name: "Reports", component: ReportsScreen, title: "Reports"},
  { name: "Setting", component: SettingScreen, title: "Setting"}
];

export default function App() {
  
  return (
    <FontsTexts>
      <NavigationContainer>
        <SideMenu screens={screens} />
      </NavigationContainer>
      <StatusBar style="auto" translucent={false} backgroundColor='#faec5c'/>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "rgb(255 255 255)",
  },
  textMain: {
    fontFamily: "Poppins-Bold",
    fontSize: 50,
    textAlign: "center",
    marginTop: 20,
  },
});
