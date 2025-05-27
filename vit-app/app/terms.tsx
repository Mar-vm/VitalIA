import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TermsScreen() {
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
        <Text style={[styles.title, { color: colors.text }]}>Términos de Servicio</Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>1. Aceptación de los Términos</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Al utilizar la aplicación VitalIA, aceptas estos Términos de Servicio en su totalidad. Si no estás de acuerdo
          con alguna parte, por favor no utilices la aplicación.
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>2. Uso de la Aplicación</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          VitalIA es una herramienta de apoyo informativo que no reemplaza diagnósticos médicos profesionales. El usuario
          es responsable de cualquier acción tomada con base en los resultados presentados por la aplicación.
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>3. Modificaciones</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Se notificará a los usuarios en
          caso de cambios relevantes.
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtitle }]}>4. Responsabilidad</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          VitalIA no se hace responsable por interpretaciones erróneas de los resultados, ni por daños directos o
          indirectos derivados del uso de la aplicación.
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
