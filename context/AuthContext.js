import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedStatus = await AsyncStorage.getItem('loggedIn');
      const storedUserType = await AsyncStorage.getItem('userType');
      if (storedStatus === 'true') {
        setLoggedIn(true);
        setUserType(parseInt(storedUserType, 10));
      }
    };
    checkLoginStatus();
  }, []);

  const logIn = async (type) => {
    setLoggedIn(true);
    setUserType(type);
    await AsyncStorage.setItem('loggedIn', 'true');
    await AsyncStorage.setItem('userType', type.toString());
  };

  const logOut = async () => {
    setLoggedIn(false);
    setUserType(null);
    await AsyncStorage.removeItem('loggedIn');
    await AsyncStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, userType, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};