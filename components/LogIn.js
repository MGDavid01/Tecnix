import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import FontsTexts from './FontsTexts';
import "../firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const auth = getAuth();
  const { logIn } = useContext(AuthContext);
  const db = getFirestore();

  const checkUserRole = async (email) => {
    const collections = ["Technical", "Administrator", "User"];
    for (let i = 0; i < collections.length; i++) {
      const colRef = collection(db, collections[i]);
      const q = query(colRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return i + 1; // Devuelve 1 para Techinacal, 2 para Administrador, 3 para User
      }
    }
    return null;
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: '60203105814-gn3adjqolmu6qmj3cbecrhuacjpi8v0m.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@sdestiny12/Tecnix-52017',
    androidClientId: '60203105814-8gbg7p7a4ln566lckkne23f3acjdnt3g.apps.googleusercontent.com'
});    

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // You can use this access token to make authenticated requests
      console.log(authentication.accessToken);
      // Now sign in with Firebase
      const credential = GoogleAuthProvider.credential(
        authentication.idToken,
        authentication.accessToken
      );
      signInWithCredential(auth, credential)
        .then(logIn(userType))
        .catch((error) => Alert.alert("Login Failed", error.message));
    }
  }, [response]);

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userType = await checkUserRole(email);
      console.log("Tipo de usuario obtenido:", userType); // <-- Verificar valor
      if (userType) {
        logIn(userType); // Actualiza el estado de autenticación
      } else {
        Alert.alert("Error", "No user found in any category");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <FontsTexts>
      <LinearGradient colors={["#1E90FF", "#007AFF"]} style={styles.container}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="shield-lock-outline" size={50} color="#FFF" />
        </View>
        <Text style={[styles.text, styles.title]}>Sign in to your Account</Text>
        <Text style={[styles.text, styles.subtitle]}>Enter your email and password to log in</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <MaterialCommunityIcons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#777" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogIn} style={styles.loginButton}>
          <Text style={[styles.text, styles.loginText]}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
          <MaterialCommunityIcons name="google" size={24} color="#FFF" />
          <Text style={[styles.text, styles.googleButtonText]}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp}>
          <Text style={[styles.text, styles.signUpText]}>
            Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </FontsTexts>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#DDD",
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#0056B3",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  signUpText: {
    fontSize: 14,
    color: "#FFF",
  },
  signUpLink: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    width: "100%",
    justifyContent: 'center',
    marginBottom: 15,
  },
  googleButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Login;
