import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/auth-context';
import { usePantry } from '@/context/pantry-context';

export default function PantryScreen() {
  const { items } = usePantry();
  const { token, logout } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.container}>
      <Text style={styles.title}>My Pantry</Text>
      <Text style={styles.subtitle}>Scanned items are saved locally in this app session.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Session</Text>
        <Text style={styles.cardText}>{token ? 'Authenticated session is active.' : 'No saved token found.'}</Text>
        <Pressable
          style={[styles.primaryButton, styles.secondaryButton]}
          onPress={async () => {
            await logout();
            router.replace('/login');
          }}>
          <Text style={styles.primaryButtonText}>{token ? 'Logout' : 'Go to login'}</Text>
        </Pressable>
      </View>

      {items.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No items yet</Text>
          <Text style={styles.cardText}>Scan a barcode to add your first product.</Text>
          <Pressable style={styles.primaryButton} onPress={() => router.push('/')}>
            <Text style={styles.primaryButtonText}>Go to scanner</Text>
          </Pressable>
        </View>
      ) : (
        items.map((item) => (
          <Pressable
            key={item.code}
            style={styles.card}
            onPress={() => router.push(`/product/${encodeURIComponent(item.code)}`)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>Brand: {item.brand}</Text>
            <Text style={styles.cardText}>Barcode: {item.code}</Text>
            <Text style={styles.cardSubtle}>
              Scanned: {new Date(item.scannedAt).toLocaleString()}
            </Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  cardText: {
    color: '#CBD5E1',
    fontSize: 14,
  },
  cardSubtle: {
    color: '#94A3B8',
    fontSize: 12,
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
});
