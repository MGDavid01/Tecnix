import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

// children se encarga de actualizar la interaz 
// si el valor de loggedIn cambia (asi lo entendi yo)
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect se encarga de verificar si el usuario ya esta logeado
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedStatus = await AsyncStorage.getItem('loggedIn');
      if (storedStatus === 'true') {
        setLoggedIn(true);
      }
    };
    // Se llama la funcion checkLoginStatus
    checkLoginStatus();
  }, []);

  const logIn = async () => {
    setLoggedIn(true);
    await AsyncStorage.setItem('loggedIn', 'true');
  };

  const logOut = async () => {
    setLoggedIn(false);
    await AsyncStorage.removeItem('loggedIn');
  };

  return (
    // Lo que hace basicamente es donde se llame AuthContext
    // podra utilizar loggedIn (valor) y setLoggedIn (modificar)
    // en la linea 17 de LogIn se utiliza con useContext
    // en la linea 147 de App se utiliza para saber el valor
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};