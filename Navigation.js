import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './LogIn';
import Home from './App';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const tipoUser = 1;

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home">
          {props => <Home {...props} tipoUser={tipoUser} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}