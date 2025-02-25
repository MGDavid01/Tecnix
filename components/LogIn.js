import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FontsTexts from './FontsTexts';
import "../firebaseConfig"; // Asegúrate de importar tu configuración de Firebase

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home", {loggedIn: true});
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
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
});

export default Login;
