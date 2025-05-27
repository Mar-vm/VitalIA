import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function PrivacyScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const colors = {
    background: isDark ? '#0d0d0d' : '#f7f1eb',
    text: isDark ? '#f3e7d4' : '#5c4033',
    subtitle: isDark ? '#d8b39c' : '#a0522d',
    card: isDark ? '#1a1a1a' : '#ffffff',
    button: '#d98975',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Política de Privacidad</Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>1. Datos recopilados</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Recopilamos datos como nombre, edad, género, imágenes subidas y datos sobre tono y tipo de piel. Esta
          información es necesaria para ofrecer resultados personalizados.
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>2. Uso de la información</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Los datos se utilizan únicamente para el funcionamiento interno de la aplicación y para mejorar la precisión
          de las predicciones. No compartimos tu información con terceros sin tu consentimiento.
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>3. Almacenamiento</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Los datos se almacenan de forma segura en Firestore. Implementamos medidas de seguridad para proteger tu
          información frente a accesos no autorizados.
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>4. Derechos del usuario</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Puedes solicitar en cualquier momento la eliminación de tus datos o una copia de ellos. Para ello, comunícate
          con nuestro equipo de soporte.
        </Text>
      </ScrollView>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={18} color="#fff" />
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'justify',
    lineHeight: 22,
  },
  button: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
