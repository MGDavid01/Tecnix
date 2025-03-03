import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const CustomDrawerContent = (props) => {
  const { logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Do you want to logout?')) {
        AsyncStorage.clear();
        logOut();
      }
    } else {
      Alert.alert(
        'Log out',
        'Do you want to logout?',
        [
          { text: 'Cancel', onPress: () => { return null } },
          {
            text: 'Confirm', onPress: () => {
              AsyncStorage.clear();
              logOut();
            }
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TECNIX</Text>
      </View>
      {/* Se renderizan todas las pantallas que estan dentro
        de Drawer.Navigator pasado atraves de ...props
      */}
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={handleLogOut}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 6,
    marginBottom: 6,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
  },
  logOutText: {
    color: '#FFF',
    fontWeight: 'semibold',
  }
});

export default CustomDrawerContent;