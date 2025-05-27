import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    useWindowDimensions,
  } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { useRouter } from 'expo-router';
  import { useColorScheme } from 'react-native';
  
  export default function DiagnosisResultScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
  
    const colors = {
      background: isDark ? '#0d0d0d' : '#f7f1eb',
      text: isDark ? '#f3e7d4' : '#5c4033',
      subtitle: isDark ? '#d8b39c' : '#a0522d',
      card: isDark ? '#1a1a1a' : '#ffffff',
      accent: '#d98975',
    };
  
    const goBack = () => {
      router.replace('/(tabs)/home');
    };
  
    const viewRecommendations = () => {
      router.push('/recommendation');
    };
  
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: colors.text }]}>Diagnóstico preliminar</Text>
  
          <View style={styles.alertBox}>
            <View style={styles.alertRow}>
              <Ionicons name="alert-circle-outline" size={18} color={colors.text} style={styles.alertIcon} />
              <Text style={[styles.alertText, { color: colors.subtitle }]}>
                Recuerda que VitalIA ofrece diagnósticos preliminares que NO sustituyen el diagnóstico de un especialista.{"\n\n"}
                Te recomendamos visitar a un dermatólogo para una evaluación profesional.
              </Text>
            </View>
          </View>
  
          <View style={[styles.diagnosisCard, { backgroundColor: colors.card, borderColor: colors.accent }]}>
            <Text style={[styles.diagnosisTitle, { color: colors.text }]}>Dermatitis atópica</Text>
            <Text style={[styles.diagnosisDescription, { color: colors.subtitle }]}>
              También conocida como eccema, es una afección que hace que la piel se seque, pique y se inflame.
            </Text>
  
            <TouchableOpacity
              style={[styles.recommendationButton, { backgroundColor: colors.accent }]}
              onPress={viewRecommendations}
            >
              <Text style={styles.recommendationButtonText}>Ver recomendaciones</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
  
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back-outline" size={18} color={colors.text} />
            <Text style={[styles.backButtonText, { color: colors.text }]}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      textAlign: 'center',
    },
    alertBox: {
      paddingHorizontal: 12,
      marginBottom: 30,
      width: '100%',
      alignItems: 'center',
    },
    alertRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    alertIcon: {
      marginRight: 8,
      marginTop: 4,
    },
    alertText: {
      flex: 1,
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 18,
    },
    diagnosisCard: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      maxWidth: 420,
    },
    diagnosisTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    diagnosisDescription: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
    recommendationButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    recommendationButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 14,
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
  