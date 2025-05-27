// app/(tabs)/diagnosis.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function DiagnosisScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    background: isDark ? '#0d0d0d' : '#f7f1eb',
    text: isDark ? '#f3e7d4' : '#5c4033',
    buttonBg: '#dba6a1',
    buttonText: '#ffffff',
  };

  const askForBodyPart = (imageUri: string) => {
    router.push({
      pathname: '/body',
      params: { image: imageUri },
    });
  
  
    
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      askForBodyPart(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      askForBodyPart(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Nuevo diagnóstico</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.buttonBg }]} onPress={pickImage}>
        <Ionicons name="image-outline" size={20} color={colors.buttonText} style={{ marginRight: 8 }} />
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Subir imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.buttonBg }]} onPress={takePhoto}>
        <Ionicons name="camera-outline" size={20} color={colors.buttonText} style={{ marginRight: 8 }} />
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>Tomar foto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
