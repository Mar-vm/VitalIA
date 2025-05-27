import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../assets/images/vitalia_logo.png')}
        style={[
          styles.logo,
          {
            width: width * 0.7,
            height: width * 0.28,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // tamaño controlado por useWindowDimensions
  },
});
