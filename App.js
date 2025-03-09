import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
// IMPORTANTES
import { AuthProvider, AuthContext } from './context/AuthContext';
import FontsTexts from "./components/FontsTexts";
import CustomDrawerContent from './components/CustomDrawerContent';
//SCREENS
  // lOGIN Y SIGNUP
import Login from './components/LogIn';
import SignUp from './components/SignUp';
  // TECNICO Y JEFE
import TicketScreen from './components/TicketScreen';
import TicketDetailsScreen from './components/TicketDetailsScreen';
import MakeTicketScreen from './components/makeTicketScreen';
import TicketHistoryScreen from './components/TicketHistory';
import TicketHistoryDetailsScreen  from "./components/TicketHistoryDetailsScreen";
import ReportsScreen from './components/ReportsScreen';
import LocationScreen from './components/LocationScreen';
import LocationDetailScreen from './components/LocationDetailScreen';
import DivicesScreen from './components/DivicesScreen';
  //JEFE
import UsersScreen from './components/UserScreen';
  //EMPLEADO
import FeedbackScreen from './components/FeedbackScreen';
  //GENERAL
import SettingScreen from './components/SettingScreen';




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TicketTool() {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pending Ticket')}
      >
        <Text style={styles.buttonText}>Go to Pending Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Ticket History')}
      >
        <Text style={styles.buttonText}>Go to Ticket History</Text>
      </TouchableOpacity>
    </View>
  );
}

function TicketsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ticket Tool" component={TicketTool} options={{ headerShown: false }} />
      <Stack.Screen name="Pending Ticket" component={TicketScreen} />
      <Stack.Screen name="Ticket Details" component={TicketDetailsScreen} />
      <Stack.Screen name="Ticket History" component={TicketHistoryScreen} />
      <Stack.Screen name="Ticket History Details" component={TicketHistoryDetailsScreen}/>
    </Stack.Navigator>
  );
}

function LocationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Locations" component={LocationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Location Detail" component={LocationDetailScreen} />
    </Stack.Navigator>
  );
}

function MakeTicketOption(){
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
function DivicesStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Divices" component={DivicesScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Divice Detail" component={LocationDetailScreen} />
    </Stack.Navigator>
  );
}

function ReportsStack(){
  <Stack.Navigator>
    <Stack.Screen name='Reports' component={ReportsScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
}

function SettingsStack(){
  <Stack.Navigator>
    <Stack.Screen name='Settings' component={SettingScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
}

function getDrawerScreens(tipoUser) {
  switch (tipoUser) {
    case 1:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenTec} />
          <Drawer.Screen name="Tickets" component={TicketsStack} />
          <Drawer.Screen name="Divices" component={DivicesStack} />
          <Drawer.Screen name="Locations" component={LocationsStack} />
          <Drawer.Screen name="Reports" component={ReportsStack} />
          <Drawer.Screen name="Settings" component={SettingsStack} />
        </>
      );
    case 2:
      return (
        <>
          <Drawer.Screen name="Home" component={HomeScreenJefe} />
          <Drawer.Screen name="Users" component={UsersScreen} />
          <Drawer.Screen name="Tickets" component={TicketsStack} />
          <Drawer.Screen name="Locations" component={LocationsStack} />
          <Drawer.Screen name="Divices" component={DivicesStack} />
          <Drawer.Screen name="Locations" component={LocationsStack} />
          <Drawer.Screen name="Reports" component={ReportsStack} />
          <Drawer.Screen name="Settings" component={SettingsStack} />
        </>
      );
    case 3:
      return (
        <>
        <Drawer.Screen name="Home" component={HomeScreenEmp} />
        <Drawer.Screen name="Tickets" component={MakeTicketOption} />
        <Drawer.Screen name="Settings" component={SettingsStack} />
      </>
      );
    default:
      return null;
  }
}

function AppContent() {
  const { loggedIn, userType } = useContext(AuthContext);
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 460;

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
        <Drawer.Navigator 
          initialRouteName="Home"
          screenOptions={{
            drawerType: isLargeScreen ? 'permanent' : 'slide',
            drawerStyle: isLargeScreen ? 'null' : { width: '100%' },
            overlayColor: 'transparent',

            drawerStyle: {
              backgroundColor: '#1E3A8A',
            },
            drawerActiveTintColor: 'white',
            drawerActiveBackgroundColor: '#003CB3',
            drawerLabelStyle: {
              color: 'white',
            }
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          {getDrawerScreens(userType)}
        </Drawer.Navigator>
        <StatusBar style="auto" translucent={false} backgroundColor="#faec5c" />
      </NavigationContainer>
    </FontsTexts>
  );
}


function HomeScreenTec() {
  // se utilizara para navegar a algunas
  // herramientas mas rapidamente
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
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.textMain}>Bienvenido Tecnico</Text>
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
    </ScrollView>
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
    alignSelf: 'center',
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
  button: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});