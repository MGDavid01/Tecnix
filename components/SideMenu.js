// components/SideMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontsTexts } from "../components/FontsTexts";

const SideMenu = ({ navigation }) => {
  return (
    <FontsTexts>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
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