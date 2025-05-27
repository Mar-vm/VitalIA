// app/(tabs)/home.tsx
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

export default function Home() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigateTo = (screen: any) => {
    closeMenu();
    router.push(screen);
  };

  const handleLogout = () => {
    closeMenu();
    router.replace('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Botón hamburguesa */}
      <TouchableOpacity onPress={openMenu} style={styles.hamburgerButton}>
        <Ionicons name="menu" size={32} color={colors.accent} />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/images/vitalia_logo.png')}
        style={[styles.logo, { width: width * 0.5, height: width * 0.25 }]}
        resizeMode="contain"
      />

      {/* Botón principal */}
      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.tint }]}
        onPress={() => router.push('/diagnostico')}
      >
        <Text style={styles.primaryButtonText}>+ Nuevo diagnóstico preliminar</Text>
      </TouchableOpacity>

      {/* Modal del menú hamburguesa */}
      <Modal visible={menuVisible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('/main/SettingsScreen')}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
            <Text style={[styles.menuText, { color: colors.text }]}>Ajustes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color={colors.text} />
            <Text style={[styles.menuText, { color: colors.text }]}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 24,
  },
  hamburgerButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
  logo: {
    marginBottom: 40,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
});

