import { View, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ViewPhotoScreen() {
  const { url } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: url as string }} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
});
