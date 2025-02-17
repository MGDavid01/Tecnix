import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';                
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import SideMenu from './components/SideMenu';
import FontsTexts from "./components/FontsTexts";
import TicketScreen from './components/TicketScreen';
import TicketDetailsScreen from './components/TicketDetailsScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Pantallas de la aplicación
function HomeScreen1() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Usuario Tipo 1</Text>
    </View>
  );
}

function HomeScreen2() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Usuario Tipo 2</Text>
    </View>
  );
}

function HomeScreen3() {
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

function SettingScreen() {
  return (
    <View style={styles.screenContainer}>
     <Text style={styles.textMain}>Settings</Text>
    </View>
  );
}

// Mostrar herramientas dependiendo el tipo de usuario
const obtenerPantallasUsuario = (tipoUser) => {
  switch (tipoUser) {
    case 1:
      return [
        { name: "Home", component: HomeScreen1, title: "Home" },
        { name: "Pending Tickets", component: TicketsScreen, title: "Pending Tickets" },
        { name: "Reports", component: ReportsScreen, title: "Reports" },
        { name: "Setting", component: SettingScreen, title: "Setting" }
      ];
    case 2:
      return [
        { name: "Home", component: HomeScreen2, title: "Home" },
        { name: "Reports", component: ReportsScreen, title: "Reports" },
        { name: "Setting", component: SettingScreen, title: "Setting" }
      ];
    case 3:
      return [
        { name: "Home", component: HomeScreen3, title: "Home" },
        { name: "Pending Tickets", component: TicketsScreen, title: "Pending Tickets" },
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
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <SideMenu {...props} screens={screens} />}>
        {screens.map((screen) => (
          <Drawer.Screen key={screen.name} name={screen.name} component={screen.component} />
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
