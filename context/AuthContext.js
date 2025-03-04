import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Este sirve para saber si esta logeado
  const [loggedIn, setLoggedIn] = useState(false);
  // Este sirve para saber que tipo de usuario es
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Consulta si este wey ya inicio sesion antes
      const storedStatus = await AsyncStorage.getItem('loggedIn');
      // Consulta si este wey pertenece a algun tipo de usuario
      const storedUserType = await AsyncStorage.getItem('userType');
      // Si loggedIn es True le manda valor a setLoggedIn para
      // que la function App renderee las pantallas del usuario
      if (storedStatus === 'true') {
        setLoggedIn(true);
        setUserType(parseInt(storedUserType, 10));
      }
    };
    // Aqui se ejecuta
    checkLoginStatus();
  }, []);
  // Da los valores de las const creadas en mas arriba
  // cuando se utiliza logIn
  const logIn = async (type) => {
    setLoggedIn(true);
    setUserType(type);
    await AsyncStorage.setItem('loggedIn', 'true');
    await AsyncStorage.setItem('userType', type.toString());
  };
  // Borra los valores cuando se utiliza logOut en los "childrens"
  // Tanto "Locales" como de AsyncStorage
  const logOut = async () => {
    setLoggedIn(false);
    setUserType(null);
    await AsyncStorage.removeItem('loggedIn');
    await AsyncStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, userType, logIn, logOut }}>
      {/**/}
      {children}
    </AuthContext.Provider>
  );
};