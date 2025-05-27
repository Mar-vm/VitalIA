import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
  useColorScheme,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const images: Record<string, any> = {
  akiec: require('../../assets/images/afecciones/akiec.jpg'),
  bcc: require('../../assets/images/afecciones/bcc.jpg'),
  bkl: require('../../assets/images/afecciones/bkl.jpg'),
  df: require('../../assets/images/afecciones/df.jpg'),
  nv: require('../../assets/images/afecciones/nv.jpg'),
  vasc: require('../../assets/images/afecciones/vasc.jpg'),
  mel: require('../../assets/images/afecciones/mel.jpg'),
};

// Enlaces confiables por enfermedad (por ID del documento)
const trustedLinks: Record<string, string> = {
  akiec: 'https://www.aad.org/public/diseases/skin-cancer/types/common/actinic-keratosis',
  bcc: 'https://www.aad.org/public/diseases/skin-cancer/types/common/basal-cell-carcinoma',
  bkl: 'https://dermnetnz.org/topics/seborrhoeic-keratosis',
  df: 'https://dermnetnz.org/topics/dermatofibroma',
  nv: 'https://www.aad.org/public/diseases/a-z/moles-overview',
  vasc: 'https://dermnetnz.org/topics/vascular-tumours',
  mel: 'https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma',
};

export default function CatalogScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    background: isDark ? '#0d0d0d' : '#f7f1eb',
    card: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#f3e7d4' : '#5c4033',
    subtitle: isDark ? '#d8b39c' : '#a0522d',
    buttonBg: '#dba6a1',
    buttonText: '#ffffff',
  };

  const [diseases, setDiseases] = useState<any[]>([]);

  useEffect(() => {
    const fetchAfecciones = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'afecciones'));
      const data: any[] = [];

      querySnapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setDiseases(data);
    };

    fetchAfecciones();
  }, []);

  const openDiseaseDetail = (disease: any) => {
    router.push({
      pathname: '/main/DiseaseDetailsScreen',
      params: {
        name: disease.n_comun,
        description: disease.descripcion,
        causes: disease.n_cientifico,
        recommendations: disease.recomendaciones,
        recurso: disease.recurso,
      },
    });
  };

  const openTrustedLink = (id: string) => {
    const url = trustedLinks[id];
    if (url) Linking.openURL(url);
    else alert('Fuente confiable no disponible para esta afección.');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Catálogo de Enfermedades</Text>

      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 100 }}>
        {diseases.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: colors.card }]}>
            <Image
              source={images[item.id]}
              style={[styles.cardImage, { height: width < 380 ? 120 : 160 }]}
              resizeMode="cover"
            />
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.n_comun}</Text>
            <Text style={[styles.cardDescription, { color: colors.subtitle }]}>{item.descripcion}</Text>

            

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#a45c5c', marginTop: 8 }]}
              onPress={() => openTrustedLink(item.id)}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>Ver más información</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollArea: {
    flex: 1,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
