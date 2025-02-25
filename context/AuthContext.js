import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

// children se encarga de actualizar la interaz 
// si el valor de loggedIn cambia (asi lo entendi yo)
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    // Lo que hace basicamente es donde se llame AuthContext
    // podra utilizar loggedIn (valor) y setLoggedIn (modificar)
    // en la linea 17 de LogIn se utiliza con useContext
    // en la linea 147 de App se utiliza para saber el valor
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};