import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SideMenu from './components/SideMenu';
import FontsTexts from "./components/FontsTexts";
import TicketScreen from './components/TicketScreen';
import TicketDetailsScreen from './components/TicketDetailsScreen';

// Pantallas de la aplicación
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido "Nombre"</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function TicketsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pending Tickets" component={TicketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ticket Details" component={TicketDetailsScreen} />
    </Stack.Navigator>
  );
}

function ReportsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Reports</Text>
    </View>
  );
}

function SettingScreen() {
  return (
    <View style={styles.screenContainer}>
     <Text style={styles.textMain}>Settings</Text>
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
    backgroundColor: "#F5F5F5",
  },
  textMain: {
    fontFamily: "Poppins-Bold",
    fontSize: 50,
    textAlign: "center",
    lineHeight: 46,
    margin: 20,
    paddingTop: 10,
    color:"#2E2E2E",
  },
});
