import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
import CustomDrawerContent from './components/CustomDrawerContent';
import WatchTicketsScreen from './components/WatchTicketsScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TicketsStackTec() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pending Ticket" component={TicketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Ticket Details" component={TicketDetailsScreen} />
      <Stack.Screen name="History" component={TicketHistoryScreen} />
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

function makeTicketOption(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Make a ticket" component={MakeTicketScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function Users(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UsersScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

//Funcion para ver los tickets hechos por los usuarios
function WatchTickets(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="watchTickets" component={WatchTicketsScreen} options={{ headerShown: false}}/>
    </Stack.Navigator>
  );
}

function getDrawerScreens(tipoUser) {
  switch (tipoUser) {
    case 1:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenTec} />
          <Drawer.Screen name="Tickets" component={TicketsStackTec} />
          <Drawer.Screen name="Locations" component={LocationsStack} />
        </>
      );
    case 2:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenEmp} />
          <Drawer.Screen name="Tickets" component={makeTicketOption} />
        </>
      );
    case 3:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenJefe} />
          <Drawer.Screen name="Tickets" component={TicketsStackTec} />
          <Drawer.Screen name="Locations" component={LocationsStack} />
          <Drawer.Screen name="Users" component={UsersScreen} />
        </>
      );
    default:
      return null;
  }
}

function AppContent() {
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
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
          {getDrawerScreens(tipoUser)}
        </Drawer.Navigator>
        <StatusBar style="auto" translucent={false} backgroundColor="#faec5c" />
      </NavigationContainer>
    </FontsTexts>
  );
}

function HomeScreenTec() {
  const navigation = useNavigation();
  const cardTitles = [
      "Notificaciones",
      "Calendario de Tareas",
      "Estadísticas Rápidas",
    ];

  const cardContents = [
      ["- Nuevo ticket asignado: #1234", "- Actualización importante en ticket #5678"],
      ["- 10/10/2023: Resolver ticket #1234", "- 12/10/2023: Revisión de ticket #5678"],
      ["- Tickets resueltos: 15", "- Tickets en progreso: 5", "- Tiempo promedio de solucion: 25mins"],
    ];
  const cardNavigate = [
      "Notifications",
      "Calendar",
      "Statistics",
    ];
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Usuario Tipo 1</Text>
      {cardTitles.map((title, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.containerTopCard}>
            <Text style={styles.cardTitle}>{title}</Text>
            <TouchableOpacity style={styles.view} onPress={() => console.log("Presionado")}>
              <Text style={styles.viewText}>Ver más</Text>
            </TouchableOpacity>
          </View>
          {cardContents[i].map((content, i) => (
            <Text key={i} style={styles.cardContent}>{content}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

function HomeScreenEmp() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Empleado</Text>
    </View>
  );
}

function HomeScreenJefe() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Jefe</Text>
    </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  containerTopCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFC107",
  },
  cardTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#2E2E2E",
  },
  view: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 80,
    borderRadius: 3,
  },
  viewText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#1E3A8A",
  },
  cardContent: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#2E2E2E",
  },
});
