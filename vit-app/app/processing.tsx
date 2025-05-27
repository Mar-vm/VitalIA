import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    useWindowDimensions,
    Platform,
  } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { useRouter, useLocalSearchParams } from 'expo-router';
  import { useEffect } from 'react';
  import { useColorScheme } from 'react-native';
  
  export default function ProcessingScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const { image } = useLocalSearchParams();
  
    // Colores del tema VitalIA
    const colors = {
      background: isDark ? '#0d0d0d' : '#f7f1eb',
      text: isDark ? '#f3e7d4' : '#5c4033',
      subtitle: isDark ? '#d8b39c' : '#a0522d',
      accent: '#d98975',
    };
  
    useEffect(() => {
      const timer = setTimeout(() => {
        router.replace({
          pathname: '/result',
          params: { image },
        });
      }, 4000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContent}>
          <Image
            source={require('../assets/images/imagotipo.png')}
            style={{
              width: width * 0.2,
              height: width * 0.2,
              marginBottom: 20,
              resizeMode: 'contain',
            }}
          />
  
          <Text style={[styles.title, { color: colors.text }]}>
            Realizando diagnóstico...
          </Text>
  
          <ActivityIndicator size="large" color={colors.accent} style={styles.spinner} />
        </View>
  
        <View style={styles.alertBox}>
          <Ionicons name="alert-circle-outline" size={18} color={colors.text} style={styles.alertIcon} />
          <Text style={[styles.alertText, { color: colors.subtitle }]}>
            Recuerda que VitalIA ofrece diagnósticos preliminares que NO sustituyen el diagnóstico de un dermatólogo.{"\n\n"}
            Te recomendamos acudir con un especialista.
          </Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    centerContent: {
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 30,
      textAlign: 'center',
    },
    spinner: {
      marginBottom: 20,
    },
    alertBox: {
      maxWidth: 360,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    alertIcon: {
      marginBottom: 8,
    },
    alertText: {
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
  