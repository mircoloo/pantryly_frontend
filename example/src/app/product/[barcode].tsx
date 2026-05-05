import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { usePantry } from '@/context/pantry-context';

export default function ProductDetailsScreen() {
  const { barcode } = useLocalSearchParams<{ barcode?: string }>();
  const { items } = usePantry();

  const decodedBarcode = barcode ? decodeURIComponent(barcode) : '';
  const product = items.find((item) => item.code === decodedBarcode);

  if (!decodedBarcode) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No barcode provided</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/')}>
          <Text style={styles.primaryButtonText}>Go to scanner</Text>
        </Pressable>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Product not found in pantry</Text>
        <Text style={styles.subtleText}>Barcode: {decodedBarcode}</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.push('/pantry')}>
          <Text style={styles.primaryButtonText}>Back to pantry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.subtleText}>Brand: {product.brand}</Text>
      <Text style={styles.subtleText}>Barcode: {product.code}</Text>
      <Text style={styles.subtleText}>Scanned at: {new Date(product.scannedAt).toLocaleString()}</Text>

      <Pressable style={styles.primaryButton} onPress={() => router.push('/pantry')}>
        <Text style={styles.primaryButtonText}>Back to pantry</Text>
      </Pressable>
      <Pressable style={[styles.primaryButton, styles.secondaryButton]} onPress={() => router.push('/')}>
        <Text style={styles.primaryButtonText}>Scan another</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    gap: 12,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
  },
  subtleText: {
    color: '#CBD5E1',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#16A34A',
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
});
