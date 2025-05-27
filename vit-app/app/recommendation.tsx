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
  
  export default function RecommendationsScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
  
    const colors = {
      background: isDark ? '#0d0d0d' : '#f7f1eb',
      text: isDark ? '#f3e7d4' : '#5c4033',
      subtitle: isDark ? '#d8b39c' : '#a0522d',
      card: isDark ? '#1a1a1a' : '#ffffff',
    };
  
    const goBack = () => {
      router.back();
    };
  
    const recommendations = [
      'Hidratar tu piel diariamente con cremas hipoalergénicas.',
      'Evitar baños prolongados o con agua muy caliente.',
      'Utilizar jabones suaves sin fragancia.',
      'Evitar rascarse las zonas afectadas.',
      'Consultar a un dermatólogo para tratamientos personalizados.',
    ];
  
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Recomendaciones</Text>
  
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {recommendations.map((item, index) => (
            <View key={index} style={[styles.tipCard, { backgroundColor: colors.card }]}>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={colors.subtitle}
                style={{ marginBottom: 6 }}
              />
              <Text style={[styles.tipText, { color: colors.text }]}>{item}</Text>
            </View>
          ))}
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
      alignItems: 'center',
      paddingTop: 60,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    scrollArea: {
      width: '100%',
    },
    tipCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 1.5,
    },
    tipText: {
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
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
  