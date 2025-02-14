import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Lois"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Becket"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Loisbecket@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="18/03/2024"
          value={date}
          onChangeText={setDate}
        />

        <View style={styles.phoneContainer}>
          <TouchableOpacity style={styles.countryCode}>
            <Text>🇬🇧 +</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="(454) 726-0592"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <TouchableOpacity style={styles.googleButton}>
          <MaterialCommunityIcons name="google" size={20} color="#000" />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a73e8",
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    marginTop: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: "#FFF",
    marginRight: 4,
  },
  loginLink: {
    color: "#FFF",
    textDecorationLine: 'underline',
  },
  form: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    width: "100%",
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCode: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 8,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 15,
  },
  eyeIcon: {
    padding: 15,
  },
  signUpButton: {
    backgroundColor: "#1a73e8",
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: 'center',
    color: "#777",
    marginVertical: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  googleButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SignUpScreen;