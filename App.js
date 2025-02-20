import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';                                           
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import SideMenu from './components/SideMenu';
import FontsTexts from "./components/FontsTexts";
import TicketScreen from './components/TicketScreen';
import TicketDetailsScreen from './components/TicketDetailsScreen';
import MakeTicketScreen from './components/makeTicketScreen';
import TicketHistoryScreen from './components/TicketHistory';
import UsersScreen from './components/UserScreen';



import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


// Pantallas de la aplicación
function HomeScreenTec() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Usuario Tipo 1</Text>
      
    </View>
  );
  
}

function HomeScreenEmp() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Usuario Tipo 2</Text>
    </View>
  );
}

function HomeScreenJefe() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Usuario Tipo 3</Text>
    </View>
  );
}

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

function FeedbackScreen() {
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

//Funcion para ir a la seccion de historial de tickets
function viewTicketHistory(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Ticket history" component={TicketHistoryScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

//Funcion para ir a la seccion de creacion de tickets
function makeTicketOption(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Make a ticket" component={MakeTicketScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}


//Funcion para ir a la seccion de visualizar usuarios
function Users(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UsersScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

// Mostrar herramientas dependiendo el tipo de usuario
const obtenerPantallasUsuario = (tipoUser) => {
  switch (tipoUser) {
    case 1:
      return [
        { name: "HomeTec", component: HomeScreenTec, title: "Home" },
        { name: "PendingTicketsTec", component: TicketsScreen, title: "Pending Tickets" },
        { name: "Reports", component: ReportsScreen, title: "Reports" },
        { name: "Users", component: Users, title: "Users" },
        { name: "Setting", component: SettingScreen, title: "Setting" }
      ];
    case 2:
      return [
        { name: "HomeJefe", component: HomeScreenEmp, title: "Home" },
        { name: "Reports", component: ReportsScreen, title: "Reports" },
        { name: "Feedback", component: FeedbackScreen, title: "Feedback" },
        { name: "Setting", component: SettingScreen, title: "Setting" }
      ];
    case 3:
      return [
        { name: "HomeEmp", component: HomeScreenJefe, title: "Home" },
        { name: "PendingTicketsJefe", component: TicketsScreen, title: "Pending Tickets" },
        { name: "Make a ticket", component: makeTicketOption, title: "Make a ticket" },
        { name: "Ticket history", component: viewTicketHistory, title: "Ticket history" },
        { name: "Setting", component: SettingScreen, title: "Setting" }
      ];
    default:
      return [];
  }
};

export default function App({ tipoUser }) {
  const screens = obtenerPantallasUsuario(tipoUser);

  return (
    <FontsTexts>
      <Drawer.Navigator initialRouteName={screens.name} drawerContent={(props) => <SideMenu {...props} screens={screens} />}>
        {screens.map((screen) => (
          <Drawer.Screen key={screen.name} name={screen.title} component={screen.component} />
        ))}
      </Drawer.Navigator>
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
