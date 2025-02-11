import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import SideMenu from './components/SideMenu';  // Importar el menú lateral
import * as Font from 'expo-font';



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
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Cargando...</Text>;
  }

  return (
    <NavigationContainer style={styles.content}>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <SideMenu {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
      <StatusBar style="auto" translucent={false} backgroundColor='#faec5c'/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content:{
    fontFamily: "Poppins-Regular",
    fontSize: 2,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(255 255 255)",
  },
  textMain: {
    fontFamily: "Poppins-Bold",
    fontSize: 50,
    display: "flex",
    alignContent: "flex-start",
    textAlign: "center",
  },
});