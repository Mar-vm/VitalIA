// app/login.tsx
import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { ThemedView } from '../components/ThemedView';
import {View, Image,TextInput,TouchableOpacity, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView,} from 'react-native';
import { useState } from 'react';
import { loginUser } from '../services/auth/loginUser';
import { Alert } from 'react-native';


export default function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async () => {
    try {
      const uid = await loginUser(email, password);
      router.replace({ pathname: '(tabs)/home', params: { uid } });
    } catch (error: any) {
      Alert.alert("Error al iniciar sesión", error.message);
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.container]}>
          <Image
            source={require('../assets/images/vitalia_logo.png')}
            style={[styles.logo, { width: width * 0.4, height: width * 0.2 }]}
            resizeMode="contain"
          />

          <Text style={[styles.welcome, { color: colors.text }]}>¡Bienvenid@!</Text>
          <Text style={[styles.instruction, { color: colors.subtitle }]}>
            Introduce tu correo para continuar
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="email@dominio.com"
            placeholderTextColor={colors.subtitle}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Contraseña"
            placeholderTextColor={colors.subtitle}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.tint }]}
            onPress={handleLogin}
          >
            <Text style={styles.primaryButtonText}>Continuar</Text>
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
            <Text style={[styles.separatorText, { color: colors.subtitle }]}>o</Text>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>

          <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.border }]}>
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Continuar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.secondaryButton, { borderColor: colors.border }]}>
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Continuar con Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToRegister}>
            <Text style={[styles.registerLink, { color: colors.subtitle }]}>¿Nuevo usuario? Registrarse</Text>
          </TouchableOpacity>

          <Text style={[styles.terms, { color: colors.subtitle }]}>
            Al hacer clic en continuar, aceptas nuestros{'\n'}
            <Text style={styles.underline}>Términos de Servicio</Text> y{' '}
            <Text style={styles.underline}>Política de Privacidad</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logo: {
    marginBottom: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  registerLink: {
    fontSize: 12,
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  terms: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 16,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});