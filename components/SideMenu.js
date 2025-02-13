import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontsTexts } from "../components/FontsTexts";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Declacion el DrawerNavigator
const Drawer = createDrawerNavigator();

const SideMenu = ({ screens, navigation }) => {
  return (
    <FontsTexts>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          {/* Renderizamos las pantallas con una iteracion */}
          {screens.map((screen) => (
            <TouchableOpacity
              key={screen.name}
              style={styles.menuItem}
              onPress={() => navigation.navigate(screen.name)}
            >
              <Text style={[styles.menuText, { color: screen.color }]}>{screen.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}>
        {/* Mostramos las opciones iterando */}
        {screens.map((screen) => (
          <Drawer.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              title: screen.title,
              drawerLabelStyle: {
                fontSize: 18,
                fontFamily: "Poppins-Bold",
              },
            }}
          />
        ))}
      </Drawer.Navigator>
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    textAlign: "left",
  },
});

export default SideMenu;