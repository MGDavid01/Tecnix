import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, AuthContext } from './context/AuthContext';
import FontsTexts from "./components/FontsTexts";
import TicketScreen from './components/TicketScreen';
import TicketDetailsScreen from './components/TicketDetailsScreen';
import MakeTicketScreen from './components/makeTicketScreen';
import TicketHistoryScreen from './components/TicketHistory';
import UsersScreen from './components/UserScreen';
import LocationScreen from './components/LocationScreen';
import LocationDetailScreen from './components/LocationDetailScreen';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import ReportsScreen from './components/ReportsScreen';
import FeedbackScreen from './components/FeedbackScreen';
import SettingScreen from './components/SettingScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

function TicketsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pending Ticket" component={TicketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ticket Details" component={TicketDetailsScreen} />
    </Stack.Navigator>
  );
}

function LocationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LocationsTec" component={LocationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Location Detail" component={LocationDetailScreen} />
    </Stack.Navigator>
  );
}


function viewTicketHistory(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Ticket history" component={TicketHistoryScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function makeTicketOption(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Make a ticket" component={MakeTicketScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function Users(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UsersScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function getDrawerScreens(tipoUser) {
  switch (tipoUser) {
    case 1:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenTec} />
          <Drawer.Screen name="Tickets" component={TicketsStack} />
          <Drawer.Screen name="Locations" component={LocationsStack} />
        </>
      );
    case 2:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenEmp} />
          <Drawer.Screen name="Tickets" component={TicketsStack} />
        </>
      );
    case 3:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenJefe} />
          <Drawer.Screen name="Tickets" component={TicketsStack} />
          <Drawer.Screen name="Locations" component={LocationsStack} />
          <Drawer.Screen name="Users" component={UsersScreen} />
        </>
      );
    default:
      return null;
  }
}

function AppContent() {
  // Se llama la variable loggedIn para saber su valor de LogIn.js
  const { loggedIn } = useContext(AuthContext);
  const tipoUser = 1; // Simulación de tipo de usuario

  if (!loggedIn) {
    return (
      <FontsTexts>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </FontsTexts>
    );
  }

  return (
    <FontsTexts>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          {getDrawerScreens(tipoUser)}
        </Drawer.Navigator>
        <StatusBar style="auto" translucent={false} backgroundColor="#faec5c" />
      </NavigationContainer>
    </FontsTexts>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
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
