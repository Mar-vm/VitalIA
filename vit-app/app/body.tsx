import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function BodyPartSelectorScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { image } = useLocalSearchParams();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    background: isDark ? '#0d0d0d' : '#f7f1eb',
    text: isDark ? '#f3e7d4' : '#5c4033',
    subtitle: isDark ? '#d8b39c' : '#a0522d',
    card: isDark ? '#1a1a1a' : '#ffffff',
    buttonBg: '#d98975',
  };

  const cancel = () => {
    router.replace('/(tabs)/home');
  };

  const continueDiagnosis = () => {
    router.push({
      pathname: '/processing',
      params: { image },
    });
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header con logo y lema */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/vitalia_logo.png')}
          style={{
            width: width * 0.22,
            height: width * 0.22,
            resizeMode: 'contain',
          }}
        />
  
      </View>

      {/* Card con contenido */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Selecciona la parte del cuerpo
        </Text>

        <Image
          source={require('../assets/images/body.png')}
          style={{
            width: width * 0.45,
            height: height * 0.4,
            resizeMode: 'contain',
            marginBottom: 16,
          }}
        />

        {/* Botones */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.cancelButton, { borderColor: colors.subtitle }]}
            onPress={cancel}
          >
            <Ionicons name="close-circle-outline" size={18} color={colors.text} />
            <Text style={[styles.cancelButtonText, { color: colors.text }]}> Cancelar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: colors.buttonBg }]}
            onPress={continueDiagnosis}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
            <Text style={styles.continueButtonText}> Continuar </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
        <Text style={[styles.terms, { color: colors.subtitle }]}>
          Al hacer clic en continuar, aceptas nuestros
        </Text>
        <Text style={[styles.terms, { color: colors.subtitle }]}>
          <Text style={styles.linkText} onPress={() => router.push('/terms')}>
            Términos de Servicio
          </Text>{' '}
          y{' '}
          <Text style={styles.linkText} onPress={() => router.push('/privacy')}>
            Política de Privacidad
          </Text>
        </Text>
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    alignItems: 'center',
    marginBottom: -50, 
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginBottom: 8,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  continueButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  terms: {
    fontSize: 10,
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  logo: {
  marginBottom: 0, // menos separación con subtítulo
  },
  
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  
});