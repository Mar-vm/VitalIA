import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  useWindowDimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

import { getProfileData } from '../../services/firestore/getProfileData';
import { uploadProfileImage } from '../../services/storage/profileImage';
import { updateProfileImageUrl } from '../../services/firestore/updateProfileImage';

export default function ProfileScreen() {
  const router = useRouter();
  const { uid } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const [datos, setDatos] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<any>(
    require('../../assets/images/profile.png')
  );

  const colors = {
    background: isDark ? '#0d0d0d' : '#f7f1eb',
    text: isDark ? '#f3e7d4' : '#5c4033',
    card: isDark ? '#1a1a1a' : '#ffffff',
    subtitle: isDark ? '#d8b39c' : '#a0522d',
    button: '#d98975',
  };

   const editProfile = () => {
    router.push({
      pathname: '/editProfile',
      params: { uid },
    });
  };
  
  const changeProfileImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para cambiar tu foto.');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      const localUri = pickerResult.assets[0].uri;
      setProfileImage({ uri: localUri });

      try {
        const downloadUrl = await uploadProfileImage(uid as string, localUri);
        await updateProfileImageUrl(uid as string, downloadUrl);
        Alert.alert('Foto actualizada', 'Tu foto de perfil se ha guardado correctamente.');
      } catch (error) {
        console.error('❌ Error subiendo imagen:', error);
        Alert.alert('Error', 'No se pudo subir la imagen. Intenta de nuevo.');
      }
    }
  };

  useEffect(() => {
    if (!uid) return;

    const fetchData = async () => {
      try {
        const result = await getProfileData(uid as string);
        setDatos(result);
        if (result?.foto) {
          setProfileImage({ uri: result.foto });
        }
      } catch (error) {
        console.error('❌ Error al obtener datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={changeProfileImage}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={[styles.name, { color: colors.text }]}>
          {datos?.personales?.nombre || ''} {datos?.personales?.apellido || ''}
        </Text>
        <Text style={[styles.email, { color: colors.subtitle }]}>
          {datos?.personales?.correo || ''}
        </Text>

        <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoLabel, { color: colors.subtitle }]}>Edad</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {datos?.personales?.edad || 'No especificada'}
          </Text>

          <Text style={[styles.infoLabel, { color: colors.subtitle }]}>Género</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {datos?.personales?.genero || 'No especificado'}
          </Text>

          <Text style={[styles.infoLabel, { color: colors.subtitle }]}>Tipo de piel</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {datos?.piel?.tipo_piel || 'No especificado'}
          </Text>

          <Text style={[styles.infoLabel, { color: colors.subtitle }]}>Tono de piel</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {datos?.piel?.tono_piel || 'No especificado'}
          </Text>

          <Text style={[styles.infoLabel, { color: colors.subtitle }]}>Etnia</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {datos?.etnia?.etnia || 'No especificada'}
          </Text>

          <Text style={[styles.infoLabel, { color: colors.subtitle }]}>Descripción de la etnia</Text>
          <Text style={[styles.infoValue, { color: colors.text }]}>
            {datos?.etnia?.descripcion || 'Sin descripción'}
          </Text>

          <Text style={[styles.infoLabel, { color: colors.subtitle }]}>Historial clínico</Text>
          {datos?.historial?.length > 0 ? (
            datos.historial.map((item: any, index: number) => (
              <Text key={index} style={[styles.infoValue, { color: colors.text }]}>
                {item.padecimiento} - {item.tipo} ({item.fecha_det})
              </Text>
            ))
          ) : (
            <Text style={[styles.infoValue, { color: colors.text }]}>Sin antecedentes</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: colors.button }]}
          onPress={editProfile}
        >
          <Ionicons name="create-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 420,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
