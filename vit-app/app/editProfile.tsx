import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

export default function EditProfileScreen() {
  const router = useRouter();
  const { uid } = useLocalSearchParams();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    background: isDark ? '#0d0d0d' : '#f7f1eb',
    text: isDark ? '#f3e7d4' : '#5c4033',
    subtitle: isDark ? '#d8b39c' : '#a0522d',
    inputBg: isDark ? '#1a1a1a' : '#ffffff',
    button: '#d98975',
  };

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    edad: '',
    genero: '',
    tipo_piel: '',
    tono_piel: '',
    etnia: '',
    descripcion: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const loadData = async () => {
    const db = getFirestore();
    const ref = doc(db, 'usuarios', uid as string);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      setForm({
        nombre: data?.personales?.nombre || '',
        apellido: data?.personales?.apellido || '',
        correo: data?.personales?.correo || '',
        edad: data?.personales?.edad || '',
        genero: data?.personales?.genero || '',
        tipo_piel: data?.piel?.tipo_piel || '',
        tono_piel: data?.piel?.tono_piel || '',
        etnia: data?.etnia?.etnia || '',
        descripcion: data?.etnia?.descripcion || '',
      });
    }
  };

  const saveChanges = async () => {
    try {
      const db = getFirestore();
      const ref = doc(db, 'usuarios', uid as string);
      await updateDoc(ref, {
        personales: {
          nombre: form.nombre,
          apellido: form.apellido,
          correo: form.correo,
          edad: form.edad,
          genero: form.genero,
        },
        piel: {
          tipo_piel: form.tipo_piel,
          tono_piel: form.tono_piel,
        },
        etnia: {
          etnia: form.etnia,
          descripcion: form.descripcion,
        },
      });
      Alert.alert('Perfil actualizado', 'Los datos se guardaron correctamente.');
      router.back();
    } catch (error) {
      console.error('❌ Error actualizando perfil:', error);
      Alert.alert('Error', 'No se pudieron guardar los cambios.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Editar Perfil</Text>

      {[
        { label: 'Nombre', field: 'nombre' },
        { label: 'Apellido', field: 'apellido' },
        { label: 'Edad', field: 'edad' },
        { label: 'Género', field: 'genero' },
        { label: 'Tipo de piel', field: 'tipo_piel' },
        { label: 'Tono de piel', field: 'tono_piel' },
        { label: 'Etnia', field: 'etnia' },
        { label: 'Descripción de la etnia', field: 'descripcion' },
      ].map(({ label, field }) => (
        <View key={field} style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.subtitle }]}>{label}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text }]}
            value={form[field as keyof typeof form]}
            onChangeText={value => handleChange(field, value)}
          />
        </View>
      ))}

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={saveChanges}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
