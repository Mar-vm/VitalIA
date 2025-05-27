import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function HistoryScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const [historial, setHistorial] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const colors = {
    background: isDark ? '#0d0d0d' : '#f7f1eb',
    text: isDark ? '#f3e7d4' : '#5c4033',
    subtitle: isDark ? '#d8b39c' : '#a0522d',
    card: isDark ? '#1a1a1a' : '#ffffff',
    accent: '#d98975',
  };

  useEffect(() => {
    const fetchHistorial = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const historialQuery = query(
        collection(db, 'historial'),
        where('id_usuario', '==', user.uid)
      );

      const historialSnapshot = await getDocs(historialQuery);
      const results: any[] = [];

      for (const histDoc of historialSnapshot.docs) {
        const { id_diagnostico } = histDoc.data();
        const diagSnap = await getDoc(doc(db, 'diagnosticos', id_diagnostico));
        const diag = diagSnap.data();

        if (diag) {
          const afeccionSnap = await getDoc(doc(db, 'afecciones', diag.diagnostico));
          const afeccion = afeccionSnap.data();

          results.push({
            fecha: diag.fecha ?? 'Sin fecha',
            probabilidad: diag.probabilidad ?? 'Desconocida',
            recomendacion: diag.recomendacion,
            diagnostico: afeccion?.n_comun ?? diag.diagnostico,
            cientifico: afeccion?.n_cientifico,
            descripcion: afeccion?.descripcion,
            recurso: afeccion?.recurso,
          });
        }
      }

      setHistorial(results);
    };

    fetchHistorial();
  }, []);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Historial</Text>
      <Text style={[styles.subtitle, { color: colors.subtitle }]}>Mis diagnósticos</Text>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {historial.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => toggleExpand(index)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{item.diagnostico}</Text>
              <Ionicons
                name={expanded === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.text}
              />
            </View>

            {expanded === index && (
              <View style={styles.cardContent}>
                <Text style={[styles.detailText, { color: colors.subtitle }]}>
                  Fecha: {item.fecha}
                </Text>
                <Text style={[styles.detailText, { color: colors.subtitle }]}>
                  Probabilidad: {item.probabilidad}
                </Text>
                <Text style={[styles.detailText, { color: colors.subtitle }]}>
                  Recomendación: {item.recomendacion}
                </Text>
                {item.recurso && (
                  <Text
                    style={[styles.detailLink, { color: colors.accent }]}
                    onPress={() => Linking.openURL(item.recurso)}
                  >
                    Más info
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollArea: {
    flex: 1,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  cardContent: {
    marginTop: 12,
  },
  detailText: {
    fontSize: 13,
    marginBottom: 4,
    lineHeight: 18,
  },
  detailLink: {
    fontSize: 13,
    marginTop: 6,
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 6,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
