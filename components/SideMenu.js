import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Declaramos el DrawerNavigator
const Drawer = createDrawerNavigator();

// Componente personalizado para el menú lateral
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.menuContainer}>
        {/* Botón para cerrar el menú */}
        <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>

        {/* Renderizamos las opciones del menú */}
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const SideMenu = ({ screens }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
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
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
    marginRight: 20,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SideMenu;